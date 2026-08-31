import React, { useContext } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Chip, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import AuthContext from '../../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();

    const handleDemoHRLogin = () => {
        navigate('/hr_login?demo=true');
    };

    return (
        <Box sx={{ py: 6, minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Container maxWidth="lg">
                {/* Hero Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Chip
                        label="MERN STACK ENTERPRISE APPLICATION"
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 700, letterSpacing: '1px', mb: 2, backgroundColor: '#0284c7' }}
                    />
                    <Typography variant="h2" component="h1" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-1px', mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
                        HR Management <span style={{ color: '#0284c7' }}>Dashboard</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#64748b', maxWidth: 750, mx: 'auto', fontWeight: 400, lineHeight: 1.6, fontSize: { xs: '1rem', md: '1.15rem' } }}>
                        A comprehensive, full-stack human resource operations suite designed to streamline employee data, attendance compliance, leave workflows, performance metrics, and recruitment pipelines.
                    </Typography>
                </Box>

                {/* 3 Portal Cards */}
                <Grid container spacing={3.5} sx={{ mb: 7 }}>
                    {/* HR Portal Card */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderRadius: 4,
                            border: '2px solid #e0f2fe',
                            boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 30px -10px rgba(2, 132, 199, 0.2)' }
                        }}>
                            <CardContent sx={{ p: 3.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                    <Box sx={{ p: 1.5, borderRadius: 3, backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                                        <AdminPanelSettingsIcon fontSize="medium" />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                        HR Portal
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#64748b', mb: 3, lineHeight: 1.6 }}>
                                    Full administrative control over employees, leave approvals, attendance records, performance evaluations, and job postings.
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => navigate('/hr_login')}
                                        sx={{ py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none', backgroundColor: '#0284c7' }}
                                    >
                                        HR Admin Login
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={handleDemoHRLogin}
                                        startIcon={<FlashOnIcon sx={{ color: '#eab308' }} />}
                                        sx={{ py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none', borderColor: '#eab308', color: '#854d0e', backgroundColor: '#fefce8' }}
                                    >
                                        1-Click Recruiter Demo
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Employee Portal Card */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderRadius: 4,
                            border: '2px solid #f1f5f9',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 30px -10px rgba(0,0,0,0.1)' }
                        }}>
                            <CardContent sx={{ p: 3.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                    <Box sx={{ p: 1.5, borderRadius: 3, backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                                        <BadgeIcon fontSize="medium" />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                        Employee Portal
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#64748b', mb: 3, lineHeight: 1.6 }}>
                                    Dedicated self-service workspace for employees to check attendance logs, submit leave requests, view manager reviews, and update profiles.
                                </Typography>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate('/employee_login')}
                                    sx={{ py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none', backgroundColor: '#16a34a', '&:hover': { backgroundColor: '#15803d' } }}
                                >
                                    Employee Login
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Candidate / Careers Portal Card */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderRadius: 4,
                            border: '2px solid #f1f5f9',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 30px -10px rgba(0,0,0,0.1)' }
                        }}>
                            <CardContent sx={{ p: 3.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                    <Box sx={{ p: 1.5, borderRadius: 3, backgroundColor: '#faf5ff', color: '#9333ea' }}>
                                        <WorkIcon fontSize="medium" />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                        Careers Portal
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#64748b', mb: 3, lineHeight: 1.6 }}>
                                    Public portal for candidates to browse published job openings, submit applications with resume details, and view scheduled interview slots.
                                </Typography>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate('/job_postings_view')}
                                    sx={{ py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: 'none', backgroundColor: '#9333ea', '&:hover': { backgroundColor: '#7e22ce' } }}
                                >
                                    Explore Job Openings
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Architecture & Feature Highlights */}
                <Paper sx={{ p: 4, borderRadius: 4, backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', mb: 3, textAlign: 'center' }}>
                        Core Platform Capabilities & Technical Architecture
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                <SecurityIcon sx={{ color: '#0284c7' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                    JWT & Bcrypt Security
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                Role-based access control, hashed credentials, and authenticated request middleware.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                <StorageIcon sx={{ color: '#16a34a' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                    MongoDB Cloud DB
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                Schema-driven models for employees, leaves, attendance, jobs, and applications.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                <SpeedIcon sx={{ color: '#eab308' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                    Fast UI & Feedback
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                Formik validations, skeleton loaders, and responsive Material-UI layout system.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                <CheckCircleIcon sx={{ color: '#9333ea' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                    End-to-End Workflows
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                Leave approval pipelines, candidate hiring stages, and attendance audits.
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default Home;
