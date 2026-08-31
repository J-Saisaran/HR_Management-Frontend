import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container,
    Button,
    Paper,
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Chip
} from '@mui/material';
import http from '../../../utlis/http';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TableSkeleton } from '../common/LoadingSkeleton';
import ToastAlert from '../common/ToastAlert';

const InterviewScheduling = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const fetchInterviews = async () => {
        setLoading(true);
        try {
            const res = await http.get('/interviews');
            setInterviews(res.data || []);
        } catch (err) {
            console.error(err);
            setToast({ open: true, message: 'Failed to load interviews.', severity: 'warning' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, []);

    const formik = useFormik({
        initialValues: {
            interviewDate: '',
            interviewer: '',
            mode: 'Online',
            notes: '',
        },
        validationSchema: Yup.object({
            interviewDate: Yup.date().required('Interview Date & Time is required'),
            interviewer: Yup.string().required('Interviewer Name is required'),
            mode: Yup.string().required('Mode is required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const res = await http.post('/interviews', values);
                setInterviews(prev => [res.data, ...prev]);
                setToast({ open: true, message: 'Interview scheduled successfully!', severity: 'success' });
                resetForm();
                setOpen(false);
            } catch (err) {
                console.error(err);
                setToast({ open: true, message: 'Failed to schedule interview', severity: 'error' });
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
                                Interview Scheduling Center
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                Assign interviewers, define meeting modes, and track upcoming technical rounds.
                            </Typography>
                        </div>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<EventAvailableIcon />}
                        onClick={() => setOpen(true)}
                        sx={{ backgroundColor: '#0284c7', textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
                    >
                        + Schedule New Interview
                    </Button>
                </Box>

                {loading ? (
                    <TableSkeleton rows={4} cols={4} />
                ) : interviews.length === 0 ? (
                    <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                        <Typography variant="h6" sx={{ color: '#64748b', mb: 2 }}>No interviews scheduled currently.</Typography>
                        <Button variant="contained" onClick={() => setOpen(true)} sx={{ textTransform: 'none', backgroundColor: '#0284c7' }}>
                            Schedule First Interview
                        </Button>
                    </Paper>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Interview Date & Time</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Assigned Interviewer</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Format / Mode</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Agenda & Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {interviews.map((iv) => (
                                    <TableRow key={iv._id} hover>
                                        <TableCell sx={{ fontWeight: 600 }}>{new Date(iv.interviewDate).toLocaleString()}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#0284c7' }}>{iv.interviewer}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={iv.mode || 'Online'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: iv.mode === 'In-Person' ? '#fef3c7' : '#e0f2fe',
                                                    color: iv.mode === 'In-Person' ? '#b45309' : '#0369a1',
                                                    fontWeight: 700
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569' }}>{iv.notes || 'Technical Evaluation'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Schedule Interview Dialog */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ fontWeight: 700, backgroundColor: '#0f172a', color: '#ffffff' }}>
                        Schedule Candidate Interview
                    </DialogTitle>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent dividers sx={{ p: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="datetime-local"
                                        label="Interview Date & Time *"
                                        name="interviewDate"
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.interviewDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.interviewDate && Boolean(formik.errors.interviewDate)}
                                        helperText={formik.touched.interviewDate && formik.errors.interviewDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Interviewer Name *"
                                        name="interviewer"
                                        value={formik.values.interviewer}
                                        onChange={formik.handleChange}
                                        error={formik.touched.interviewer && Boolean(formik.errors.interviewer)}
                                        helperText={formik.touched.interviewer && formik.errors.interviewer}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        label="Mode *"
                                        name="mode"
                                        value={formik.values.mode}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="Online">Online (Google Meet / Zoom)</MenuItem>
                                        <MenuItem value="In-Person">In-Person (Office)</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Interview Instructions & Meeting Link"
                                        name="notes"
                                        value={formik.values.notes}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                            <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#0284c7', textTransform: 'none', fontWeight: 600 }}>
                                Schedule Interview
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Container>
        </Box>
    );
};

export default InterviewScheduling;
