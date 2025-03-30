import React from 'react'
import './Nav.css';
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
    <nav className='navbar'>
        <h2 className='brand'>ResumeAi<sup><img width="20" height="20" src="https://img.icons8.com/ios-filled/50/FFFFFF/sparkling--v1.png" alt="sparkling--v1"/></sup></h2>
        <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/scan">ATS Scan</Link>
        </li>
        <li>
          <Link to="/scan-using-jd">JD-Based Scan</Link>
        </li>
      </ul>
    </nav>
    </>
  )
}

export default Nav
