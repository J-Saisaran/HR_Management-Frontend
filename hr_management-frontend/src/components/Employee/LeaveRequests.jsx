import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import http from '../../../utlis/http';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
    Box,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { TableSkeleton } from '../common/LoadingSkeleton';
import ToastAlert from '../common/ToastAlert';

const LeaveRequests = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchLeaveRequests();
    }, [id]);

    const fetchLeaveRequests = async () => {
        setLoading(true);
        try {
            const res = await http.get(`/leaves/${id}/`);
            setLeaveRequests(res.data || []);
        } catch (err) {
            console.error('Error fetching leaves:', err);
            setToast({ open: true, message: 'Failed to fetch leave requests.', severity: 'warning' });
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (requestId, status) => {
        try {
            const res = await http.put(`/leaves/${requestId}`, { status });
            setLeaveRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === requestId ? { ...request, status: res.data.status || status } : request
                )
            );
            setToast({ open: true, message: `Leave request ${status.toLowerCase()} successfully!`, severity: status === 'Approved' ? 'success' : 'info' });
        } catch (err) {
            console.error('Error updating leave status:', err);
            setToast({ open: true, message: 'Failed to update leave status.', severity: 'error' });
        }
    };

    const getStatusChip = (status) => {
        switch (status) {
            case 'Approved':
                return <Chip label="Approved" size="small" sx={{ backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700 }} />;
            case 'Rejected':
                return <Chip label="Rejected" size="small" sx={{ backgroundColor: '#fee2e2', color: '#b91c1c', fontWeight: 700 }} />;
            default:
                return <Chip label="Pending" size="small" sx={{ backgroundColor: '#fef3c7', color: '#b45309', fontWeight: 700 }} />;
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', py: 4 }}>
            <ToastAlert
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={() => setToast(prev => ({ ...prev, open: false }))}
            />

            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/employeelist')}
                        sx={{ textTransform: 'none', borderColor: '#cbd5e1', color: '#475569', borderRadius: 2 }}
                    >
                        Back to Employee List
                    </Button>
                    <div>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                            Leave Request Management
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Review, approve, or reject employee leave applications.
                        </Typography>
                    </div>
                </Box>

                {loading ? (
                    <TableSkeleton rows={4} cols={5} />
                ) : leaveRequests.length === 0 ? (
                    <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                        <Typography variant="h6" sx={{ color: '#64748b' }}>
                            No leave requests found for this employee.
                        </Typography>
                    </Paper>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Start Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>End Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Leave Type</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569', textAlign: 'center' }}>HR Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaveRequests.map((request) => (
                                    <TableRow key={request._id} hover>
                                        <TableCell sx={{ fontWeight: 600 }}>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{request.leaveType || 'General Leave'}</TableCell>
                                        <TableCell>{getStatusChip(request.status)}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            {request.status === 'Pending' ? (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        startIcon={<CheckCircleIcon />}
                                                        onClick={() => handleApproval(request._id, 'Approved')}
                                                        sx={{ backgroundColor: '#16a34a', textTransform: 'none', fontWeight: 600, '&:hover': { backgroundColor: '#15803d' } }}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={<CancelIcon />}
                                                        onClick={() => handleApproval(request._id, 'Rejected')}
                                                        sx={{ color: '#dc2626', borderColor: '#dc2626', textTransform: 'none', fontWeight: 600, '&:hover': { backgroundColor: '#fee2e2' } }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
                                                    Completed ({request.status})
                                                </Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </Box>
    );
};

export default LeaveRequests;
