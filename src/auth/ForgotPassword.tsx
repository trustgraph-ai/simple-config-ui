
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { resetPassword } from './auth';

interface ForgotPasswordProps {
    open: boolean;
    close: () => void;
}

export const ForgotPassword : ForgotPasswordProps = ({
    open, close
}) => {

    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [email, setEmail] = React.useState("");

    const reset = () => {
        resetPassword(email).then(
            () => {
                console.log("Password reset activated.");
                close();
            }
        );
    };

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
                        reset();
                    },
                    sx: { backgroundImage: 'none' },
                },
            }}
        >
            <DialogTitle>Reset password</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex', flexDirection: 'column', gap: 2,
                    width: '100%'
                }}
            >

                <DialogContentText>
                    Enter your account&apos;s email address, and we&apos;ll
                    send you a link to reset your password.
                </DialogContentText>

                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>

            </DialogContent>

            <DialogActions sx={{ pb: 3, px: 3 }}>

                <Button onClick={close}>Cancel</Button>

                <Button variant="contained" type="submit">
                    Continue
                </Button>

            </DialogActions>
        </Dialog>
    );

};

export default ForgotPassword;