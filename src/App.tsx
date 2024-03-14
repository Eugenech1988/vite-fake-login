import React from 'react';
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPass from './components/ForgotPass';
import ResetPass from './components/ResetPass';

const App:React.FC = () => {
  return (
    <Container maxWidth='xs'>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/forgot' element={<ForgotPass/>}/>
        <Route path='/reset' element={<ResetPass/>}/>
      </Routes>
    </Container>
  );
}

export default App;
