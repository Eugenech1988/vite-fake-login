import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import logo from '../../assets/logo.svg';

const LogoBox: React.FC = () => {
  const mediaMatch = window.matchMedia('(max-width: 768px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const styles = {
    box: (match) => {
      if (match === false) {
        return {
          paddingTop: '180px',
          marginBottom: '80px',
          textAlign: 'center'
        };
      } else if (match === true) {
        return {
          paddingTop: '60px',
          marginBottom: '40px',
          textAlign: 'center'
        };
      }

    }
  };

  return (
    <>
      {/*ts-ignore*/}
      <Box style={styles.box(matches)}>
        <img src={logo} alt="qencode"/>
      </Box>
    </>
  );
};

export default LogoBox;
