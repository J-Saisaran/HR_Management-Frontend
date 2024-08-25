import React, { useState, useEffect } from 'react';
import { Typography, Container, Button, Modal, TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import http from '../../../utlis/http'; 
import Dashboard from '../dashboard/Dashboard';
import Footer from '../footer/Footer'; 
import MenuItem from '@mui/material/MenuItem';

const InterviewScheduling = () => {
    const [interviews, setInterviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);

    useEffect(() => {
        // Fetch interviews
        http.get('/interviews')
            .then(res => setInterviews(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInterviewClick = (interview) => {
        setSelectedInterview(interview);
    };

    return (
        <Container>
            <Dashboard />
            <Typography variant="h4" component="h1" gutterBottom>
                Interview Scheduling
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Schedule New Interview
            </Button>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Interview Date</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Interviewer</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Mode</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Notes</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {interviews.map(interview => (
                            <TableRow key={interview._id}>
                                <TableCell>{new Date(interview.interviewDate).toLocaleDateString()}</TableCell>
                                <TableCell>{interview.interviewer}</TableCell>
                                <TableCell>{interview.mode}</TableCell>
                                <TableCell>{interview.notes}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleInterviewClick(interview)}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <Container style={{
                    padding: '20px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    marginTop: '50px', // Keeps modal centered
                    marginBottom: '50px', // Keeps modal centered
                }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Schedule Interview
                    </Typography>
                    <Formik
                        initialValues={{
                            interviewDate: '',
                            interviewer: '',
                            mode: 'In-Person',
                            notes: ''
                        }}
                        onSubmit={async (values, { resetForm }) => {
                            try {
                                await http.post('/interviews/schedule', values);
                                resetForm();
                                handleClose();
                                // Refetch interviews
                                http.get('/interviews')
                                    .then(res => setInterviews(res.data))
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
                                    label="Interview Date"
                                    name="interviewDate"
                                    type="date"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.interviewDate}
                                />
                                <Field
                                    as={TextField}
                                    label="Interviewer"
                                    name="interviewer"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.interviewer}
                                />
                                <Field
                                    as={TextField}
                                    label="Mode"
                                    name="mode"
                                    select
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.mode}
                                >
                                    <MenuItem value="In-Person">In-Person</MenuItem>
                                    <MenuItem value="Online">Online</MenuItem>
                                </Field>
                                <Field
                                    as={TextField}
                                    label="Notes"
                                    name="notes"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.notes}
                                />
                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                    Schedule
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Modal>

            {selectedInterview && (
                <Container style={{ marginTop: '20px' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Interview Details
                    </Typography>

                    <Typography variant="body1"><span style={{fontWeight: 'bold' }}>Interview Date:</span> {new Date(selectedInterview.interviewDate).toLocaleDateString()}</Typography>
                    <Typography variant="body1"><span style={{fontWeight: 'bold' }}>Interviewer: </span>{selectedInterview.interviewer}</Typography>
                    <Typography variant="body1"><span style={{fontWeight: 'bold' }}>Mode:</span> {selectedInterview.mode}</Typography>
                    <Typography variant="body1"><span style={{fontWeight: 'bold' }}>Notes: </span>{selectedInterview.notes}</Typography>
                </Container>
            )}


        </Container>
    );
};

export default InterviewScheduling;
