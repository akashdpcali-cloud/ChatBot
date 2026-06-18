import { Routes, Route } from 'react-router-dom'
import Login from './Pages/LoginPage/Login.jsx'
import Signup from './Pages/SignupPage/Signup.jsx'
import Chat from './Pages/ChatPage/Chat'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}

export default App