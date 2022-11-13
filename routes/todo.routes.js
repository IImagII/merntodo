const Router = require('express')
const router = new Router()
const Todo = require('../models/Todo')

router.post('/add', async (req, res) => {
   try {
      const { text, userId } = req.body //получаем текст из запроса который пишет клиент а также какой клиент пишет
      //создаем наш todo и записываем в базу
      const todo = await new Todo({
         text,
         owner: userId,
         completed: false,
         important: false,
      }).save()
      //отправляем ответ на фронт
      res.json(todo)
   } catch (e) {
      console.log(e)
      res.send({ message: 'Server error', e })
   }
})

router.get('/', async (req, res) => {
   try {
      const { userId } = req.query
      const todo = await Todo.find({ owner: userId })
      res.status(200).json(todo)
   } catch (e) {
      console.log(e)
      res.send({ message: 'Server error', e })
   }
})

router.delete('/delete/:id', async (req, res) => {
   try {
   } catch (e) {
      res.send({ message: 'Server error', e })
   }
})

module.exports = router
