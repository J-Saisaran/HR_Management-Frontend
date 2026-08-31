import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
    Grid,
    CircularProgress
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import http from '../../../utlis/http';
import EmployeeTable from './EmployeeTable';
import { useNavigate } from 'react-router-dom';
import ToastAlert from '../common/ToastAlert';
import './Style.css';

const EmployeeManagement = () => {
    const [open, setOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            position: '',
            department: '',
            startDate: '',
            dateOfBirth: '',
            emergencyContactName: '',
            emergencyContactRelationship: '',
            emergencyContactPhone: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            phone: Yup.string().required('Phone is required'),
            position: Yup.string().required('Position is required'),
            department: Yup.string().required('Department is required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const newEmployee = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    address: {
                        street: values.street || 'N/A',
                        city: values.city || 'N/A',
                        state: values.state || 'N/A',
                        postalCode: values.postalCode || 'N/A',
                        country: values.country || 'N/A',
                    },
                    position: values.position,
                    department: values.department,
                    startDate: values.startDate || new Date().toISOString(),
                    dateOfBirth: values.dateOfBirth || new Date().toISOString(),
                    emergencyContact: {
                        name: values.emergencyContactName || 'N/A',
                        relationship: values.emergencyContactRelationship || 'N/A',
                        phone: values.emergencyContactPhone || 'N/A',
                    },
                    password: values.password,
                };

                await http.post('/employees', newEmployee);
                setToast({ open: true, message: 'Employee added successfully!', severity: 'success' });
                resetForm();
                setOpen(false);
                setRefreshTrigger(prev => prev + 1);
            } catch (error) {
                console.error('Error adding employee:', error);
                const errMsg = error.response?.data?.message || 'Failed to add employee. Please check inputs.';
                setToast({ open: true, message: errMsg, severity: 'error' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 4 }}>
            <ToastAlert
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={() => setToast(prev => ({ ...prev, open: false }))}
            />

            <Container maxWidth="xl">
                {/* Header Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/dashboard')}
                            sx={{ textTransform: 'none', borderColor: '#cbd5e1', color: '#475569', borderRadius: 2 }}
                        >
                            Back to Dashboard
                        </Button>
                        <div>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                Employee Directory
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                Manage personnel records, roles, profiles, and attendance compliance.
                            </Typography>
                        </div>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<PersonAddIcon />}
                        onClick={() => setOpen(true)}
                        sx={{
                            backgroundColor: '#0284c7',
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: 2,
                            px: 2.5,
                            py: 1,
                            boxShadow: '0 4px 12px rgba(2,132,199,0.25)',
                            '&:hover': { backgroundColor: '#0369a1' }
                        }}
                    >
                        Add New Employee
                    </Button>
                </Box>

                {/* Employee Table */}
                <EmployeeTable refreshTrigger={refreshTrigger} />

                {/* Add Employee Dialog Form */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ fontWeight: 700, backgroundColor: '#0f172a', color: '#ffffff' }}>
                        Register New Employee
                    </DialogTitle>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent dividers sx={{ p: 3 }}>
                            <Typography variant="subtitle2" sx={{ color: '#0284c7', fontWeight: 700, mb: 1.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Personal & Contact Details
                            </Typography>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="First Name *"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Last Name *"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Official Email *"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Phone Number *"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="subtitle2" sx={{ color: '#0284c7', fontWeight: 700, mb: 1.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Role & Organization
                            </Typography>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Job Title / Position *"
                                        name="position"
                                        value={formik.values.position}
                                        onChange={formik.handleChange}
                                        error={formik.touched.position && Boolean(formik.errors.position)}
                                        helperText={formik.touched.position && formik.errors.position}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Department *"
                                        name="department"
                                        value={formik.values.department}
                                        onChange={formik.handleChange}
                                        error={formik.touched.department && Boolean(formik.errors.department)}
                                        helperText={formik.touched.department && formik.errors.department}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="password"
                                        label="Initial Portal Password *"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        label="Start Date"
                                        name="startDate"
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2.5, backgroundColor: '#f8fafc' }}>
                            <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none', color: '#64748b' }}>Cancel</Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                                sx={{ textTransform: 'none', backgroundColor: '#0284c7', fontWeight: 700 }}
                            >
                                {formik.isSubmitting ? <CircularProgress size={22} color="inherit" /> : 'Register Employee'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Container>
        </Box>
    );
};

export default EmployeeManagement;
