const firebaseAdmin = require('../connection/firebase')
const bucket = firebaseAdmin.storage().bucket()
const { v4: uuidv4 } = require('uuid')

exports.uploadImage = async (req, res, next) => {
	/*
		#swagger.tags = ['Upload']
			#swagger.description = '上傳照片'

		#swagger.summary = '上傳照片'

		#swagger.parameters['file'] = {
			in: 'path',
			description: '圖片檔',
			required: true,
			type: 'file'
		} 
		
		#swagger.responses[200] = {
			schema:
				{
					url: 'string'
				}
		}
	*/

	const file = req.file

	if (!file) {
		return res.status(400).json({ message: 'No file uploaded' })
	}

	const blob = bucket.file(`images/${uuidv4()}.${file.originalname.split('.').pop()}`)
	const blobStream = blob.createWriteStream()

	blobStream.on('finish', () => {
		const config = {
			action: 'read', // 權限
			expires: '12-31-2500', // 網址的有效期限
		}

		blob.getSignedUrl(config, (err, imgUrl) => {
			if (err) {
				res.status(500).send('上傳失敗')
				return
			}
			res.json({ url: imgUrl })
		})
	})

	blobStream.on('error', err => {
		res.status(500).send('上傳失敗')
	})

	blobStream.end(file.buffer)
}
