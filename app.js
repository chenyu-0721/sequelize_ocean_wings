require('dotenv').config()
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use(express.json())

const productRoute = require('./routes/product')
app.use('/api/products', productRoute)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
