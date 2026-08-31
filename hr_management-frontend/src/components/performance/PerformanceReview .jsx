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
    Rating,
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
    IconButton,
    Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarRateIcon from '@mui/icons-material/StarRate';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TableSkeleton } from '../common/LoadingSkeleton';
import ToastAlert from '../common/ToastAlert';

const PerformanceReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [performances, setPerformances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await http.get(`/performances/${id}`);
            setPerformances(res.data || []);
        } catch (err) {
            console.error(err);
            setToast({ open: true, message: 'Failed to load performance evaluations.', severity: 'warning' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [id]);

    const handleDelete = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this performance review?')) {
            try {
                await http.delete(`/performances/${reviewId}/`);
                setPerformances(prev => prev.filter(r => r._id !== reviewId));
                setToast({ open: true, message: 'Performance evaluation deleted', severity: 'success' });
            } catch (err) {
                console.error(err);
                setToast({ open: true, message: 'Failed to delete review', severity: 'error' });
            }
        }
    };

    const handleEdit = (review) => {
        setEditingReview(review);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            reviewDate: new Date().toISOString().slice(0, 10),
            projectName: '',
            rating: 4,
            comments: '',
        },
        validationSchema: Yup.object({
            reviewDate: Yup.date().required('Review date is required'),
            projectName: Yup.string().required('Project / Milestone name is required'),
            rating: Yup.number().min(1).max(5).required('Rating is required'),
            comments: Yup.string().min(5, 'Please provide feedback comments').required('Comments are required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                if (editingReview) {
                    const res = await http.put(`/performances/${editingReview._id}/`, values);
                    setPerformances(prev => prev.map(r => (r._id === editingReview._id ? res.data : r)));
                    setToast({ open: true, message: 'Review updated successfully!', severity: 'success' });
                } else {
                    const res = await http.post('/performances', {
                        ...values,
                        employee: id,
                    });
                    setPerformances(prev => [res.data, ...prev]);
                    setToast({ open: true, message: 'Performance review added successfully!', severity: 'success' });
                }
                resetForm();
                setEditingReview(null);
                setOpen(false);
            } catch (err) {
                console.error(err);
                setToast({ open: true, message: 'Error saving performance review', severity: 'error' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (editingReview) {
            formik.setValues({
                reviewDate: editingReview.reviewDate ? editingReview.reviewDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
                projectName: editingReview.projectName || '',
                rating: editingReview.rating || 4,
                comments: editingReview.comments || '',
            });
        }
    }, [editingReview]);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 4 }}>
            <ToastAlert
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={() => setToast(prev => ({ ...prev, open: false }))}
            />

            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/employeelist')}
                            sx={{ textTransform: 'none', borderColor: '#cbd5e1', color: '#475569', borderRadius: 2 }}
                        >
                            Back to Employees
                        </Button>
                        <div>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                Employee Performance Evaluation
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                Log quarterly reviews, milestone feedback, and performance ratings.
                            </Typography>
                        </div>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<StarRateIcon />}
                        onClick={() => { setEditingReview(null); formik.resetForm(); setOpen(true); }}
                        sx={{ backgroundColor: '#7c3aed', textTransform: 'none', fontWeight: 700, borderRadius: 2, '&:hover': { backgroundColor: '#6d28d9' } }}
                    >
                        + Add Performance Evaluation
                    </Button>
                </Box>

                {loading ? (
                    <TableSkeleton rows={4} cols={5} />
                ) : performances.length === 0 ? (
                    <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                        <Typography variant="h6" sx={{ color: '#64748b', mb: 2 }}>No performance evaluations recorded yet.</Typography>
                        <Button
                            variant="contained"
                            onClick={() => { setEditingReview(null); formik.resetForm(); setOpen(true); }}
                            sx={{ textTransform: 'none', backgroundColor: '#7c3aed' }}
                        >
                            Record First Evaluation
                        </Button>
                    </Paper>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Review Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Project / Area</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Rating</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Manager Evaluation Comments</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569', textAlign: 'center' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {performances.map((perf) => (
                                    <TableRow key={perf._id} hover>
                                        <TableCell sx={{ fontWeight: 600 }}>{new Date(perf.reviewDate).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>{perf.projectName}</TableCell>
                                        <TableCell>
                                            <Rating value={Number(perf.rating)} readOnly size="small" />
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', maxWidth: 350 }}>{perf.comments}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Tooltip title="Edit Review">
                                                <IconButton color="primary" size="small" onClick={() => handleEdit(perf)}>
                                                    <EditNoteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Review">
                                                <IconButton color="error" size="small" onClick={() => handleDelete(perf._id)}>
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

                {/* Review Dialog */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ fontWeight: 700, backgroundColor: '#0f172a', color: '#ffffff' }}>
                        {editingReview ? 'Edit Performance Evaluation' : 'New Performance Evaluation'}
                    </DialogTitle>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent dividers sx={{ p: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        label="Review Date *"
                                        name="reviewDate"
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.reviewDate}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Project / Milestone Name *"
                                        name="projectName"
                                        value={formik.values.projectName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.projectName && Boolean(formik.errors.projectName)}
                                        helperText={formik.touched.projectName && formik.errors.projectName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                        OVERALL RATING (1 to 5 Stars) *
                                    </Typography>
                                    <Rating
                                        name="rating"
                                        value={Number(formik.values.rating)}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('rating', newValue);
                                        }}
                                        size="large"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        size="small"
                                        label="Evaluation Feedback & Comments *"
                                        name="comments"
                                        value={formik.values.comments}
                                        onChange={formik.handleChange}
                                        error={formik.touched.comments && Boolean(formik.errors.comments)}
                                        helperText={formik.touched.comments && formik.errors.comments}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                            <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#7c3aed', textTransform: 'none', fontWeight: 600 }}>
                                {editingReview ? 'Update Evaluation' : 'Save Evaluation'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Container>
        </Box>
    );
};

export default PerformanceReview;
