import Box from '@mui/material/Box';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './Routes';
import { AuthProvider } from './services/auth';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <Box sx={{ display: 'flex' }}>
            <Box component='main' sx={{ flexGrow: 1, px: 3 }}>
              <AppRoutes />
            </Box>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
