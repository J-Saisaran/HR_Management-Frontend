import React, { useState, useEffect } from 'react';
import { Typography, Container, Button, Modal, TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import http from '../../../utlis/http'; // Axios instance
import Dashboard from '../dashboard/Dashboard';
import { Navigate, useNavigate } from 'react-router-dom';


const JobPostings = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch job postings
        http.get('/jobpostings')
            .then(res => setJobPostings(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleJobClick = (job) => {
        setSelectedJob(job);
    };
    const handleApplication = (id) =>{
        navigate(`/candidate_applications/${id}`);
    };

    return (
        <Container>
            <Dashboard />
            <Typography variant="h4" component="h1" gutterBottom>
                Job Postings
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create New Job Posting
            </Button>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Location</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Salary</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Closing Date</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Actions</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Applications</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobPostings.map(posting => (
                            <TableRow key={posting._id}>
                                <TableCell>{posting.title}</TableCell>
                                <TableCell>{posting.description}</TableCell>
                                <TableCell>{posting.location}</TableCell>
                                <TableCell>${posting.salary}</TableCell>
                                <TableCell>{new Date(posting.closingDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleJobClick(posting)}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleApplication(posting._id)}
                                    >
                                       Application
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal 
                open={open} 
                onClose={handleClose}
                aria-labelledby="create-job-posting-title"
                aria-describedby="create-job-posting-description"
            >
                <Container 
                    style={{ 
                        padding: '20px', 
                        maxWidth: '600px', 
                        maxHeight: '80vh', 
                        backgroundColor: 'white', 
                        margin: 'auto', 
                        borderRadius: '8px', 
                        overflowY: 'auto',
                        position: 'relative',
                        top: '10%',
                    }}
                >
                    <Typography 
                        id="create-job-posting-title" 
                        variant="h6" 
                        component="h2"
                        gutterBottom
                    >
                        Create Job Posting
                    </Typography>
                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            requirements: '',
                            location: '',
                            salary: '',
                            closingDate: ''
                        }}
                        onSubmit={async (values, { resetForm }) => {
                            try {
                                await http.post('/jobpostings', {
                                    ...values,
                                    requirements: values.requirements.split(',')
                                });
                                resetForm();
                                handleClose();
                                // Refetch job postings
                                http.get('//jobpostings')
                                    .then(res => setJobPostings(res.data))
                                    .catch(err => console.error(err));
                                 
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                    >
                        {({ values, handleChange, handleBlur }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    label="Title"
                                    name="title"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                                <Field
                                    as={TextField}
                                    label="Description"
                                    name="description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <Field
                                    as={TextField}
                                    label="Requirements (comma-separated)"
                                    name="requirements"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.requirements}
                                />
                                <Field
                                    as={TextField}
                                    label="Location"
                                    name="location"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.location}
                                />
                                <Field
                                    as={TextField}
                                    label="Salary"
                                    name="salary"
                                    type="number"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.salary}
                                />
                                <Field
                                    as={TextField}
                                    label="Closing Date"
                                    name="closingDate"
                                    type="date"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.closingDate}
                                />
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    style={{ marginTop: '20px' }}
                                >
                                    Create
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Modal>

            {selectedJob && (
                <Container style={{ marginTop: '20px' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Job Posting Details
                    </Typography>
                    <Typography variant="h5">{selectedJob.title}</Typography>
                    <Typography variant="body1">{selectedJob.description}</Typography>
                    <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Requirements:</span> {selectedJob.requirements.join(', ')}</Typography>
                    <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Location:</span>{selectedJob.location}</Typography>
                    <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Salary:</span> ${selectedJob.salary}</Typography>
                    <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Posted Date:</span> {new Date(selectedJob.postedDate).toLocaleDateString()}</Typography>
                    <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Closing Date:</span> {new Date(selectedJob.closingDate).toLocaleDateString()}</Typography>
                </Container>
            )}
        </Container>
    );
};

export default JobPostings;
