import React, { useState, useEffect } from 'react';
import { Typography, Container, Button, Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem } from '@mui/material';
import http from '../../../utlis/http'; // Axios instance
import Dashboard from '../dashboard/Dashboard';
import { useLocation, useParams } from 'react-router-dom';

const CandidateApplications = () => {
    const location = useLocation();
    const jobTitle = location.state?.jobTitle;
    const [applications, setApplications] = useState([]);
    const [open, setOpen] = useState(false);
    const [interviewOpen, setInterviewOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [status, setStatus] = useState('');
    const [interviewDetails, setInterviewDetails] = useState({ date: '', time: '', location: '' });
    const { id } = useParams();

    useEffect(() => {
        http.get(`/candidates/${id}`)
            .then(res => setApplications(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInterviewOpen = () => setInterviewOpen(true);
    const handleInterviewClose = () => setInterviewOpen(false);

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
        setOpen(true);
    };

    const handleStatusChange = (newStatus) => {
        if (selectedApplication) {
            http.put(`/candidates/${selectedApplication._id}/status`, { status: newStatus })
                .then(res => {
                    setApplications(applications.map(app => app._id === selectedApplication._id ? { ...app, status: newStatus } : app));
                    setSelectedApplication(null);
                    handleClose();
                })
                .catch(err => console.error(err));
        }
    };

    const handleInterviewSubmit = () => {
        if (selectedApplication) {
            http.put(`/candidates/${selectedApplication._id}/schedule-interview`, interviewDetails)
                .then(res => {
                    setSelectedApplication(null);
                    setInterviewDetails({ date: '', time: '', location: '' });
                    handleInterviewClose();
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <Container>
            <Dashboard />
            <Typography variant="h4" component="h1" gutterBottom>
                Candidate Applications
            </Typography>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Posting</TableCell>
                            <TableCell>Candidate Name</TableCell>
                            <TableCell>Candidate Email</TableCell>
                            <TableCell>Resume</TableCell>
                            <TableCell>Application Date</TableCell>

                            <TableCell>Details</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map(application => (
                            <TableRow key={application._id}>
                                <TableCell>{application.jobPosting?.title || 'Job Title Not Available'}</TableCell>
                                <TableCell>{application.candidateName}</TableCell>
                                <TableCell>{application.candidateEmail}</TableCell>
                                <TableCell><a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a></TableCell>
                                <TableCell>{new Date(application.applicationDate).toLocaleDateString()}</TableCell>

                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleApplicationClick(application)}
                                    >
                                        View Details
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
                aria-labelledby="application-details-title"
                aria-describedby="application-details-description"
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
                        id="application-details-title"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >
                        Application Details
                    </Typography>
                    {selectedApplication && (
                        <Box>
                            <Typography variant="h6">Job Posting: {selectedApplication.jobPosting?.title || 'Not Available'}</Typography>
                            <Typography variant="h6">Candidate Name: {selectedApplication.candidateName}</Typography>
                            <Typography variant="h6">Candidate Email: {selectedApplication.candidateEmail}</Typography>
                            <Typography variant="h6">Resume: <a href={selectedApplication.resume} target="_blank" rel="noopener noreferrer">View Resume</a></Typography>
                            <Typography variant="h6">Cover Letter: {selectedApplication.coverLetter}</Typography>
                            <Typography variant="h6">Application Date: {new Date(selectedApplication.applicationDate).toLocaleDateString()}</Typography>
                        </Box>
                    )}
                </Container>
            </Modal>

            <Modal
                open={interviewOpen}
                onClose={handleInterviewClose}
                aria-labelledby="interview-schedule-title"
                aria-describedby="interview-schedule-description"
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
                        id="interview-schedule-title"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >
                        Schedule Interview
                    </Typography>
                    <Box>
                        <TextField
                            label="Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            value={interviewDetails.date}
                            onChange={(e) => setInterviewDetails({ ...interviewDetails, date: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Time"
                            type="time"
                            fullWidth
                            margin="normal"
                            value={interviewDetails.time}
                            onChange={(e) => setInterviewDetails({ ...interviewDetails, time: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Location"
                            fullWidth
                            margin="normal"
                            value={interviewDetails.location}
                            onChange={(e) => setInterviewDetails({ ...interviewDetails, location: e.target.value })}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '20px' }}
                            onClick={handleInterviewSubmit}
                        >
                            Schedule Interview
                        </Button>
                    </Box>
                </Container>
            </Modal>
        </Container>
    );
};

export default CandidateApplications;
