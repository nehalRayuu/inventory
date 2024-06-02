import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import SaleOrderList from "./components/SaleOrderList";
import { Box, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { login, logout } from './components/Store/authSlice';

function App() {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login());
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box bg={bgColor} minHeight="100vh" p={4}>
      <Button onClick={toggleColorMode} mb={4}>
        Toggle Mode
      </Button>
      {isAuthenticated && (
        <Button onClick={handleLogout} mb={4} ml={4}>
          Logout
        </Button>
      )}
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <SaleOrderList />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
