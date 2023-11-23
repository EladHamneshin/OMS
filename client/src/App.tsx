import { Routes, BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NavBar from './pages/navBar'
import Home from './pages/home'
import Dashboard from './pages/dashboard'

function App() {

  return (
    <>

      <NavBar />

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
