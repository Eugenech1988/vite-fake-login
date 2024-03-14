import React from 'react';
import { Link } from 'react-router-dom';

interface LinkProps {
  path: string,
  text: string
}

const CustomLink:React.FC<LinkProps> = ({path, text}) => {
  return (
    <Link style={{color: '#316FEA', textDecoration: 'none'}} to={path}>{text}</Link>
  )
}

export default CustomLink;
