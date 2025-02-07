const { User } = require('../models')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const appError = require('../statusHandle/appError')
const handleErrorAsync = require('../statusHandle/handleErrorAsync')

const { generateSendJWT, logout } = require('../statusHandle/auth')
const { app } = require('firebase-admin')

exports.getUser = async (req, res, next) => {
	// #swagger.tags = ['user']
	try {
		const users = await User.findAll({
			attributes: { exclude: ['password', 'confirmPassword'] },
		})

		res.status(200).json({
			status: 'success',
			data: users,
		})
	} catch (error) {
		res.status(500).json({ status: 'error' })
	}
}

// 取得目前使用者
exports.getUserAuth = async (req, res, next) => {
	// #swagger.tags = ['user']
	try {
		// 檢查 req.user 是否存在，表示用戶已經登入
		if (!req.user) {
			return next(appError(401, '請先登入', next))
		}

		// 回傳當前用戶的資料
		res.status(200).json({
			status: 'success',
			user: {
				id: req.user.id,
				name: req.user.name,
				role: req.user.role,
			},
		})
	} catch (error) {
		next(error)
	}
}

exports.deleteUser = async (req, res, next) => {
	// #swagger.tags = ['user']
	try {
		const userId = req.params.id

		const user = await User.findByPk(userId)
		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: '找不到指定的使用者',
			})
		}

		await user.destroy()

		res.status(200).json({
			status: 'success',
			message: '使用者刪除成功',
		})
	} catch (error) {
		res.status(500).json({ status: 'error' })
	}
}

exports.sign_up = handleErrorAsync(async (req, res, next) => {
	// #swagger.tags = ['user']
	let { email, password, confirmPassword, name } = req.body

	if (!email || !password || !confirmPassword || !name) {
		return next(appError(400, '請填寫所有必填欄位'))
	}

	if (password !== confirmPassword) {
		return next(appError(400, '兩次輸入的密碼不一致'))
	}

	if (!validator.isLength(password, { min: 8 })) {
		return next(appError(400, '密碼長度必須大於8個字元'))
	}

	if (!validator.isEmail(email)) {
		return next(appError(400, '電子郵件格式不正確'))
	}

	try {
		const existingUser = await User.findOne({ where: { email } })
		if (existingUser) {
			return next(appError(400, '此電子郵件已被註冊'))
		}

		const hashedPassword = await bcrypt.hash(password, 12)

		const newUser = await User.create({
			email,
			password: hashedPassword,
			name,
			role: 'user',
			createdAt: new Date(),
		})

		res.status(200).json({
			status: 'success',
			data: {
				user: {
					id: newUser.id,
					email: newUser.email,
					name: newUser.name,
					role: newUser.role,
				},
			},
		})
	} catch (error) {
		console.error('註冊失敗:', error)
		return next(appError(500, '伺服器錯誤，請稍後再試'))
	}
})

exports.sign_in = handleErrorAsync(async (req, res, next) => {
	// #swagger.tags = ['user']
	const { email, password } = req.body
	if (!email || !password) {
		return next(appError(400, '帳號密碼不可為空', next))
	}

	const user = await User.findOne({
		where: { email },
		attributes: { include: ['password'] },
	})

	if (!user) {
		return next(appError(400, '找不到此用戶', next))
	}

	const auth = await bcrypt.compare(password, user.password)
	if (!auth) {
		return next(appError(400, '您的密碼不正確', next))
	}

	generateSendJWT(user, 200, res)
})

exports.logout = handleErrorAsync(async (req, res, next) => {
	// #swagger.tags = ['user']
	logout(res)
	res.status(200).json({ message: '登出成功' })
})
