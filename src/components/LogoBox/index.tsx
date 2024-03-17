import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import logo from '../../assets/logo.svg';

const LogoBox: React.FC = () => {
  const mediaMatch = window.matchMedia('(max-width: 768px)');
  const [matches, setMatches] = useState<boolean>(mediaMatch.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const styles = {
    box: (matches: boolean): React.CSSProperties => {
      if (!matches) {
        return {
          paddingTop: '180px',
          marginBottom: '80px',
          textAlign: 'center'
        };
      } else {
        return {
          paddingTop: '60px',
          marginBottom: '40px',
          textAlign: 'center'
        };
      }
    }
  };

  return (
      <Box style={styles.box(matches)}>
        <img src={logo} alt="qencode"/>
      </Box>
  );
};

export default LogoBox;
