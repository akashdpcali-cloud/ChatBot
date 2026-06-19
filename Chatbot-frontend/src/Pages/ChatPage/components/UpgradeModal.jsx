import './UpgradeModal.css'

function UpgradeModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <div className="modal-title">Choose your plan</div>
          <span className="modal-close" onClick={onClose}>✕</span>
        </div>

        <div className="plans">

          <div className="plan free">
            <div className="plan-name">Free</div>
            <div className="plan-price">₹0 <span>/month</span></div>
            <ul className="plan-features">
              <li>✅ 5 messages per day</li>
              <li>✅ Chat history</li>
              <li>✅ Rename & delete chats</li>
              <li>❌ Unlimited messages</li>
              <li>❌ Priority response</li>
            </ul>
            <button className="plan-btn free-btn" disabled>Current Plan</button>
          </div>

          <div className="plan pro">
            <div className="plan-badge">Most Popular</div>
            <div className="plan-name">Pro</div>
            <div className="plan-price">₹299 <span>/month</span></div>
            <ul className="plan-features">
              <li>✅ Unlimited messages</li>
              <li>✅ Chat history</li>
              <li>✅ Rename & delete chats</li>
              <li>✅ Priority response</li>
              <li>✅ Early access to new features</li>
            </ul>
            <button className="plan-btn pro-btn">Upgrade to Pro</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default UpgradeModal