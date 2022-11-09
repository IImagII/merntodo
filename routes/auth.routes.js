const Router = require('express')
const User = require('../models/user')
const { check, validationResult } = require('express-validator')

const router = new Router()
const bcryptjs = require('bcryptjs')

router.post(
   '/registration',
   [
      check('email', 'Не кореектный email').isEmail(),
      check('password', 'Не корректный пароль').isLength({ min: 3, max: 12 }),
   ],

   async (req, res) => {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Произошла ошибка', errors })
         }
         const { email, password } = req.body
         //Ищем то что пришло в базе данных
      } catch (e) {
         console.log(e)
         res.send({ message: 'Server error', e })
      }
   }
)

module.exports = router
