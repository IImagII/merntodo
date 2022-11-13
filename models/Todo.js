const { Schema, model, Types, ObjectId } = require('mongoose')

const Todo = new Schema({
   //это владалец todo его мы связываем с моделью User

   text: { type: String },
   owner: { type: ObjectId, ref: 'User' },
   completed: false,
   important: false,
})

module.exports = model('Todo', Todo)
