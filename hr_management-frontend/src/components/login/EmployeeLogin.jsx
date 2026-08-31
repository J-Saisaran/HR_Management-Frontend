import React, { useState } from 'react';
import { Button, TextField, Typography, Container, AppBar, Paper, Box, Toolbar, CircularProgress, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../../../utlis/http';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import './Style.css';

function EmployeeLogin() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setServerError(null);
            try {
                const res = await http.post('/employees/login', values);

                if (res.data && res.data.id) {
                    const id = res.data.id;
                    navigate(`/employee_side_full/${id}`);
                } else {
                    setServerError('Invalid employee credentials');
                }
            } catch (err) {
                console.error(err);
                setServerError(err.response?.data?.message || 'Login failed. Please verify email and password.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleAutofillDemo = () => {
        formik.setValues({
            email: 'john.doe@company.com',
            password: 'password123',
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 6, display: 'flex', alignItems: 'center' }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#0f172a' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BadgeIcon sx={{ color: '#16a34a' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Employee Self-Service Portal
                        </Typography>
                    </Box>

                    <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={{ textTransform: 'none' }}>
                        Portal Home
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4.5, borderRadius: 3.5, border: '1px solid #e2e8f0' }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                            Employee Sign In
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Access your personal attendance, leave tracker, and performance reviews.
                        </Typography>
                    </Box>

                    {serverError && (
                        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                            {serverError}
                        </Alert>
                    )}

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleAutofillDemo}
                        startIcon={<FlashOnIcon sx={{ color: '#16a34a' }} />}
                        sx={{
                            mb: 3,
                            py: 1,
                            borderRadius: 2,
                            borderColor: '#16a34a',
                            color: '#15803d',
                            backgroundColor: '#f0fdf4',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#dcfce7', borderColor: '#16a34a' }
                        }}
                    >
                        ⚡ Autofill Demo Employee Credentials
                    </Button>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Employee Email Address"
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
                            fullWidth
                            disabled={formik.isSubmitting}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.3,
                                borderRadius: 2,
                                backgroundColor: '#16a34a',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': { backgroundColor: '#15803d' }
                            }}
                        >
                            {formik.isSubmitting ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CircularProgress size={20} color="inherit" />
                                    <span>Authenticating Employee...</span>
                                </Box>
                            ) : (
                                'Sign In to Employee Portal'
                            )}
                        </Button>
                    </form>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                        <Link to="/hr_login" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>
                            ← Switch to HR Admin Login
                        </Link>
                        <Link to="/job_postings_view" style={{ color: '#9333ea', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>
                            Careers Portal →
                        </Link>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default EmployeeLogin;
