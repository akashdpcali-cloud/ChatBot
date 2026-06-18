import { Routes, Route } from 'react-router-dom'
import Login from './Pages/LoginPage/Login.jsx'
import Signup from './Pages/SignupPage/Signup.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App