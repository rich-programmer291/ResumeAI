import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className=''>
        <footer className="footer">
        <p>Made with 🩷 by Richa Anand</p>
        <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/sf-black-filled/64/FFFFFF/github.png" alt="GitHub" />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/64/FFFFFF/linkedin.png" alt="LinkedIn" />
          </a>
          <a href="mailto:support@resumeai.com">
            <img src="https://img.icons8.com/ios-glyphs/64/FFFFFF/email.png" alt="Email" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Footer