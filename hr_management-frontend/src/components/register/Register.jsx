import React, { useState, useContext } from 'react';
import {
    Button,
    TextField,
    Typography,
    Container,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Paper,
    Box,
    AppBar,
    Toolbar,
    Alert,
    CircularProgress,
    Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';

function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'admin',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, 'Name must be at least 2 characters').required('Full Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            role: Yup.string().required('Role is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setErrorMessage('');
            setSuccessMessage('');
            try {
                await register(values.name, values.email, values.password, values.role);
                setSuccessMessage('Registration successful! Redirecting to dashboard...');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } catch (err) {
                setErrorMessage(err.message || 'Registration failed. Please try again.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 6, display: 'flex', alignItems: 'center' }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#0f172a' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HowToRegIcon sx={{ color: '#38bdf8' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            HR Portal Registration
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={{ textTransform: 'none' }}>
                            Portal Home
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/hr_login')} sx={{ textTransform: 'none', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 1.5 }}>
                            Sign In
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4.5, borderRadius: 3.5, border: '1px solid #e2e8f0' }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                            Create HR Account
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Register as an administrator to manage workforce operations.
                        </Typography>
                    </Box>

                    {errorMessage && (
                        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
                            {successMessage}
                        </Alert>
                    )}

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                        <TextField
                            label="Official Email Address"
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
                            label="Password (min 6 characters)"
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

                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="role-label">Administrative Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.role && Boolean(formik.errors.role)}
                                label="Administrative Role"
                            >
                                <MenuItem value="admin">HR Administrator</MenuItem>
                                <MenuItem value="manager">Operations Manager</MenuItem>
                            </Select>
                        </FormControl>

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
                                    <span>Creating Account...</span>
                                </Box>
                            ) : (
                                'Complete Registration'
                            )}
                        </Button>
                    </form>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Already have an HR account? <Link to="/hr_login" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>Sign In here</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default Register;
