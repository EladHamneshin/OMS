import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import NavBar from './pages/navBar';
import Home from './pages/home';
import OrdersComponent from './pages/Orders';
import Register from './pages/Register';
import Logout from './components/Logout';
import 'react-toastify/dist/ReactToastify.css';
import Kidnapped from './components/Kidnapped';
import Users from './pages/Users';
import Graph from './pages/graphs';
import Geography from './scenes/geography';
import { useState } from 'react';
import { ColorModeContext, useMode } from "./theme/theme";
import { CssBaseline, ThemeProvider } from '@mui/material';
import CustomSidebar from './components/CustomSidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/DashboardNew';


function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState<boolean>(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <BrowserRouter>
            
            <main className="content">
              <CustomSidebar isSidebar={isSidebar} />
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
<Route path="/oms" element={<Home />} />
          <Route path="/oms/login" element={<SignIn />} />
          <Route path="/oms/orders" element={<OrdersComponent />} />
          <Route path="/oms/register" element={<Register />} />
          <Route path="/oms/logout" element={<Logout/>}/>
          <Route path="/oms/graph" element={<Graph/>}/>
          <Route path="/oms/users" element={<Users/>}/>
                                <Route path="/oms/graph" element={<Graph />} />
                <Route path="/oms/dashboard" element={<Dashboard />} />
          <Route path={'*'} element={<h1>404 Not Found</h1>} />


              </Routes>

              <Kidnapped />
            </main>
          </BrowserRouter>

        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >
