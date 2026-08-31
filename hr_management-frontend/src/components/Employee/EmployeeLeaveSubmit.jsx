import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import http from '../../../utlis/http';
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    TextField,
    Button,
    MenuItem,
    AppBar,
    Toolbar,
    Alert,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EmployeeLeaveSubmit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: '',
            type: 'Casual Leave',
            reason: '',
        },
        validationSchema: Yup.object({
            startDate: Yup.date().required('Start date is required'),
            endDate: Yup.date().required('End date is required'),
            type: Yup.string().required('Leave type is required'),
            reason: Yup.string().min(5, 'Please provide a clear reason').required('Reason is required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            setErrorMessage('');
            setSuccessMessage('');
            try {
                await http.post('/leaves', {
                    employee: id,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    type: values.type,
                    reason: values.reason,
                    status: 'Pending',
                });
                setSuccessMessage('Leave request submitted successfully to HR for approval!');
                resetForm();
                setTimeout(() => {
                    navigate(`/employee_side_full/${id}`);
                }, 1500);
            } catch (err) {
                console.error(err);
                setErrorMessage(err.response?.data?.message || 'Failed to submit leave request.');
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
                        <EventBusyIcon sx={{ color: '#d97706' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Leave Request Portal
                        </Typography>
                    </Box>

                    <Button color="inherit" startIcon={<ArrowBackIcon />} onClick={() => navigate(`/employee_side_full/${id}`)} sx={{ textTransform: 'none' }}>
                        Back to Profile
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4.5, borderRadius: 3.5, border: '1px solid #e2e8f0' }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                            Submit Leave Application
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Your application will be routed to HR administration for review and approval.
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="date"
                                    label="Start Date *"
                                    name="startDate"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.startDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                    helperText={formik.touched.startDate && formik.errors.startDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="date"
                                    label="End Date *"
                                    name="endDate"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.endDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                    helperText={formik.touched.endDate && formik.errors.endDate}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Leave Category *"
                                    name="type"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                                    <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                                    <MenuItem value="Earned Leave">Earned Leave</MenuItem>
                                    <MenuItem value="Other">Other Emergency Leave</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    size="small"
                                    label="Reason for Leave *"
                                    name="reason"
                                    value={formik.values.reason}
                                    onChange={formik.handleChange}
                                    error={formik.touched.reason && Boolean(formik.errors.reason)}
                                    helperText={formik.touched.reason && formik.errors.reason}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={formik.isSubmitting}
                            sx={{
                                mt: 3,
                                py: 1.3,
                                borderRadius: 2,
                                backgroundColor: '#16a34a',
                                fontWeight: 700,
                                textTransform: 'none',
                                '&:hover': { backgroundColor: '#15803d' }
                            }}
                        >
                            {formik.isSubmitting ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CircularProgress size={20} color="inherit" />
                                    <span>Submitting Application...</span>
                                </Box>
                            ) : (
                                'Submit Leave Request'
                            )}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default EmployeeLeaveSubmit;
