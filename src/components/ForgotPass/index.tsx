import React, { ChangeEvent, KeyboardEvent, FocusEvent, MouseEventHandler, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LogoBox from '../LogoBox';
import HeadingNotify from '../HeadingNotify';
import { input, inputLabel, submitNavigateBtn } from '../styleConstants';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import apiRequest from '../../api';
// import apiRequest from '../../api';

const ForgotPass: React.FC = () => {
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  // const navigate = useNavigate();

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailFocus = () => {
    setErrorEmail(null);
  };

  const handleEmailEnterPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(target.value)) {
        setErrorEmail(null);
      } else {
        setErrorEmail('Email is invalid');
      }
      target.blur();
    }
  };

  const handleEmailBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(e.target.value)) {
      setErrorEmail(null);
    } else {
      setErrorEmail('Email is invalid');
    }
  };

  const handleForgotClick: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();
    // if (!errorEmail) {
    //   navigate('/reset');
    // }
    if (!errorEmail) {
      const {data, error} = await apiRequest(
        '/v1/auth/password-reset',
        'post',
        {
          email
        }
      );
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Response:', data);
      }
    }
  };
  return (
    <>
      <LogoBox/>
      <HeadingNotify text="Forgot Password?"/>
      <Box>
        <form>
          <FormControl sx={{marginBottom: '30px'}} fullWidth variant="outlined">
            <InputLabel error={errorEmail !== null} sx={inputLabel} htmlFor="outlined-mail">Work email</InputLabel>
            <OutlinedInput
              id="outlined-mail"
              error={errorEmail !== null}
              onBlur={handleEmailBlur}
              onFocus={handleEmailFocus}
              onKeyPress={handleEmailEnterPress}
              onChange={handleEmailInputChange}
              value={email}
              fullWidth
              type="text"
              sx={input}
              label="Enter your mail"
            />
          </FormControl>
          {/*@ts-ignore*/}
          <Button sx={{...submitNavigateBtn, background: '#316FEA', marginBottom: '30px'}} fullWidth
                  onClick={handleForgotClick} variant="contained">Send</Button>
        </form>
        <Link to="/"><Button sx={{...submitNavigateBtn, color: '#060E1E', borderColor: '#D3D8DC'}} fullWidth
                             variant="outlined">Cancel</Button></Link>
      </Box>
    </>
  );
};

export default ForgotPass;
