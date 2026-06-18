import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'

function Signup() {
  const [showPass, setShowPass] = useState(false)

  return (
    <div className="main-div">
      <div className="title">Sign up</div>
      <input className="username" type="text" placeholder="Enter your username" />
      <input className="mail" placeholder="Enter your mail" type="text" />
      <div className="password-wrapper">
        <input type={showPass ? "text" : "password"} placeholder="Create a password" />
        <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
          {showPass ? "🙈" : "👁️"}
        </span>
      </div>
      <button>Sign up</button>
      <Link className="link" to="/">Already have an account: login</Link>
    </div>
  )
}

export default Signup