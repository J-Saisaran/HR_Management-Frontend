import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container,
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import http from '../../../utlis/http';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { TableSkeleton } from '../common/LoadingSkeleton';
import ToastAlert from '../common/ToastAlert';

const CandidateApplications = () => {
    const location = useLocation();
    const jobTitle = location.state?.jobTitle;
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchApplications();
    }, [id]);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await http.get(`/candidates/${id}`);
            setApplications(res.data || []);
        } catch (err) {
            console.error('Error fetching applications:', err);
            setToast({ open: true, message: 'Failed to load candidate applications.', severity: 'warning' });
        } finally {
            setLoading(false);
        }
    };

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
        setOpen(true);
    };

    const handleInterviewNavigate = () => {
        navigate('/interview_scheduling');
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 4 }}>
            <ToastAlert
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={() => setToast(prev => ({ ...prev, open: false }))}
            />

            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/job_postings')}
                            sx={{ textTransform: 'none', borderColor: '#cbd5e1', color: '#475569', borderRadius: 2 }}
                        >
                            Back to Job Postings
                        </Button>
                        <div>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                Candidate Applications
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                {jobTitle ? `Showing applicants for: ${jobTitle}` : 'Review resume submissions and manage hiring pipeline.'}
                            </Typography>
                        </div>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<EventAvailableIcon />}
                        onClick={handleInterviewNavigate}
                        sx={{ backgroundColor: '#0284c7', textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                    >
                        Schedule Interview
                    </Button>
                </Box>

                {loading ? (
                    <TableSkeleton rows={4} cols={6} />
                ) : applications.length === 0 ? (
                    <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                        <Typography variant="h6" sx={{ color: '#64748b' }}>
                            No candidate applications received for this job posting yet.
                        </Typography>
                    </Paper>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Candidate Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Resume Link</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Applied Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569', textAlign: 'center' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {applications.map(app => (
                                    <TableRow key={app._id} hover>
                                        <TableCell sx={{ fontWeight: 600, color: '#0f172a' }}>{app.candidateName}</TableCell>
                                        <TableCell sx={{ color: '#475569' }}>{app.candidateEmail}</TableCell>
                                        <TableCell>
                                            {app.resume ? (
                                                <a href={app.resume} target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>
                                                    View Resume ↗
                                                </a>
                                            ) : (
                                                <span style={{ color: '#94a3b8' }}>Not Provided</span>
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569' }}>
                                            {new Date(app.applicationDate || Date.now()).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={app.status || 'Applied'}
                                                size="small"
                                                sx={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: 600 }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<VisibilityIcon />}
                                                onClick={() => handleApplicationClick(app)}
                                                sx={{ textTransform: 'none', borderRadius: 1.5, borderColor: '#cbd5e1' }}
                                            >
                                                Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Candidate Details Dialog */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ fontWeight: 700, backgroundColor: '#0f172a', color: '#ffffff' }}>
                        Candidate Application Profile
                    </DialogTitle>
                    {selectedApplication && (
                        <DialogContent dividers sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <div>
                                    <Typography variant="caption" sx={{ color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                                        Candidate Name
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                        {selectedApplication.candidateName}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="caption" sx={{ color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                                        Contact Email
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#0f172a' }}>
                                        {selectedApplication.candidateEmail}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="caption" sx={{ color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                                        Cover Letter / Notes
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#334155', backgroundColor: '#f1f5f9', p: 2, borderRadius: 2, mt: 0.5 }}>
                                        {selectedApplication.coverLetter || 'No cover letter provided with application.'}
                                    </Typography>
                                </div>
                            </Box>
                        </DialogContent>
                    )}
                    <DialogActions sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                        <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
                        <Button
                            variant="contained"
                            onClick={() => { setOpen(false); navigate('/interview_scheduling'); }}
                            sx={{ backgroundColor: '#0284c7', textTransform: 'none', fontWeight: 600 }}
                        >
                            Schedule Interview
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default CandidateApplications;
