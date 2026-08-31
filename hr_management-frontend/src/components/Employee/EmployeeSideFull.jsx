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
    Divider,
    AppBar,
    Toolbar
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import { TableSkeleton } from '../common/LoadingSkeleton';

const EmployeeSideFull = () => {
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

    const handleLogout = () => {
        navigate('/employee_login');
    };

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
                <Button variant="contained" onClick={() => navigate('/employee_login')} sx={{ mt: 2 }}>
                    Return to Login
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 5 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#0f172a' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BadgeIcon sx={{ color: '#16a34a' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Employee Self-Service Workspace
                        </Typography>
                    </Box>

                    <Button color="error" variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ textTransform: 'none', borderColor: '#f87171' }}>
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {/* Employee Banner */}
                <Paper sx={{ p: 4, borderRadius: 3.5, border: '1px solid #e2e8f0', mb: 3.5, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                            <Avatar sx={{ width: 72, height: 72, backgroundColor: '#16a34a', fontSize: '1.8rem', fontWeight: 700 }}>
                                {employee.firstName?.[0]}{employee.lastName?.[0]}
                            </Avatar>
                            <div>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                    Welcome, {employee.firstName} {employee.lastName}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                                    <Typography variant="subtitle1" sx={{ color: '#16a34a', fontWeight: 600 }}>
                                        {employee.position}
                                    </Typography>
                                    <Chip label={employee.department} size="small" sx={{ backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700 }} />
                                </Box>
                            </div>
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<EventAvailableIcon />}
                            onClick={() => navigate(`/employee_leave_submit/${id}`)}
                            sx={{ backgroundColor: '#16a34a', textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 2.5, '&:hover': { backgroundColor: '#15803d' } }}
                        >
                            + Submit Leave Request
                        </Button>
                    </Box>
                </Paper>

                {/* Personal Profile Details */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3.5, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
                                Employment & Contact Info
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
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>PHONE</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{employee.phone}</Typography>
                                    </div>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <LocationOnIcon sx={{ color: '#dc2626' }} />
                                    <div>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>ADDRESS</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {employee.address?.street}, {employee.address?.city}, {employee.address?.state} - {employee.address?.postalCode}
                                        </Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3.5, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
                                Emergency Contact Information
                            </Typography>
                            <Divider sx={{ mb: 2.5 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <div>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>CONTACT PERSON</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{employee.emergencyContact?.name || 'N/A'}</Typography>
                                </div>
                                <div>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>RELATIONSHIP</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{employee.emergencyContact?.relationship || 'N/A'}</Typography>
                                </div>
                                <div>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>PHONE NUMBER</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#dc2626' }}>{employee.emergencyContact?.phone || 'N/A'}</Typography>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default EmployeeSideFull;
