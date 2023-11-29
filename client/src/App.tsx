
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import NavBar from './pages/navBar';
import Home from './pages/home';
import OrdersComponent from './pages/Orders';
// import Logout from './components/Logout';
import Register from './pages/Register';
import Orders from './pages/Orders';
import SignUp from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/orders" element={<OrdersComponent />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<OrdersComponent />} />

          {/* <Route path="/logout" element={<Logout />} /> */}

          {/* <Route path="/logout" element={<Logout />} /> */}


        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
