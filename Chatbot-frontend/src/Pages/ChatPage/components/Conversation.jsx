import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState } from 'react'
import './Conversation.css'

function ImageMessage({ src }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="image-wrapper">
      {!loaded && <div className="image-skeleton" />}
      <img
        src={src}
        alt="generated"
        className="generated-image"
        style={{ display: loaded ? 'block' : 'none' }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}



function Conversation({ messages, loading, bottomRef, latestBotRef }) {
  const lastBotIndex = messages.map(m => m.role).lastIndexOf('assistant')

  function copyToClipboard(code) {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="conversation">
      {messages.length === 0 && !loading && (
        <div className="welcome-message">
          How can I assist you today?
        </div>
      )}

      {messages.map((msg, index) => (
        msg.role === 'user' ? (
          <div className="user" key={index}>
            <div className="message">{msg.content}</div>
            <div className="profile-pic-div">
              <img src="/userAvatar.png" alt="user" />
            </div>
          </div>
        ) : (
          <div
            className="bot"
            key={index}
            ref={index === lastBotIndex ? latestBotRef : null}
          >
            <div className="profile-pic-div">
              <img src="/chatbot.png" alt="bot" />
            </div>
            <div className="message formatted">
              {msg.type === 'image' ? (
                <ImageMessage src={msg.content} />
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({  inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      const codeString = String(children).replace(/\n$/, '')
                      return !inline && match ? (
                        <div className="code-canvas">
                          <div className="code-canvas-header">
                            <span className="code-language">{match[1]}</span>
                            <button className="copy-button" onClick={() => copyToClipboard(codeString)}>
                              Copy
                            </button>
                          </div>
                          <SyntaxHighlighter style={oneLight} language={match[1]} PreTag="div" {...props}>
                            {codeString}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className="inline-code" {...props}>{children}</code>
                      )
                    }
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        )
      ))}

      {loading && (
        <div className="bot">
          <div className="profile-pic-div">
            <img src="/chatbot.png" alt="bot" />
          </div>
          <div className="message typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

export default Conversation