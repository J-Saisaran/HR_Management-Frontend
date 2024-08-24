import React, { useState } from 'react';
import { Button, TextField, Typography, Container, AppBar } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import './Style.css';
import { Link } from 'react-router-dom';

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await login(values.email, values.password);
                navigate('/employeelist');
            } catch (err) {
                setError(err.message);
            }
            setSubmitting(false);
        },
    });

    const handleRegisterButton = () => {
        navigate('/register');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            <IconButton color="inherit" onClick={() => navigate('/')}>
                                HR Management
                            </IconButton>
                        </Typography>
                        <div edge="end">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleRegisterButton}
                                edge="end"
                            > 
                                Register
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <br />
            <br />
            <br />
            <div>
                <Typography variant="h3" component="h1" gutterBottom>
                    HR Login
                </Typography>
                {error && (
                    <Typography color="error" variant="body1">
                        {error}
                    </Typography>
                )}
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={formik.isSubmitting}
                    >
                        Login
                    </Button>
                </form>
                <Link to="/register" style={{alignContent:"center", textAlign:"center"}}>Register</Link>
            </div>
        </Container>
    );
}

export default Login;
