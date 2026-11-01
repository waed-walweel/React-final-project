import { Routes, Route } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import AuthLayout from './Layout/AuthLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgotPas from './pages/ForgotPas/ForgotPas' 
import Categories from './components/Categories/Categories'

function App() {
  return (
    <Routes>
      
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />  
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
     
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPas />} />
      </Route>
    </Routes>
  )
}

export default App




