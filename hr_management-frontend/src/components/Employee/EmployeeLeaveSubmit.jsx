// src/components/employee/CombinedLeaveComponent.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import http from '../../../utlis/http';
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
} from '@mui/material';
import Dashboard_Employee from '../dashboard/Dashboard_Employee';

const EmployeeLeaveSubmit = () => {
    const { id } = useParams(); // Get employee ID from URL params
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('');
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(true); // Toggle between form and status
    const navigate = useNavigate();

    useEffect(() => {
        if (!isSubmitting) {
            // Fetch leave requests from the server when not submitting
            http.get(`leaves/${id}`)
                .then((res) => {
                    setLeaveRequests(res.data);
                })
                .catch((err) => {
                    console.error('Error fetching leave requests:', err);
                });
        }
    }, [id, isSubmitting]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const leaveRequest = {
            startDate,
            endDate,
            type,
            reason,
        };

        http.post(`/leaves/${id}/`, leaveRequest)
            .then(() => {
                alert('Leave request submitted successfully!');
                setIsSubmitting(false); // Switch to status view
            })
            .catch((err) => {
                console.error('Error submitting leave request:', err);
            });
    };

    return (
        <Container maxWidth="md">
            <Dashboard_Employee/>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {isSubmitting ? 'Submit Leave Request' : 'Leave Request Status'}
                    </Typography>
                    {isSubmitting ? (
                        <form onSubmit={handleSubmit}>
                            <Box mb={2}>
                                <TextField
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{ shrink: true }}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    margin='normal'
                                    InputLabelProps={{ shrink: true }}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    label="Leave Type"
                                    select
                                    margin='normal'
                                    fullWidth
                                    SelectProps={{ native: true }}
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Earned Leave">Earned Leave</option>
                                    <option value="Other">Other</option>
                                </TextField>
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    label="Reason"
                                    multiline
                                    rows={4}
                                    margin='normal'
                                    fullWidth
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                />
                            </Box>
                            <Button variant="contained" color="primary" type="submit">
                                Submit Request
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                onClick={() => setIsSubmitting(false)} 
                                style={{ marginLeft: '8px' }}
                            >
                                View Status
                            </Button>
                        </form>
                    ) : (
                        <>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => setIsSubmitting(true)} 
                                style={{ marginBottom: '16px' }}
                            >
                                Submit New Request
                            </Button>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Start Date</TableCell>
                                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>End Date</TableCell>
                                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Status</TableCell>
                                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Type</TableCell>
                                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Reason</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leaveRequests.map((request) => (
                                            <TableRow key={request._id}>
                                                <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                                                <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                                                <TableCell>{request.status}</TableCell>
                                                <TableCell>{request.type}</TableCell>
                                                <TableCell>{request.reason}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default EmployeeLeaveSubmit;
