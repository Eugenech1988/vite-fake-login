import React, { FocusEvent, ChangeEvent, KeyboardEvent, useState } from 'react';
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

interface ResponseDetail {
  email: string | null;
  pass: string | null;
  detail?: string;
}

const Login: React.FC = () => {
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPass, setErrorPass] = useState<string | null>(null);
  const [responseDetail, setResponseDetail] = useState<ResponseDetail | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePassInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handlePassEnterPress = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      if (target.value.length <= 8) {
        setErrorPass('Password must be more than 8 characters');
      }
      e.currentTarget.blur();
    }
  };

  const handlePassFocus = () => {
    setErrorPass(null);
  };

  const handlePassBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= 8) {
      setErrorPass('Password must be more than 8 characters');
    }
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
      } else {
        setErrorEmail('Email is invalid');
      }
      target.blur();
    }
  };

  const handleEmailBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(e.target.value)) {
      setEmailVerified(true);
      setErrorEmail(null);
    } else {
      setErrorEmail('Email is invalid');
    }
  };

  const handleErrorFocus = () => {
    setErrorPass(null);
  };

  const handleSubmitClick = async (e: any) => {
    e.preventDefault();
    if (!email && !password) {
      return;
    }
    if (!errorPass && !errorEmail) {
      const {data, error} = await apiRequest(
        '/v1/auth/login',
        'post',
        {
          email,
          password
        }
      );
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Response:', data);
        const dataTyped = data as Record<string, any>;
        if (typeof data === 'string') {
          //@ts-ignore
          setResponseDetail(data);
        } else if (Array.isArray(dataTyped.detail)) {
          const dataEmail = dataTyped.detail.find((detail: {field_name: string}) => detail.field_name === 'email');
          const dataPass = dataTyped.detail.find((detail: {field_name: string}) => detail.field_name === 'password');
          setResponseDetail({email: (dataEmail ? dataEmail : null), pass: (dataPass ? dataPass : null)})
        }
      }
    }
  };
  return (
    <>
      <LogoBox/>
      <HeadingNotify text="Log in to your account"/>
      <Box display="flex" justifyContent="space-between" marginBottom="30px">
        <Button
          sx={{...socialBtn, marginRight: '16px'}}
          variant="outlined" startIcon={<img src={googleIcon} alt={'google'}/>}>Google</Button>
        <Button
          sx={socialBtn}
          variant="outlined" startIcon={<img src={githubIcon} alt={'github'}/>}>GitHub</Button>
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
              <FormControl error={errorPass !== null} sx={{marginBottom: '15px'}} fullWidth variant="outlined">
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
      <Typography sx={{fontSize: '14px', lineHeight: '20px', marginBottom: '15px'}} textAlign="center">Is your company
        new to
        Qencode? <CustomLink path={'/'} text="Sign up"/></Typography>
      {responseDetail && (typeof responseDetail.detail === 'string') &&
        <Alert sx={{marginBottom: '15px'}}>{responseDetail.detail}</Alert>
      }
      {responseDetail && (typeof responseDetail === 'object') && (responseDetail.email !== null) &&
        <Alert sx={{marginBottom: '15px'}} severity='error'>{'Wrong email'}</Alert>
      }
      {responseDetail && (typeof responseDetail === 'object') && (responseDetail.pass !== null) &&
        <Alert sx={{marginBottom: '15px'}} severity='error'>{'Wrong password'}</Alert>
      }
    </>
  );
};

export default Login;
