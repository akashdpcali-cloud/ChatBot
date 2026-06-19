import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import './Signup.css'

function Signup() {
  const [showPass, setShowPass] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSignup() {
    if (!username || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data } = await api.post('/auth/register', { username, email, password })
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
    <div className="signup-page">
      <div className="main-div">
        <div className="title">Sign up</div>
        <input
          className="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
          />
          <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
            {showPass ? "👓" : "🕶️"}
          </span>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleSignup} disabled={loading}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
        <Link className="link" to="/">Already have an account: login</Link>
      </div>
    </div>
  )
}

export default Signup