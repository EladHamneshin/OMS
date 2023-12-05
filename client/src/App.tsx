import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import NavBar from './pages/navBar';
import Home from './pages/home';
import OrdersComponent from './pages/Orders'; ``
import Register from './pages/Register';
import Logout from './components/Logout';
import Kidnapped from './components/Kidnapped';
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
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/orders" element={<OrdersComponent />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/graph" element={<Graph />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path={'*'} element={<h1>404 Not Found</h1>} />
              </Routes>

              <Kidnapped />
            </main>
          </BrowserRouter>

        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
