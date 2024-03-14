import React from 'react';
import Box from '@mui/material/Box';
import logo from '../../assets/logo.svg';

const LogoBox:React.FC = () => {
  return (
    <Box textAlign="center" paddingTop="180px" marginBottom="80px">
      {/*@ts-ignore*/}
      <img align="center" src={logo} alt="qencode"/>
    </Box>
  )
}

export default LogoBox;
