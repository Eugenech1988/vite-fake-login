import React from 'react';
import Typography from '@mui/material/Typography';

interface HeadingProps {
  text: string
}

const HeadingNotify:React.FC<HeadingProps> = ({text}) => {
  return (
    <Typography textAlign="center" marginBottom="40px" variant="h3">{text}</Typography>
  );
};

export default HeadingNotify;
