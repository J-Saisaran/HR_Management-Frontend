import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Typography, Container, AppBar, Paper, Box, Toolbar, CircularProgress, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import './Style.css';

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
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
            setError(null);
            try {
                await login(values.email, values.password);
                navigate('/dashboard');
            } catch (err) {
                setError(err.message || 'Login failed. Please check credentials.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('demo') === 'true') {
            formik.setValues({
                email: 'admin@hrmanagement.com',
                password: 'password123',
            });
        }
    }, [location.search]);

    const handleAutofillDemo = () => {
        formik.setValues({
            email: 'admin@hrmanagement.com',
            password: 'password123',
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 6, display: 'flex', alignItems: 'center' }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#0f172a' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AdminPanelSettingsIcon sx={{ color: '#38bdf8' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            HR Management Portal
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={{ textTransform: 'none' }}>
                            Home
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/register')} sx={{ textTransform: 'none', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 1.5 }}>
                            Register HR
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4.5, borderRadius: 3.5, border: '1px solid #e2e8f0' }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                            HR Admin Login
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Enter your administrative credentials to access the executive workspace.
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleAutofillDemo}
                        startIcon={<FlashOnIcon sx={{ color: '#eab308' }} />}
                        sx={{
                            mb: 3,
                            py: 1,
                            borderRadius: 2,
                            borderColor: '#eab308',
                            color: '#854d0e',
                            backgroundColor: '#fefce8',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#fef08a', borderColor: '#ca8a04' }
                        }}
                    >
                        ⚡ Autofill Recruiter Demo Credentials
                    </Button>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="HR Email Address"
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
                            fullWidth
                            disabled={formik.isSubmitting}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.3,
                                borderRadius: 2,
                                backgroundColor: '#0284c7',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': { backgroundColor: '#0369a1' }
                            }}
                        >
                            {formik.isSubmitting ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CircularProgress size={20} color="inherit" />
                                    <span>Verifying Credentials...</span>
                                </Box>
                            ) : (
                                'Sign In to HR Dashboard'
                            )}
                        </Button>
                    </form>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Need an HR account? <Link to="/register" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>Register here</Link>
                        </Typography>
                        <Link to="/employee_login" style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>
                            Employee Login →
                        </Link>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default Login;
