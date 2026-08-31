import React, { useState } from 'react';
import {
    Typography,
    Container,
    Button,
    TextField,
    Box,
    Paper,
    Grid,
    AppBar,
    Toolbar,
    Alert,
    CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import http from '../../../utlis/http';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkIcon from '@mui/icons-material/Work';

const ApplyJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            candidateName: '',
            candidateEmail: '',
            phoneNumber: '',
            resume: '',
            coverLetter: '',
        },
        validationSchema: Yup.object({
            candidateName: Yup.string().required('Full name is required'),
            candidateEmail: Yup.string().email('Invalid email address').required('Email is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            resume: Yup.string().url('Must be a valid URL link (e.g. Google Drive, LinkedIn, GitHub)').required('Resume link is required'),
            coverLetter: Yup.string().required('Cover letter or introduction is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setError(null);
            try {
                await http.post('/candidates', {
                    ...values,
                    jobPosting: jobId,
                });
                setSubmitted(true);
            } catch (err) {
                console.error('Error submitting application:', err);
                setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
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
                        <WorkIcon sx={{ color: '#9333ea' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Job Application Submission
                        </Typography>
                    </Box>

                    <Button color="inherit" startIcon={<ArrowBackIcon />} onClick={() => navigate('/job_postings_view')} sx={{ textTransform: 'none' }}>
                        Back to Openings
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4.5, borderRadius: 3.5, border: '1px solid #e2e8f0' }}>
                    {submitted ? (
                        <Box sx={{ textAlign: 'center', py: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#16a34a', mb: 2 }}>
                                Application Submitted!
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#475569', mb: 3 }}>
                                Thank you for applying. Our HR recruitment team will review your resume and contact you regarding interview scheduling.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/job_postings_view')}
                                sx={{ backgroundColor: '#9333ea', textTransform: 'none', fontWeight: 700 }}
                            >
                                Browse Other Positions
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                                    Submit Application
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    Provide your details and link your resume to be considered for this opening.
                                </Typography>
                            </Box>

                            {error && (
                                <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    label="Full Name *"
                                    name="candidateName"
                                    value={formik.values.candidateName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.candidateName && Boolean(formik.errors.candidateName)}
                                    helperText={formik.touched.candidateName && formik.errors.candidateName}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    label="Email Address *"
                                    name="candidateEmail"
                                    value={formik.values.candidateEmail}
                                    onChange={formik.handleChange}
                                    error={formik.touched.candidateEmail && Boolean(formik.errors.candidateEmail)}
                                    helperText={formik.touched.candidateEmail && formik.errors.candidateEmail}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    label="Phone Number *"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    label="Resume Link (Google Drive / Dropbox / GitHub) *"
                                    name="resume"
                                    placeholder="https://drive.google.com/..."
                                    value={formik.values.resume}
                                    onChange={formik.handleChange}
                                    error={formik.touched.resume && Boolean(formik.errors.resume)}
                                    helperText={formik.touched.resume && formik.errors.resume}
                                />

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    margin="normal"
                                    size="small"
                                    label="Cover Letter / Introduction *"
                                    name="coverLetter"
                                    value={formik.values.coverLetter}
                                    onChange={formik.handleChange}
                                    error={formik.touched.coverLetter && Boolean(formik.errors.coverLetter)}
                                    helperText={formik.touched.coverLetter && formik.errors.coverLetter}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={formik.isSubmitting}
                                    sx={{
                                        mt: 3,
                                        py: 1.3,
                                        borderRadius: 2,
                                        backgroundColor: '#9333ea',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        '&:hover': { backgroundColor: '#7e22ce' }
                                    }}
                                >
                                    {formik.isSubmitting ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CircularProgress size={20} color="inherit" />
                                            <span>Submitting Application...</span>
                                        </Box>
                                    ) : (
                                        'Submit Application Now'
                                    )}
                                </Button>
                            </form>
                        </>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default ApplyJob;
