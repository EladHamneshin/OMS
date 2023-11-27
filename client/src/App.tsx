import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import NavBar from './pages/navBar';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import OrdersComponent from './pages/Orders';
import Logout from './components/Logout';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
    <>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<OrdersComponent />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
