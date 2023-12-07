import { Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import { DataProvider } from './components/DataContext'
import UserContextProvider from './userContext';
import './App.css';
import SignIn from './pages/SignIn';
import NavBar from './pages/navBar';
import Home from './pages/home';
import OrdersComponent from './pages/Orders';
import Register from './pages/Register';
import Logout from './components/Logout';
import Dashboard from './pages/Dashboard';
import Kidnapped from './components/Kidnapped';
import 'react-toastify/dist/ReactToastify.css';
import Geography from './scenes/geography';
import Users from './pages/Users';
import Graph from './pages/graph';


function App() {
  const [theme, colorMode] = useMode();
  return (
   
      <UserContextProvider>
        
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <>
                <NavBar />
                <DataProvider>
                <Routes>
                  <Route path="/oms" element={<Home />} />
                  <Route path="/oms/login" element={<SignIn />} />
                  <Route path="/oms/orders" element={<OrdersComponent />} />
                  <Route path="/oms/register" element={<Register />} />
                  <Route path="/oms/logout" element={<Logout />} />
                  <Route path="/oms/graph" element={<Graph />} />
                  <Route path="/oms/users" element={<Users />} />
                  <Route path="/oms/Dashboard" element={<Dashboard />} />
                  <Route path="/oms/geography" element={<Geography />} />
                  <Route path={'*'} element={<h1>404 Not Found</h1>} />
                </Routes> 
                </DataProvider>
                <Kidnapped />
              </>
            </ThemeProvider>
          </ColorModeContext.Provider>
      </UserContextProvider>

  );
}

export default App;
