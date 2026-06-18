import { useState, useRef, useEffect } from 'react'
import './ChatSection.css'
import Conversation from './Conversation'
import ChatInput from './ChatInput'
import { sendMessage } from '../../../api/groq'

function ChatSection() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const latestBotRef = useRef(null)

  useEffect(() => {
    if (latestBotRef.current) {
      latestBotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [messages])

  async function handleSend(input) {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const reply = await sendMessage(updatedMessages)
      setMessages([...updatedMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: `${err}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-section">
      <Conversation messages={messages} loading={loading} bottomRef={bottomRef} latestBotRef={latestBotRef} />
      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  )
}

export default ChatSection