const express = require('express')
const jwt = require('jsonwebtoken')
const appError = require('../statusHandle/appError')
const handleErrorAsync = require('../statusHandle/handleErrorAsync')
const { User } = require('../models')

const generateSendJWT = (user, statusCode, res) => {
	// 產生 JWT token
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_DAY,
	})

	// 轉換環境變數，避免 NaN 問題
	const expiresInDays = Number(process.env.JWT_COOKIE_EXPIRES_IN) || 7

	// 設置 HTTP-only cookie
	res.cookie('jwt', token, {
		expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
		httpOnly: true, // 防止 XSS 攻擊
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict', // 防止 CSRF 攻擊
	})

	// 不回傳密碼
	user.password = undefined

	res.status(statusCode).json({
		status: 'success',
		user: {
			name: user.name,
			role: user.role,
		},
	})
}

const isAuth = handleErrorAsync(async (req, res, next) => {
	const token = req.cookies.jwt

	if (!token) {
		return next(appError(401, '你尚未登入！', next))
	}

	// 驗證 JWT
	const decoded = await new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
			if (err) {
				return reject(appError(401, '無效的 token！', next))
			}
			resolve(payload)
		})
	})

	// 用 Sequelize 查詢用戶
	const currentUser = await User.findByPk(decoded.id)

	if (!currentUser) {
		return next(appError(401, '用戶不存在', next))
	}

	if (currentUser.role !== 'admin') {
		return next(appError(403, '權限不足', next))
	}

	// 附加用戶資訊到 req
	req.user = currentUser

	// 繼續執行下一個 middleware
	next()
})

const logout = res => {
	res.clearCookie('jwt', {
		httpOnly: true,
	})
}

module.exports = {
	isAuth,
	generateSendJWT,
	logout,
}
