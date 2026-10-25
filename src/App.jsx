import { Routes, Route } from 'react-router-dom'
import Register from "./assets/pages/Register/Register"
import Login from "./assets/pages/Login/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App






