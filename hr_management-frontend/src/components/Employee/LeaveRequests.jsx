import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../utlis/http';
import {
    Card,
    CardContent,
    Typography,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import Dashboard from '../dashboard/Dashboard';

const LeaveRequests = () => {
    const { id } = useParams(); // Get employee ID from URL params
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        // Fetch leave requests from the server
        http.get(`/leaves/${id}/`)
            .then((res) => {
                setLeaveRequests(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const handleApproval = (requestId, status) => {
        // Update the leave request status
        http.put(`/leaves/${requestId}`, { status })
            .then((res) => {
                // Update the leaveRequests state with the new status
                setLeaveRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request._id === requestId ? { ...request, status: res.data.status } : request
                    )
                );
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Container maxWidth="md">
            <Dashboard />
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Leave Requests
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Start Date</TableCell>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>End Date</TableCell>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Type</TableCell>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaveRequests.map((request) => (
                                    <TableRow key={request._id}>
                                        <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{request.status}</TableCell>
                                        <TableCell>{request.type}</TableCell>
                                        <TableCell>
                                            {request.status === 'Pending' ? (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleApproval(request._id, 'Approved')}
                                                        style={{ marginRight: '8px' }}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => handleApproval(request._id, 'Rejected')}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            ) : (
                                                <Typography>{request.status}</Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Container>
    );
};

export default LeaveRequests;