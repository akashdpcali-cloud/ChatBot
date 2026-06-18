import { useState, useRef } from 'react'
import './Chat.css'
import Header from './components/Header'
import ChatHistory from './components/ChatHistory'
import ChatSection from './components/ChatSection'

function Chat() {
  const [historyWidth, setHistoryWidth] = useState(260)
  const isResizing = useRef(false)

  function handleMouseDown() {
    isResizing.current = true

    function handleMouseMove(e) {
      if (!isResizing.current) return
      const newWidth = e.clientX
      if (newWidth >= 150 && newWidth <= 500) {
        setHistoryWidth(newWidth)
      }
    }

    function handleMouseUp() {
      isResizing.current = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="chat-page">
      <Header />
      <div className="main-section">
        <ChatHistory width={historyWidth} />
        <div className="resizer" onMouseDown={handleMouseDown} />
        <ChatSection />
      </div>
    </div>
  )
}

export default Chat