
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

import { register as authRegister } from './auth';

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

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");

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

        if (password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage(
                'Password must be at least 6 characters long.'
            );
            isValid = false;
        } else if (password != password2) {
            setPasswordError(true);
            setPasswordErrorMessage('Passwords must match.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;

    };

    const register = () => {

        if (emailError || passwordError)
            return;

        authRegister(email, password, name).then(
            () => close()
        );

    }

    return (
        <Dialog
            open={open}
            onClose={close}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        event.stopPropagation();
                        register();
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
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
                <Button
                    variant="contained"
                    type="submit"
                    onClick={validateInputs}
                >
                    Register
                </Button>
            </DialogActions>

        </Dialog>
    );

};

export default Register;

