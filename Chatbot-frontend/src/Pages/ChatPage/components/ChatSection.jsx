import './ChatSection.css'
import Conversation from './Conversation'
import ChatInput from './ChatInput'

function ChatSection() {
  return (
    <div className="chat-section">
      <Conversation />
      <ChatInput />
    </div>
  )
}

export default ChatSection