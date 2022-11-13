const Router = require('express')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')

const router = new Router()
const bcryptjs = require('bcryptjs')

router.post(
   '/registration',
   [
      check('email', 'Не коректный email').isEmail(),
      check('password', 'Не коректный пароль').isLength({ min: 3, max: 12 }),
   ],

   async (req, res) => {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return res
               .status(400)
               .json({ message: 'Произошла ошибка', errors: array() })
         }
         const { email, password } = req.body
         //Ищем то что пришло в базе данных
         const isUser = await User.findOne({ email })
         if (isUser) {
            return res.status(300).json({
               message: 'Такой email уже существует',
            })
         }
         const hashPassword = await bcryptjs.hash(password, 10)
         //Создаем нового пользвоаотеля и помещаем даннеы укоторые у нас есть
         const user = new User({
            email,
            password: hashPassword,
         })
         // и записываем в базу данных
         await user.save()
         return res.status(200).json({ user, message: 'Пользователь  создан' })
      } catch (e) {
         console.log(e)
         res.send({ message: 'Server error', e })
      }
   }
)

router.post(
   '/login',
   // получаем переменные из запроса
   async (req, res) => {
      try {
         const { email, password } = req.body
         //Ищем получаемый email который пришле в запросе в базе данных
         const user = await User.findOne({ email })
         //проверяем если пользователя нет то должны выдвать ошибку
         if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
         }
         const isPassValid = bcryptjs.compareSync(password, user.password)
         //если пароли не совпадают то выдаем ошибку
         if (!isPassValid) {
            return res.status(400).json({ message: 'Не корректный пароль' })
         }
         //если все хорошо то создаем token который потом передадим пользователю для последующей работы
         const token = jwt.sign(
            {
               userId: user.id,
            },
            config.get('secretKey'),
            {
               expiresIn: '1h',
            }
         )
         //отправляем все обратно пользователю
         return res.json({
            token,
            user: {
               userId: user.id,
            },
         })
      } catch (e) {
         console.log(e)
         res.send({ message: 'Server error', e })
      }
   }
)

module.exports = router
