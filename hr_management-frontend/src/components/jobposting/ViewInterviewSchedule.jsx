import React, { useState, useEffect } from 'react';
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import http from '../../../utlis/http'; // Correct path to Axios instance
import Dashboard_2 from '../dashboard/Dashboard_2';

const ViewInterviewSchedule = () => {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        // Fetch interviews for the candidate
        http.get('/interviews')
            .then(res => setInterviews(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container>
            <Dashboard_2/> <br /><br /><br />
            <Typography variant="h4" component="h1" gutterBottom>
                My Interview Schedule
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Interview Date</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Interviewer</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Mode</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Notes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {interviews.map(interview => (
                            <TableRow key={interview._id}>
                                <TableCell>{new Date(interview.interviewDate).toLocaleDateString()}</TableCell>
                                <TableCell>{interview.interviewer}</TableCell>
                                <TableCell>{interview.mode}</TableCell>
                                <TableCell>{interview.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ViewInterviewSchedule;
