import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container,
    Button,
    Paper,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    AppBar,
    Toolbar
} from '@mui/material';
import http from '../../../utlis/http';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';
import { TableSkeleton } from '../common/LoadingSkeleton';

const ViewInterviewSchedule = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        http.get('/interviews')
            .then(res => setInterviews(res.data || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 6 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#0f172a' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EventAvailableIcon sx={{ color: '#9333ea' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Candidate Interview Calendar
                        </Typography>
                    </Box>

                    <Button color="inherit" startIcon={<ArrowBackIcon />} onClick={() => navigate('/job_postings_view')} sx={{ textTransform: 'none' }}>
                        Back to Careers
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        Scheduled Interview Sessions
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', mt: 1 }}>
                        Check scheduled recruitment interview dates and session details.
                    </Typography>
                </Box>

                {loading ? (
                    <TableSkeleton rows={4} cols={4} />
                ) : interviews.length === 0 ? (
                    <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                        <Typography variant="h6" sx={{ color: '#64748b' }}>No interviews currently scheduled.</Typography>
                    </Paper>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Date & Time</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Lead Interviewer</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Meeting Mode</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Instructions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {interviews.map((iv) => (
                                    <TableRow key={iv._id} hover>
                                        <TableCell sx={{ fontWeight: 600 }}>{new Date(iv.interviewDate).toLocaleString()}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#9333ea' }}>{iv.interviewer}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={iv.mode || 'Online'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: iv.mode === 'In-Person' ? '#fef3c7' : '#faf5ff',
                                                    color: iv.mode === 'In-Person' ? '#b45309' : '#9333ea',
                                                    fontWeight: 700
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569' }}>{iv.notes || 'Technical Round'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </Box>
    );
};

export default ViewInterviewSchedule;
