import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Tooltip,
    Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import http from '../../../utlis/http';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import { TableSkeleton } from '../common/LoadingSkeleton';
import ToastAlert from '../common/ToastAlert';

const JobPostings = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await http.get('/jobpostings');
            setJobPostings(res.data || []);
        } catch (err) {
            console.error('Error fetching job postings:', err);
            setToast({ open: true, message: 'Failed to fetch job postings.', severity: 'warning' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete the job posting for "${title}"?`)) {
            try {
                await http.delete(`/jobpostings/${id}`);
                setJobPostings(prev => prev.filter(j => j._id !== id));
                setToast({ open: true, message: 'Job posting deleted successfully', severity: 'success' });
            } catch (err) {
                console.error(err);
                setToast({ open: true, message: 'Failed to delete job posting', severity: 'error' });
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            requirements: '',
            location: '',
            salary: '',
            closingDate: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Job Title is required'),
            description: Yup.string().required('Description is required'),
            location: Yup.string().required('Location is required'),
            salary: Yup.number().positive('Salary must be positive').required('Salary is required'),
            closingDate: Yup.date().required('Closing Date is required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const payload = {
                    ...values,
                    requirements: values.requirements.split(',').map(r => r.trim()).filter(Boolean)
                };
                const res = await http.post('/jobpostings', payload);
                setJobPostings(prev => [res.data, ...prev]);
                setToast({ open: true, message: 'Job posting published successfully!', severity: 'success' });
                resetForm();
                setOpen(false);
            } catch (err) {
                console.error('Error creating job:', err);
                setToast({ open: true, message: 'Error creating job posting', severity: 'error' });
            } finally {
                setSubmitting(false);
            }
        }
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
                                Job Postings Management
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                Publish open job vacancies, review applicants, and coordinate hiring.
                            </Typography>
                        </div>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddBusinessIcon />}
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
                        Create New Job Vacancy
                    </Button>
                </Box>

                {loading ? (
                    <TableSkeleton rows={4} cols={6} />
                ) : jobPostings.length === 0 ? (
                    <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                        <Typography variant="h6" sx={{ color: '#64748b', mb: 2 }}>No active job postings published yet.</Typography>
                        <Button variant="contained" onClick={() => setOpen(true)} sx={{ textTransform: 'none', backgroundColor: '#0284c7' }}>
                            Post Your First Job Vacancy
                        </Button>
                    </Paper>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Job Title</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Location</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Annual Compensation</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Closing Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569', textAlign: 'center' }}>Applications</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569', textAlign: 'center' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jobPostings.map((job) => (
                                    <TableRow key={job._id} hover>
                                        <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>{job.title}</TableCell>
                                        <TableCell>
                                            <Chip label={job.location || 'Remote'} size="small" sx={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: 600 }} />
                                        </TableCell>
                                        <TableCell sx={{ color: '#16a34a', fontWeight: 700 }}>
                                            ₹{Number(job.salary).toLocaleString()}
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569' }}>
                                            {job.closingDate ? new Date(job.closingDate).toLocaleDateString() : 'Open'}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={<PeopleAltIcon />}
                                                onClick={() => navigate(`/candidate_applications/${job._id}`, { state: { jobTitle: job.title } })}
                                                sx={{ backgroundColor: '#0284c7', textTransform: 'none', fontWeight: 600, borderRadius: 1.5 }}
                                            >
                                                View Candidates
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Tooltip title="Delete Job Posting">
                                                <IconButton color="error" size="small" onClick={() => handleDelete(job._id, job.title)}>
                                                    <DeleteOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Create Job Dialog */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ fontWeight: 700, backgroundColor: '#0f172a', color: '#ffffff' }}>
                        Publish New Job Vacancy
                    </DialogTitle>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent dividers sx={{ p: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Job Title *"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Location * (e.g. Chennai / Remote)"
                                        name="location"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        error={formik.touched.location && Boolean(formik.errors.location)}
                                        helperText={formik.touched.location && formik.errors.location}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="number"
                                        label="Annual Salary (INR) *"
                                        name="salary"
                                        value={formik.values.salary}
                                        onChange={formik.handleChange}
                                        error={formik.touched.salary && Boolean(formik.errors.salary)}
                                        helperText={formik.touched.salary && formik.errors.salary}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        label="Application Closing Date *"
                                        name="closingDate"
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.closingDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.closingDate && Boolean(formik.errors.closingDate)}
                                        helperText={formik.touched.closingDate && formik.errors.closingDate}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Required Skills (Comma-separated, e.g. React, Node.js, MongoDB)"
                                        name="requirements"
                                        value={formik.values.requirements}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        size="small"
                                        label="Role Description & Responsibilities *"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
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
                                Publish Job Opening
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Container>
        </Box>
    );
};

export default JobPostings;
