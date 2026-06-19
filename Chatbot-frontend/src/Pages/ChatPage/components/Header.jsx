import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/axios'
import UpgradeModal from './UpgradeModal'
import './Header.css'

function Header() {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [user, setUser] = useState({ username: '', email: '' })
  const [showUpgrade, setShowUpgrade] = useState(false)
  const detailsRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await api.get('/user')
        setUser(data)
      } catch (err) {
        navigate('/')
        console.log(err)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (detailsRef.current && !detailsRef.current.contains(e.target)) {
        setPinned(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/')
    }
  }

  return (
    <>
      <header className="header">
        <div
          className="left-section"
          ref={detailsRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setPinned(true)}
        >
          <div className="profile-img-div">
            <img className="profile-img" src="/userAvatar.png" alt="profile" />
          </div>
          <div className="username">{user.username || 'User'}</div>

          {(hovered || pinned) && (
            <div className="user-details">
              <div className="username">{user.username}</div>
              <div className="mail-id">{user.email}</div>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        <div className="right-section upgrade" onClick={() => setShowUpgrade(true)}>
          Upgrade
        </div>
      </header>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </>
  )
}

export default Header