import { Alert, Box, Button, Snackbar, Stack, TextField } from '@mui/material';
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation() as any;
    const auth = useAuth();
    const [open, setOpen] = useState(auth.isError);

    const from = location.state?.from?.pathname || "/";

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        auth.signin(username, password, () => {
            navigate(from, { replace: true });
        });
        
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    }

    return (
        <div>
            <Box sx={{ width: 300, mx: "auto" }}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            required
                            id="username"
                            label="Username"
                            name='username'
                        />
                        <TextField
                            required
                            id="password"
                            label="Password"
                            type='password'
                            name='password'
                        />
                        <Button variant="contained" type="submit">Login</Button>
                    </Stack>
                </form>
            </Box>
            <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {auth.error?.data}
                </Alert>
            </Snackbar>
        </div>
    );
}
