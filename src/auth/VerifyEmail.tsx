
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import ForgotPassword from './ForgotPassword';
import Register from './Register';

import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';

import { logout as authLogout, resendVerification } from './auth';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 56%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const VerifyEmail = (props: { disableCustomTheme?: boolean }) => {

    const logout = () => {
        authLogout().then(
            () => console.log("Logout worked")
        );
    }

    const verify = () => {
        resendVerification().then(
            () => console.log("Resend verification worked")
        );
    }

    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);
    const [registerOpen, setRegisterOpen] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const openForgotPassword = () => {
      setForgotPasswordOpen(true);
    };

    const closeForgotPassword = () => {
        setForgotPasswordOpen(false);
    };

    const openRegister = () => {
      setRegisterOpen(true);
    };

    const closeRegister = () => {
        setRegisterOpen(false);
    };

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (emailError || passwordError) {
          event.preventDefault();
          return;
      }
      const data = new FormData(event.currentTarget);
      signin(email, password).then(
          () => console.log("Signin succesful")
      );
    };

  const validateInputs = () => {

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
      <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">

          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Verify email
          </Typography>

          <Typography
            variant="body2"
            sx={{ width: '100%'}}
          >
              Responsd to the last email verification, or click
              VERIFY EMAIL to send a new verification email.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={verify}
            >
              Verify Email
            </Button>
            <Button
              variant="contained"
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        </Card>
      </SignInContainer>
      </>
  );
}


export default VerifyEmail;

