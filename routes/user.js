const express = require('express')
const ctrl_users = require('../controllers/controllews_user')
const router = express.Router()

router.get('/user', ctrl_users.getUser)

router.delete('/user/:id', ctrl_users.deleteUser)

router.post('/auth/sign_up', ctrl_users.sign_up)

router.post('/auth/sign_in', ctrl_users.sign_in)

router.post('/auth/logout', ctrl_users.logout)

module.exports = router
