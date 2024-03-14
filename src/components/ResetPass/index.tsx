import React, { useState } from 'react';
import LogoBox from '../LogoBox';
import HeadingNotify from '../HeadingNotify';
import Button from '@mui/material/Button';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import { input, inputLabel, submitNavigateBtn } from '../styleConstants';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
// import apiRequest from '../../api';

const ResetPass: React.FC = () => {
  const [errorPass, setErrorPass] = useState<string | null>(null);
  const [errorPassConfirm, setErrorPassConfirm] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [password_confirm, setPasswordConfirm] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [resetPassSuccess, setResetPassSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePassChange = (e:any) => {
    setPassword(e.target.value);
  }

  const handleConfirmChange = (e:any) => {
    setPasswordConfirm(e.target.value)
  }

  const handlePassConfirmBlur = (e:any) => {
    if (e.target.value.length <= 8) {
      setErrorPassConfirm('Password must be more than 8 characters');
    }
  }

  const handlePassConfirmEnterPress = (e:any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value.length <= 8) {
        setErrorPass('Password must be more then 8 characters')
      }
      e.target.blur();
    }
  }

  const handlePassBlur = (e:any) => {
    if (e.target.value.length <= 8) {
      setErrorPass('Password must be more than 8 characters');
    }
  }

  const handlePassEnterPress = (e:any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value.length <= 8) {
        setErrorPassConfirm('Password must be more then 8 characters')
      }
      e.target.blur();
    }
  }

  const handlePassFocus = () => {
    setErrorPass(null);
  }
  const handlePassConfirmFocus = () => {
    setErrorPassConfirm(null);
  }

  const handleResetClick = (e:any) => {
    e.preventDefault();
    if ((+password.length > 8) && (+password_confirm > 8) && (password === password_confirm)) {
      setResetPassSuccess('Password saved successfully');
      setTimeout(() => {
        navigate('/');
      }, 1000)
    } else if (password !== password_confirm) {
      setErrorPass('Passwords are not equal');
      setErrorPassConfirm('Passwords are not equal');
    }
    // apiRequest(
    //   '/v1/auth/password-set',
    //   'post',
    //   {
    //     token: "string",
    //     secret: 'string',
    //     password,
    //     password_confirm
    //   }
    // )
  }
  return (
    <>
      <LogoBox/>
      <HeadingNotify text="Create new Password?"/>
      <form>
        <Typography sx={{fontSize: '15px', lineHeight: '21px', marginBottom: '8px'}}>Password</Typography>
        <FormControl sx={{marginBottom: '25px'}} fullWidth variant="outlined">
          <InputLabel error={errorPass !== null} sx={inputLabel} htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            sx={input}
            value={password}
            onChange={handlePassChange}
            onFocus={handlePassFocus}
            onKeyPress={handlePassEnterPress}
            onBlur={handlePassBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
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
        <Typography sx={{fontSize: '15px', lineHeight: '21px', marginBottom: '8px'}}>Confirm Password</Typography>
        <FormControl sx={{marginBottom: '30px'}} fullWidth variant="outlined">
          <InputLabel error={errorPassConfirm !== null} sx={inputLabel} htmlFor="outlined-adornment-confirm">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            sx={input}
            onChange={handleConfirmChange}
            onFocus={handlePassConfirmFocus}
            onBlur={handlePassConfirmBlur}
            onKeyPress={handlePassConfirmEnterPress}
            value={password_confirm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText error={errorPassConfirm !== null}>{errorPassConfirm}</FormHelperText>
        </FormControl>
        <Button sx={{...submitNavigateBtn, background: '#316FEA', marginBottom: '30px'}} fullWidth
                onClick={handleResetClick} variant="contained">Reset Password</Button>
      </form>
      {resetPassSuccess &&
        <Alert>{resetPassSuccess}</Alert>
      }
    </>
  );
};

export default ResetPass;
