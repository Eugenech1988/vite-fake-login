import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App.tsx';
import './fonts.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
