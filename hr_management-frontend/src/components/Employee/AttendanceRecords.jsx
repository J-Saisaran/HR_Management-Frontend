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
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TableSkeleton } from '../common/LoadingSkeleton';
import ToastAlert from '../common/ToastAlert';

const AttendanceRecords = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const res = await http.get(`/attendance/${id}`);
            setAttendanceRecords(res.data || []);
        } catch (err) {
            console.error('Error fetching attendance:', err);
            setToast({ open: true, message: 'Failed to load attendance records.', severity: 'warning' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            date: new Date().toISOString().slice(0, 10),
            status: 'Present',
            notes: '',
        },
        validationSchema: Yup.object({
            date: Yup.date().required('Date is required'),
            status: Yup.string().required('Status is required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const res = await http.post('/attendance', {
                    employee: id,
                    date: values.date,
                    status: values.status,
                    notes: values.notes,
                });
                setAttendanceRecords(prev => [res.data, ...prev]);
                setToast({ open: true, message: 'Attendance record logged successfully!', severity: 'success' });
                resetForm();
                setOpen(false);
            } catch (err) {
                console.error(err);
                setToast({ open: true, message: 'Failed to log attendance record', severity: 'error' });
            } finally {
                setSubmitting(false);
            }
        }
    });

    const getStatusChip = (status) => {
        switch (status) {
            case 'Present':
                return <Chip label="Present" size="small" sx={{ backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700 }} />;
            case 'Absent':
                return <Chip label="Absent" size="small" sx={{ backgroundColor: '#fee2e2', color: '#b91c1c', fontWeight: 700 }} />;
            case 'Late':
                return <Chip label="Late" size="small" sx={{ backgroundColor: '#fef3c7', color: '#b45309', fontWeight: 700 }} />;
            default:
                return <Chip label={status || 'On Leave'} size="small" sx={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: 700 }} />;
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                                Attendance Compliance Log
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                Monitor clock-in history, working days, and absentee records.
                            </Typography>
                        </div>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => setOpen(true)}
                        sx={{ backgroundColor: '#0284c7', textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
                    >
                        + Log Attendance Record
                    </Button>
                </Box>

                {loading ? (
                    <TableSkeleton rows={4} cols={4} />
                ) : attendanceRecords.length === 0 ? (
                    <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                        <Typography variant="h6" sx={{ color: '#64748b' }}>
                            No attendance records logged for this employee.
                        </Typography>
                    </Paper>
                ) : (
                    <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Attendance Status</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Manager / Employee Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendanceRecords.map((rec) => (
                                    <TableRow key={rec._id} hover>
                                        <TableCell sx={{ fontWeight: 600 }}>{new Date(rec.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{getStatusChip(rec.status)}</TableCell>
                                        <TableCell sx={{ color: '#475569' }}>{rec.notes || '—'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Add Attendance Dialog */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                    <DialogTitle sx={{ fontWeight: 700, backgroundColor: '#0f172a', color: '#ffffff' }}>
                        Log Attendance Entry
                    </DialogTitle>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent dividers sx={{ p: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        label="Date *"
                                        name="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        label="Status *"
                                        name="status"
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="Present">Present</MenuItem>
                                        <MenuItem value="Absent">Absent</MenuItem>
                                        <MenuItem value="Late">Late</MenuItem>
                                        <MenuItem value="Leave">On Leave</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Notes / Comments"
                                        name="notes"
                                        value={formik.values.notes}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                            <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#0284c7', textTransform: 'none', fontWeight: 600 }}>
                                Save Attendance
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Container>
        </Box>
    );
};

export default AttendanceRecords;
