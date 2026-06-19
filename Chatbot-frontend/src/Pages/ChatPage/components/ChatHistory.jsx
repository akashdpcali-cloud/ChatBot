import { useEffect, useState, useRef } from 'react'
import api from '../../../api/axios'
import './ChatHistory.css'

function ChatHistory({ width, activeChatId, setActiveChatId, setMessages, onNewChat, onTitleUpdate }) {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [menuOpenId, setMenuOpenId] = useState(null)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const [renamingId, setRenamingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const menuRef = useRef(null)

  async function fetchChats() {
    try {
      const { data } = await api.get('/chats')
      setChats(data)
    } catch (err) {
      console.error('Failed to fetch chats:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updateChatTitle(chatId) {
    try {
      const { data } = await api.get('/chats')
      const updated = data.find(c => c.id === chatId)
      if (updated) {
        setChats((prev) => prev.map(c => c.id === chatId ? { ...c, title: updated.title } : c))
      }
    } catch (err) {
      console.error('Failed to update title:', err)
    }
  }

  useEffect(() => {
    fetchChats()
    if (onNewChat) onNewChat.current = fetchChats
    if (onTitleUpdate) onTitleUpdate.current = updateChatTitle
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleChatClick(chatId) {
    if (menuOpenId || renamingId) return
    setActiveChatId(chatId)
    setMessages([])
    try {
      const { data } = await api.get(`/chats/${chatId}/messages`)
      setMessages(data)
    } catch (err) {
      console.error('Failed to fetch messages:', err)
    }
  }

  async function handleDelete(chatId) {
    setMenuOpenId(null)
    try {
      await api.delete(`/chats/${chatId}`)
      if (activeChatId === chatId) {
        setActiveChatId(null)
        setMessages([])
      }
      await fetchChats()
    } catch (err) {
      console.error('Failed to delete chat:', err)
    }
  }

  function handleRenameClick(chat) {
    setMenuOpenId(null)
    setRenamingId(chat.id)
    setRenameValue(chat.title)
  }

  async function handleRenameSubmit(chatId) {
    if (!renameValue.trim()) return
    try {
      const { data } = await api.put(`/chats/${chatId}`, { title: renameValue })
      setChats((prev) => prev.map(c => c.id === chatId ? { ...c, title: data.title } : c))
    } catch (err) {
      console.error('Failed to rename chat:', err)
    } finally {
      setRenamingId(null)
      setRenameValue('')
    }
  }

  async function handleNewChat() {
    try {
      const { data } = await api.post('/chats')
      setChats((prev) => [data, ...prev])
      setActiveChatId(data.id)
      setMessages([])
    } catch (err) {
      console.error('Failed to create chat:', err)
    }
  }

  function handleDotsClick(e, chatId) {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setMenuPos({ top: rect.bottom + 4, left: rect.left - 100 })
    setMenuOpenId(menuOpenId === chatId ? null : chatId)
  }

  return (
    <div className="left-chat-history" style={{ width: `${width}px`, minWidth: `${width}px` }}>
      <div className="chat-history-header">Chat History</div>
      <div className="chat-history">
        {loading && <div className="chat-status">Loading...</div>}
        {!loading && chats.length === 0 && (
          <div className="chat-status">No chats yet</div>
        )}
        {chats.map((chat) => (
          <div
            className={`chat1 ${activeChatId === chat.id ? 'active' : ''}`}
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
          >
            {renamingId === chat.id ? (
              <input
                className="rename-input"
                value={renameValue}
                autoFocus
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenameSubmit(chat.id)
                  if (e.key === 'Escape') setRenamingId(null)
                }}
                onBlur={() => handleRenameSubmit(chat.id)}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <span className="chat-title">{chat.title}</span>
                <span className="three-dots" onClick={(e) => handleDotsClick(e, chat.id)}>
                  ⋮
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      {menuOpenId && (
        <div
          className="chat-menu"
          ref={menuRef}
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          <div className="chat-menu-item" onClick={(e) => { e.stopPropagation(); handleRenameClick(chats.find(c => c.id === menuOpenId)) }}>
             Rename
          </div>
          <div className="chat-menu-item delete" onClick={(e) => { e.stopPropagation(); handleDelete(menuOpenId) }}>
             Delete
          </div>
        </div>
      )}

      <div className="new-chat-button" onClick={handleNewChat}>+ New chat</div>
    </div>
  )
}

export default ChatHistory