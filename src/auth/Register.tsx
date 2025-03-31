
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

interface RegisterProps {
    open: boolean;
    close: () => void;
}

export const Register : RegisterProps = ({
    open, close
}) => {

    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');


    return (
        <Dialog
            open={open}
            onClose={close}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    console.log(event);
                        event.preventDefault();
                        event.stopPropagation();
                        close();
                    },
                    sx: { backgroundImage: 'none' },
                },
            }}
        >
          <DialogTitle>Register new account</DialogTitle>
          <DialogContent
              sx={{
                  display: 'flex', flexDirection: 'column', gap: 2,
                  width: '100%'
              }}
          >
              <DialogContentText>
                  Enter your email address, and create a password to get
                  started.
              </DialogContentText>

            <FormControl>
              <FormLabel htmlFor="email">Name</FormLabel>
              <TextField
                helperText="Enter your name (optional)"
                id="name"
                name="name"
                placeholder="Fred Bloggs"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password2">Re-enter password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password2"
                placeholder="••••••"
                type="password"
                id="password2"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>

          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
              <Button onClick={close}>Cancel</Button>
              <Button variant="contained" type="submit">
                  Register
              </Button>
            </DialogActions>
        </Dialog>
    );

};

export default Register;

