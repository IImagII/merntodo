import React from 'react'
import './Navbar.scss'

export const Navbar = () => {
   return (
      <nav>
         <div className='nav-wrapper blue accent-1'>
            <a href='/' className='brand-logo'>
               My TODO
            </a>
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
               <li>
                  <a href='/'>Войти</a>
               </li>
            </ul>
         </div>
      </nav>
   )
}
