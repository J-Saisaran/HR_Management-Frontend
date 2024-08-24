import React, { useState, useEffect } from 'react';
import { Typography, Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import http from '../../../utlis/http'; // Correct path to Axios instance
import Dashboard_2 from '../dashboard/Dashboard_2';
import { Navigate, useNavigate } from 'react-router-dom';

const JobPostingsView = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };


    useEffect(() => {
        // Fetch job postings
        http.get('/jobpostings')
            .then(res => setJobs(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container>
           <Dashboard_2/> <br /><br /><br />
            <Typography variant="h4" component="h1" gutterBottom>
                Available Job Postings
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Job Title</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Location</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Salary</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Apply</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Schedule</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.map(job => (
                            <TableRow key={job._id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.description}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.salary}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={`/apply/${job._id}`}
                                    >
                                        Apply Now
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleNavigate('/interview_schedule')}
                                    >
                                       View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default JobPostingsView;
