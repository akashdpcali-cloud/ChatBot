import './ChatHistory.css'

function ChatHistory({ width }) {
  return (
    <div className="left-chat-history" style={{ width: `${width}px`, minWidth: `${width}px` }}>
      <div className="chat-history-header">Chat History</div>
      <div className="chat-history">
        <div className="chat1">Conversation 1</div>
        <div className="chat1">Conversation 2</div>
        <div className="chat1">Conversation 3</div>
      </div>
      <div className="new-chat-button">+ New chat</div>
    </div>
  )
}

export default ChatHistory