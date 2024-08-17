import React from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Dashboard_1 from '../dashboard/Dashboard_1';

function Register() {
    const { adminregister } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            role: Yup.string()
                .required('Role is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await adminregister(values.name, values.email, values.password, values.role);
                navigate('/hr_login');  // Ensure this path is correct
            } catch (err) {
                console.log('Registration error:', err);
            }
            setSubmitting(false);
        },
    });

    const handleLoginButton = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Dashboard_1/>
            <br />
            <br />
            <br />
            <Typography variant="h3" component="h1" gutterBottom>
                Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Name"
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
                <TextField
                    label="Role"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={formik.isSubmitting}
                >
                    Register
                </Button>
            </form>
        </Container>
    );
}

export default Register;

