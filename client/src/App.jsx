import { Navbar } from './components/Navbar/Navbar'
import './App.scss'
import { AuthPage } from './pages/AuthPage/AuthPage'

function App() {
   return (
      <div className='app'>
         <Navbar />
         <AuthPage />
      </div>
   )
}

export default App
