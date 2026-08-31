import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container,
    Button,
    Card,
    CardContent,
    Grid,
    Box,
    Chip,
    Paper,
    TextField,
    InputAdornment,
    AppBar,
    Toolbar
} from '@mui/material';
import http from '../../../utlis/http';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import { CardSkeleton } from '../common/LoadingSkeleton';

const JobPostingsView = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        http.get('/jobpostings')
            .then(res => setJobs(res.data || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const filteredJobs = jobs.filter(j =>
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (j.location && j.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 6 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#0f172a' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WorkIcon sx={{ color: '#9333ea' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Company Careers Portal
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={{ textTransform: 'none' }}>
                            Home
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => navigate('/interview_schedule')}
                            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', textTransform: 'none' }}
                        >
                            Check Interview Schedule
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Chip label="OPEN OPPORTUNITIES" color="secondary" size="small" sx={{ fontWeight: 700, mb: 1.5, backgroundColor: '#9333ea' }} />
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-1px' }}>
                        Explore Open Positions
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 600, mx: 'auto', mt: 1 }}>
                        Join our fast-growing engineering and operations team. Find the perfect role matching your skills.
                    </Typography>

                    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 3 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search by job title or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#94a3b8' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>

                {loading ? (
                    <CardSkeleton count={4} />
                ) : filteredJobs.length === 0 ? (
                    <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                        <Typography variant="h6" sx={{ color: '#64748b' }}>No job vacancies match your search.</Typography>
                    </Paper>
                ) : (
                    <Grid container spacing={3}>
                        {filteredJobs.map((job) => (
                            <Grid item xs={12} md={6} key={job._id}>
                                <Card sx={{
                                    height: '100%',
                                    borderRadius: 3.5,
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    p: 3,
                                    transition: 'all 0.2s ease',
                                    '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 24px rgba(0,0,0,0.08)' }
                                }}>
                                    <CardContent sx={{ p: 0 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                                {job.title}
                                            </Typography>
                                            <Chip label={job.location || 'Remote'} size="small" sx={{ backgroundColor: '#faf5ff', color: '#9333ea', fontWeight: 700 }} />
                                        </Box>

                                        <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                                            {job.description}
                                        </Typography>

                                        {job.requirements && job.requirements.length > 0 && (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2.5 }}>
                                                {job.requirements.map((req, idx) => (
                                                    <Chip key={idx} label={req} size="small" variant="outlined" sx={{ borderColor: '#cbd5e1', color: '#334155' }} />
                                                ))}
                                            </Box>
                                        )}

                                        <Box sx={{ display: 'flex', gap: 3, color: '#64748b', fontSize: '0.875rem' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#16a34a', fontWeight: 700 }}>
                                                <CurrencyRupeeIcon fontSize="small" /> ₹{Number(job.salary).toLocaleString()} / yr
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <EventIcon fontSize="small" /> Closes: {job.closingDate ? new Date(job.closingDate).toLocaleDateString() : 'Open'}
                                            </Box>
                                        </Box>
                                    </CardContent>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => navigate(`/apply/${job._id}`)}
                                        sx={{
                                            mt: 3,
                                            py: 1.2,
                                            borderRadius: 2,
                                            backgroundColor: '#9333ea',
                                            fontWeight: 700,
                                            textTransform: 'none',
                                            '&:hover': { backgroundColor: '#7e22ce' }
                                        }}
                                    >
                                        Apply for this Position →
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default JobPostingsView;
