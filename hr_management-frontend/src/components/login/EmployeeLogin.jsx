import React from 'react';
import { Button, TextField, Typography, Container, AppBar, Box, Toolbar, CssBaseline, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../../../utlis/http';
import './Style.css';

function EmployeeLogin() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const res = await http.post('/employees/login', values);

                if (res.status === 200) {
                    const id = res.data.id;
                    console.log(id);
                    navigate(`/employee_side_full/${id}`);
                } else {
                    setErrors({ general: 'Invalid credentials' });
                }
            } catch (err) {
                console.error(err);
                setErrors({ general: 'Login failed. Please try again.' });
            } finally {
                setSubmitting(false);
            }
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
                {formik.errors.general && (
                    <Typography color="error">{formik.errors.general}</Typography>
                )}
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        id="email"
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
                        id="password"
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
