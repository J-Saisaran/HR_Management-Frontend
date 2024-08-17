import React, { useState, useEffect } from 'react';
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import http from '../../../utlis/http'; // Ensure the correct path to the Axios instance
import Dashboard_2 from '../dashboard/Dashboard_2';
import { useParams } from 'react-router-dom';

const ApplicationStatus = () => {
    const [applications, setApplications] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Fetch candidate's applications
        const fetchApplications = async () => {
            try {
                const response = await http.get(`/candidates/${id}`);
                setApplications(response.data);
            } catch (err) {
                console.error('Failed to fetch applications:', err);
            }
        };

        fetchApplications();
    }, [id]); // Include `id` as a dependency

    return (
        <Container>
            <Dashboard_2 />
            <br /><br /><br />
            <Typography variant="h4" component="h1" gutterBottom>
                My Application Status
            </Typography>

            {applications.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Application Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map(app => (
                                <TableRow key={app._id}>
                                    <TableCell>{app.jobTitle}</TableCell>
                                    <TableCell>{new Date(app.applicationDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{app.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    No applications found.
                </Typography>
            )}
        </Container>
    );
};

export default ApplicationStatus;
