import { useState, useRef, useEffect } from 'react'
import './ChatSection.css'
import Conversation from './Conversation'
import ChatInput from './ChatInput'
import api from '../../../api/axios'

function ChatSection({ messages, setMessages, activeChatId, setActiveChatId, onNewChat, onTitleUpdate }) {
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const latestBotRef = useRef(null)
  const isFirstMessage = useRef(true)

  useEffect(() => {
    isFirstMessage.current = true
  }, [activeChatId])

  useEffect(() => {
    if (latestBotRef.current) {
      latestBotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [messages])

  async function handleSend(input) {
    if (!input.trim() || loading) return

    let chatId = activeChatId

    if (!chatId) {
      try {
        const { data } = await api.post('/chats')
        chatId = data.id
        setActiveChatId(data.id)
        isFirstMessage.current = true
        if (onNewChat?.current) onNewChat.current()
      } catch (err) {
        console.error('Failed to create chat:', err)
        return
      }
    }

    const userMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const { data } = await api.post(`/chats/${chatId}/messages`, {
        content: input
      })
      setMessages((prev) => [...prev, data.message])

      if (isFirstMessage.current) {
        isFirstMessage.current = false
        if (onTitleUpdate?.current) onTitleUpdate.current(chatId)
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `${err}` }
      ])
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