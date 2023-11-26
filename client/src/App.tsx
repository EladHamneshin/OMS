import { Routes, BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NavBar from './pages/navBar'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import OrdersComponent from './pages/Orders'

function App() {

  return (
    <>


      <NavBar />

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/orders" element={<OrdersComponent/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
