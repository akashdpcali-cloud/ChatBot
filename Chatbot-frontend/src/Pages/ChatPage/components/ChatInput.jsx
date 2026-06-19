import { useState, useRef, useEffect } from 'react'
import './ChatInput.css'

function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus()
    }
  }, [loading])

  function handleSend() {
    if (!input.trim() || loading) return
    onSend(input)
    setInput('')
    inputRef.current?.focus()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="chat-input">
      <input
        ref={inputRef}
        placeholder="Ask anything"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button className="ask-button" onClick={handleSend} disabled={loading}>
        {loading ? '...' : 'Ask'}
      </button>
    </div>
  )
}

export default ChatInput