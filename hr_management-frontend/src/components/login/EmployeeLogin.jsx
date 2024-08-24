import React, { useState } from 'react';
import { Button, TextField, Typography, Container, AppBar, Box, Toolbar, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../../../utlis/http';
import IconButton from '@mui/material/IconButton';

function EmployeeLogin() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                // Send login request
                const res = await http.post('/employees/login', { email: values.email, password: values.password });

                if (res.status === 200) {
                    const id = res.data.id;
                    navigate(`/employee_side_full/${id}`);
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('Invalid credentials. Please try again.');
                } else {
                    setError('Login failed. Please try again later.');
                }
            }
            setSubmitting(false);
        },
    });

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            <IconButton color="inherit" onClick={() => navigate('/')}>
                                HR Management
                            </IconButton>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <br />
            <br />
            <br />
            <div>
                <Typography variant="h3" component="h1" gutterBottom>
                    Employee Login
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
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
            </div>
        </Container>
    );
}

export default EmployeeLogin;
