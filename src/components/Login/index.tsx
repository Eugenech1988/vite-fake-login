import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import googleIcon from '../../assets/google.svg';
import githubIcon from '../../assets/github.svg';
import LogoBox from '../LogoBox';
import HeadingNotify from '../HeadingNotify';
import CustomLink from '../CustomLink';
import apiRequest from '../../api';
import { loginDivider, submitNavigateBtn, socialBtn, input, inputLabel } from '../styleConstants';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login: React.FC = () => {
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPass, setErrorPass] = useState<string | null>(null);
  const [responseDetail, setResponseDetail] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleEmailInputChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handlePassInputChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handlePassEnterPress = (e:any) => {
    if (e.key === 'Enter') {
      if (e.target.value <= 8) {
        setErrorPass('Password must be more then 8 characters')
      }
      e.target.blur();
    }
  }

  const handlePassFocus = () => {
    setErrorPass(null)
  }

  const handlePassBlur = (e:any) => {
    if (e.target.value.length <= 8) {
      setErrorPass('Password must be more then 8 characters')
    }
  }

  const handleEmailFocus = () => {
    setErrorEmail(null);
  };

  const handleEmailEnterPress = (e:any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
        setEmailVerified(true);
        setErrorEmail(null);
      } else {
        setErrorEmail('Email is invalid');
      }
      e.target.blur();
    }
  };

  const handleEmailBlur = (e:any) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setEmailVerified(true);
      setErrorEmail(null);
    } else {
      setErrorEmail('Email is invalid');
    }
  };
  const handleErrorFocus = () => {
    setErrorPass(null);
  }

  const handleSubmitClick = async (e:any) => {
    e.preventDefault();
    if (!errorPass && !errorEmail) {
      const response = await apiRequest(
        '/v1/auth/login',
        'post',
        {
          email: 'test+ui@qencode.com',
          password: 'C4aLE2dRM7QE5mT*'
        }
      );
      setResponseDetail(response.detail);
    }
  };
  return (
    <>
      <LogoBox/>
      <HeadingNotify text="Log in to your account"/>
      <Box display="flex" justifyContent="space-between" marginBottom="30px">
        <Button
          sx={{...socialBtn, marginRight: '16px'}}
          variant="outlined" startIcon={<img src={googleIcon}/>}>Google</Button>
        <Button
          sx={socialBtn}
          variant="outlined" startIcon={<img src={githubIcon}/>}>GitHub</Button>
      </Box>
      <Divider sx={loginDivider}>OR</Divider>
      <Box>
        <form>
          <FormControl sx={{marginBottom: '30px'}} fullWidth variant="outlined">
            <InputLabel error={errorEmail !== null} sx={inputLabel} htmlFor="outlined-email">Work email</InputLabel>
            <OutlinedInput
              id="outlined-email"
              error={errorEmail !== null}
              onBlur={handleEmailBlur}
              onFocus={handleEmailFocus}
              onKeyPress={handleEmailEnterPress}
              onChange={handleEmailInputChange}
              value={email}
              fullWidth
              type="text"
              sx={input}
              label="Work email"
            />
            <FormHelperText error={errorEmail !== null}>{errorEmail}</FormHelperText>
          </FormControl>
          {emailVerified &&
            <>
              <FormControl sx={{marginBottom: '15px'}} fullWidth variant="outlined">
                <InputLabel sx={inputLabel} htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  onChange={handlePassInputChange}
                  onKeyPress={handlePassEnterPress}
                  onFocus={handlePassFocus}
                  onBlur={handlePassBlur}
                  value={password}
                  sx={input}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onFocus={handleErrorFocus}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText error={errorPass !== null}>{errorPass}</FormHelperText>
              </FormControl>
              <Typography sx={{fontSize: '14px', lineHeight: '20px'}} textAlign="right" marginBottom="15px"><CustomLink
                path="/forgot"
                text="Forgot your password?"/></Typography>
            </>
          }
          <Button onClick={handleSubmitClick}
                  sx={{...submitNavigateBtn, backgroundColor: '#316FEA', marginBottom: '20px'}} fullWidth
                  variant="contained">Log in to Qencode</Button>
        </form>
      </Box>
      <Typography sx={{fontSize: '14px', lineHeight: '20px', marginBottom: '15px'}} textAlign="center">Is your company new to
        Qencode? <CustomLink path={'/'} text="Sign up"/></Typography>
      {responseDetail &&
        <Alert>{responseDetail}</Alert>
      }
    </>
  );
};

export default Login;
