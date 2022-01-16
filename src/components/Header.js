import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'

const Header = () => {
return <header>
      <div>
        <Link to='/home' className='home-link'>Home</Link>
        <Link to='/about' className='about-section'>About</Link>
      </div>
      <p>Language: English</p>
    </header>
}

export default Header;