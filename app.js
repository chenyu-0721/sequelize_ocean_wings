require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// cors
const corsOptions = {
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	credentials: true,
	optionsSuccessStatus: 200,
	maxAge: 3600,
}

app.use((req, res, next) => {
	const cors = require('cors')(corsOptions)

	cors(req, res, err => {
		if (err) {
			console.error('CORS Error:', {
				origin: req.get('origin'),
				method: req.method,
				errorMessage: err.message,
			})

			return res.status(403).json({
				status: 'error',
				message: 'Cross-Origin Request Blocked',
				details: 'The request origin is not allowed by CORS policy',
			})
		}
		next()
	})
})

app.use(cookieParser())
app.use(express.json())

const productRoute = require('./routes/product')
const uploadRoute = require('./routes/upload')
const userRoute = require('./routes/user')
const cartItemRoute = require('./routes/cartItem')
const orderRoute = require('./routes/order')
const waveRoute = require('./routes/station')

app.use('/api/products', productRoute)
app.use('/upload', uploadRoute)
app.use('/api/user', userRoute)
app.use('/api/cartItem', cartItemRoute)
app.use('/api/order', orderRoute)
app.use('/api/wave', waveRoute)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
