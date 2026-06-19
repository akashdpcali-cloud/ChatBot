import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import './Login.css'

function Login() {
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin() {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/chat')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <>
    
    <title>Login</title>


    <div className="login-page">
      <div className="main-div">
        <div className="title">Login</div>
        <input
          className="mail"
          placeholder="Enter your mail"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-wrapper">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
            {showPass ? "👓" : "🕶️"}
          </span>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <Link className="link" to="/signup">New user: sign up</Link>
      </div>
    </div>
    </>

    
  )
}

export default Login