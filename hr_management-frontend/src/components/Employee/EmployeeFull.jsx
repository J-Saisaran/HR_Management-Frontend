import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import http from '../../../utlis/http';
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    Button,
    Chip,
    Avatar,
    Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import { TableSkeleton } from '../common/LoadingSkeleton';

const EmployeeFull = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get(`/employees/${id}`)
            .then(res => setEmployee(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <TableSkeleton rows={4} cols={3} />
            </Container>
        );
    }

    if (!employee) {
        return (
            <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
                <Typography variant="h5">Employee profile not found.</Typography>
                <Button variant="contained" onClick={() => navigate('/employeelist')} sx={{ mt: 2 }}>
                    Return to Directory
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 5 }}>
            <Container maxWidth="lg">
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/employeelist')}
                    sx={{ mb: 3, textTransform: 'none', borderColor: '#cbd5e1', color: '#475569', borderRadius: 2 }}
                >
                    Back to Employee Directory
                </Button>

                {/* Profile Header Card */}
                <Paper sx={{ p: 4, borderRadius: 3.5, border: '1px solid #e2e8f0', mb: 3.5, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                            <Avatar sx={{ width: 72, height: 72, backgroundColor: '#0284c7', fontSize: '1.8rem', fontWeight: 700 }}>
                                {employee.firstName?.[0]}{employee.lastName?.[0]}
                            </Avatar>
                            <div>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                    {employee.firstName} {employee.lastName}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                                    <Typography variant="subtitle1" sx={{ color: '#0284c7', fontWeight: 600 }}>
                                        {employee.position}
                                    </Typography>
                                    <Chip label={employee.department} size="small" sx={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: 700 }} />
                                </Box>
                            </div>
                        </Box>

                        {/* Quick HR Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                startIcon={<CheckCircleOutlineIcon />}
                                onClick={() => navigate(`/employee_attendance/${id}`)}
                                sx={{ backgroundColor: '#0284c7', textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                            >
                                Attendance Log
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<EventBusyIcon />}
                                onClick={() => navigate(`/employee_leaverequest/${id}`)}
                                sx={{ color: '#d97706', borderColor: '#d97706', textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                            >
                                Leave Requests
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<StarRateIcon />}
                                onClick={() => navigate(`/employee_performance/${id}`)}
                                sx={{ color: '#7c3aed', borderColor: '#7c3aed', textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                            >
                                Performance
                            </Button>
                        </Box>
                    </Box>
                </Paper>

                {/* Profile Details Grid */}
                <Grid container spacing={3}>
                    {/* Contact & Personal Information */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3.5, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
                                Contact & Employment Info
                            </Typography>
                            <Divider sx={{ mb: 2.5 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <EmailIcon sx={{ color: '#0284c7' }} />
                                    <div>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>OFFICIAL EMAIL</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{employee.email}</Typography>
                                    </div>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <PhoneIcon sx={{ color: '#16a34a' }} />
                                    <div>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>PHONE NUMBER</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{employee.phone}</Typography>
                                    </div>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <LocationOnIcon sx={{ color: '#dc2626' }} />
                                    <div>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>RESIDENTIAL ADDRESS</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {employee.address?.street}, {employee.address?.city}, {employee.address?.state} - {employee.address?.postalCode}
                                        </Typography>
                                    </div>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                                    <div>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>START DATE</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {employee.startDate ? new Date(employee.startDate).toLocaleDateString() : 'N/A'}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>DATE OF BIRTH</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : 'N/A'}
                                        </Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Emergency Contact */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3.5, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
                                Emergency Contact Details
                            </Typography>
                            <Divider sx={{ mb: 2.5 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <ContactEmergencyIcon sx={{ color: '#d97706' }} />
                                    <div>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>CONTACT NAME</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {employee.emergencyContact?.name || 'N/A'}
                                        </Typography>
                                    </div>
                                </Box>

                                <div>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>RELATIONSHIP</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {employee.emergencyContact?.relationship || 'N/A'}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>EMERGENCY PHONE</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#dc2626' }}>
                                        {employee.emergencyContact?.phone || 'N/A'}
                                    </Typography>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default EmployeeFull;
