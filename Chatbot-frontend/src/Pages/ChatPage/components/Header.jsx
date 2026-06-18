import { useState, useRef, useEffect } from 'react'
import './Header.css'

function Header() {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const detailsRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (detailsRef.current && !detailsRef.current.contains(e.target)) {
        setPinned(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
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
        <div className="username">Username</div>

        {(hovered || pinned) && (
          <div className="user-details">
            <div className="username">Username</div>
            <div className="mail-id">default@mail.com</div>
            <button className="logout-button">Logout</button>
          </div>
        )}
      </div>
      <div className="right-section upgrade">Upgrade</div>
    </header>
  )
}

export default Header