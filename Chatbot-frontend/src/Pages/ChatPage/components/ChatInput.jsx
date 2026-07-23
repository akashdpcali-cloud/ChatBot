import { useState, useRef, useEffect } from 'react'
import './ChatInput.css'

function ChatInput({ onSend, loading, onImageGenerated }) {
  const [input, setInput] = useState('')
  const [imgLoading, setImgLoading] = useState(false)
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

  async function handleImageGenerate() {
  if (!input.trim() || imgLoading) return

  const prompt = input
  setImgLoading(true)

  try {
    setInput('')
    await onImageGenerated(prompt)
  } catch (err) {
    console.error('Image generation failed:', err)
  } finally {
    setImgLoading(false)
    inputRef.current?.focus()
  }
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
        disabled={loading || imgLoading}
      />
      <button
        className="gen-button"
        onClick={handleImageGenerate}
        disabled={imgLoading || loading}
      >
        {imgLoading ? '...' : 'Img'}
      </button>
      <button className="ask-button" onClick={handleSend} disabled={loading || imgLoading}>
        {loading ? '...' : 'Ask'}
      </button>
    </div>
  )
}

export default ChatInput