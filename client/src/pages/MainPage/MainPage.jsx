import React, { useState, useContext, useCallback } from 'react'
import axios from 'axios'
import './MainPage.scss'
import { AuthContext } from '../../context/AuthContext'
import { useEffect } from 'react'

export const MainPage = () => {
   const [text, setText] = useState('') //состояние для input
   const { userId } = useContext(AuthContext) //для передачи в запрос на сервер берем
   const [todos, setTodos] = useState([])

   //создаем функцию получаения наших todo дляч определенно го пользолвателя
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => {
      axios
         .get('/api/todos', {
            headers: {
               'Content-Type': 'application/json',
            },
            params: { userId },
         })
         .then(response => setTodos(response.data))
         .catch(e => console.log(e))
   }, [userId])

   //функция для todo элемента
   const createTodo = useCallback(async () => {
      if (!text) return null
      try {
         await axios
            .post(
               '/api/todos/add',
               {
                  text,
                  userId,
               },
               {
                  headers: {
                     'Content-Type': 'application/json',
                  },
               }
            )
            //очистка ввода input и добавление в базу и отправка  на сервер
            .then(response => {
               setTodos([...todos, response.data])
               setText('')
            })
      } catch (e) {
         console.log(e)
      }
   }, [text, userId, todos])

   return (
      <div className='container'>
         <div className='main-page'>
            <h4>Добавить задачу:</h4>
            <form
               className='form form-login'
               onSubmit={e => e.preventDefault()}
            >
               <div className='row'>
                  <div className='input-field col s12'>
                     <input
                        type='text'
                        id='text'
                        name='input'
                        className='validate'
                        value={text}
                        onChange={e => setText(e.target.value)}
                     />
                     <label htmlFor='input'>Задача:</label>
                  </div>
               </div>
               <div className='row'>
                  <button
                     className='waves-effect waves-light btn blue'
                     onClick={createTodo}
                  >
                     Добавить
                  </button>
               </div>
            </form>
            <h3>Активные задачи:</h3>
            <div className='todos'>
               {todos.map((todo, index) => (
                  <div className='row flex todos__item' key={index}>
                     <div className='col todos__num'>{index + 1}</div>
                     <div className='col todos__text'>{todo.text}</div>
                     <div className='col todos__buttons'>
                        <i className='material-icons blue-text'>check</i>
                        <i className='material-icons orange-text'>warning</i>
                        <i className='material-icons red-text'>delete</i>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
