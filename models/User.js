const { Schema, model, Types, ObjectId } = require('mongoose')

const User = new Schema({
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   todos: [{ type: ObjectId, ref: 'Todo' }],
})

module.exports = model('User', User)
