import './Conversation.css'

function Conversation() {
  return (
    <div className="conversation">
      <div className="user">
        <div className="message">hey</div>
        <div className="profile-pic-div">
          <img src="/userAvatar.png" alt="user" />
        </div>
      </div>

      <div className="bot">
        <div className="profile-pic-div">
          <img src="/chatbot.png" alt="bot" />
        </div>
        <div className="message">hello, how can i help you</div>
      </div>
    </div>
  )
}

export default Conversation