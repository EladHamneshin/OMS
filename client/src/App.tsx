import { Routes, BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import OrdersComponent from "./pages/OrdersComponent"
import Order from "./pages/Order"

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/orders" element={<OrdersComponent />} />
          <Route path="/order" element={<Order/>} />



        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
