import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { system } from "@chakra-ui/react/preset";
import AppRoutes from './routes/AppRoutes';
import { makeServer } from './mocks/server';
import './assets/styles/index.css';

if (import.meta.env.MODE === 'development') {
  makeServer();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={system}>  
      <Router>
        <AppRoutes />
      </Router>
    </ChakraProvider>
  </StrictMode>
);


