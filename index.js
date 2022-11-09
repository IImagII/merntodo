const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const config = require('config')

const app = express()

const PORT = process.env.PORT || 5000
const url = config.get('dbUrl')
app.use(express.json())
//Для комфортного логирования сервера
app.use(cors())
app.use(morgan('dev'))

app.use(
   express.urlencoded({
      extended: true,
   })
)
//Тестовый запрос для проверки
app.get('/', (req, res) => {
   res.send('Hello')
})
//подключение к базе данных и авто запуск сервера
mongoose
   .connect(url)
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Success status server run ${PORT}`)
      })
   })
   .catch(error => console.log(error))
