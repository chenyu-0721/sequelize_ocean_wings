require('dotenv').config()
const express = require('express')
const app = express()
const initOAS = require('express-oas-generator').init

app.use(express.json())
initOAS(app, {})

app.get('/', (req, res) => {
	res.send('Welcome to the API!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
