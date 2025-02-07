const express = require('express')
const { isAuth } = require('../statusHandle/auth')
const ctrl_users = require('../controllers/controllews_user')
const router = express.Router()

router.get('/', ctrl_users.getUser)
router.get('/refresh', isAuth, ctrl_users.getUserAuth)

router.delete('/:id', ctrl_users.deleteUser)

router.post('/sign_up', ctrl_users.sign_up)

router.post('/sign_in', ctrl_users.sign_in)

router.post('/logout', ctrl_users.logout)

module.exports = router
