import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const [showPass, setShowPass] = useState(false)

  return (
    <div className="login-page">
      <div className="main-div">
        <div className="title">Login</div>
        <input className="mail" placeholder="Enter your mail" type="text" />
        <div className="password-wrapper">
          <input type={showPass ? "text" : "password"} placeholder="Enter your password" />
          <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>
        <button>Login</button>
        <Link className="link" to="/signup">New user: sign up</Link>
      </div>
    </div>
    
  )
}

export default Login