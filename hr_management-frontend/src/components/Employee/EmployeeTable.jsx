import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    Chip,
    Box,
    Typography,
    Grid,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import http from '../../../utlis/http';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarRateIcon from '@mui/icons-material/StarRate';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useNavigate } from 'react-router-dom';
import { TableSkeleton } from '../common/LoadingSkeleton';
import ToastAlert from '../common/ToastAlert';

function EmployeeTable({ refreshTrigger }) {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await http.get('/employees');
            setEmployees(res.data || []);
        } catch (err) {
            console.error('Error fetching employees:', err);
            setToast({ open: true, message: 'Failed to fetch employees.', severity: 'warning' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [refreshTrigger]);

    const handleDelete = async (id, name) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${name || 'this employee'}?`);
        if (confirmed) {
            try {
                await http.delete(`/employees/${id}`);
                setEmployees(prev => prev.filter(emp => emp._id !== id));
                setToast({ open: true, message: 'Employee deleted successfully', severity: 'success' });
            } catch (error) {
                console.error('Failed to delete employee:', error);
                setToast({ open: true, message: 'Failed to delete employee', severity: 'error' });
            }
        }
    };

    const handleMore = (id) => {
        navigate(`/employee_full/${id}`);
    };

    const handlePerformance = (id) => {
        navigate(`/employee_performance/${id}`);
    };

    const handleUpdate = async (id) => {
        try {
            const res = await http.get(`/employees/${id}`);
            setSelectedEmployee(res.data);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching employee:', error);
            setToast({ open: true, message: 'Error loading employee details for update', severity: 'error' });
        }
    };

    const handleExportCSV = () => {
        if (!employees.length) return;
        const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Position', 'Department', 'Start Date'];
        const rows = employees.map(e => [
            e.firstName, e.lastName, e.email, e.phone, e.position, e.department, e.startDate
        ]);
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `employees_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            position: '',
            department: '',
            startDate: '',
            dateOfBirth: '',
            emergencyContactName: '',
            emergencyContactRelationship: '',
            emergencyContactPhone: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().required('Phone is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const updatedEmployee = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    address: {
                        street: values.street,
                        city: values.city,
                        state: values.state,
                        postalCode: values.postalCode,
                        country: values.country,
                    },
                    position: values.position,
                    department: values.department,
                    startDate: values.startDate,
                    dateOfBirth: values.dateOfBirth,
                    emergencyContact: {
                        name: values.emergencyContactName,
                        relationship: values.emergencyContactRelationship,
                        phone: values.emergencyContactPhone,
                    },
                };

                const response = await http.put(`/employees/${selectedEmployee._id}`, updatedEmployee);
                setEmployees(prev => prev.map(emp => (emp._id === selectedEmployee._id ? response.data : emp)));
                setOpen(false);
                setSelectedEmployee(null);
                setToast({ open: true, message: 'Employee updated successfully!', severity: 'success' });
            } catch (error) {
                console.error('Error updating employee:', error);
                setToast({ open: true, message: 'Error updating employee', severity: 'error' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (selectedEmployee) {
            formik.setValues({
                firstName: selectedEmployee.firstName || '',
                lastName: selectedEmployee.lastName || '',
                email: selectedEmployee.email || '',
                phone: selectedEmployee.phone || '',
                street: selectedEmployee.address?.street || '',
                city: selectedEmployee.address?.city || '',
                state: selectedEmployee.address?.state || '',
                postalCode: selectedEmployee.address?.postalCode || '',
                country: selectedEmployee.address?.country || '',
                position: selectedEmployee.position || '',
                department: selectedEmployee.department || '',
                startDate: selectedEmployee.startDate ? selectedEmployee.startDate.slice(0, 10) : '',
                dateOfBirth: selectedEmployee.dateOfBirth ? selectedEmployee.dateOfBirth.slice(0, 10) : '',
                emergencyContactName: selectedEmployee.emergencyContact?.name || '',
                emergencyContactRelationship: selectedEmployee.emergencyContact?.relationship || '',
                emergencyContactPhone: selectedEmployee.emergencyContact?.phone || '',
            });
        }
    }, [selectedEmployee]);

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch =
            `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (emp.position && emp.position.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesDepartment = selectedDepartment === 'All' || emp.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });

    const departments = ['All', 'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Operations', 'Finance', 'Design'];

    return (
        <Box sx={{ mt: 2 }}>
            <ToastAlert
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={() => setToast(prev => ({ ...prev, open: false }))}
            />

            {/* Filter and Search Bar */}
            <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e2e8f0', borderRadius: 3, backgroundColor: '#ffffff' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={5}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search by name, email, or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#94a3b8' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="department-filter-label">Filter Department</InputLabel>
                            <Select
                                labelId="department-filter-label"
                                value={selectedDepartment}
                                label="Filter Department"
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                            >
                                {departments.map((dept, idx) => (
                                    <MenuItem key={idx} value={dept}>{dept}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={2} md={3} sx={{ textAlign: { sm: 'right' } }}>
                        <Button
                            variant="outlined"
                            size="medium"
                            startIcon={<FileDownloadIcon />}
                            onClick={handleExportCSV}
                            sx={{ textTransform: 'none', borderColor: '#cbd5e1', color: '#475569', fontWeight: 600 }}
                        >
                            Export CSV
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Employee Table or Loading Skeleton */}
            {loading ? (
                <TableSkeleton rows={5} cols={6} />
            ) : filteredEmployees.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                    <Typography variant="h6" sx={{ color: '#64748b' }}>No employees found matching the filter criteria.</Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Employee Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Role / Position</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Department</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Phone</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#475569', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEmployees.map((emp) => (
                                <TableRow key={emp._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ fontWeight: 600, color: '#0f172a' }}>
                                        {emp.firstName} {emp.lastName}
                                    </TableCell>
                                    <TableCell sx={{ color: '#475569' }}>{emp.email}</TableCell>
                                    <TableCell sx={{ color: '#0284c7', fontWeight: 500 }}>{emp.position}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={emp.department || 'General'}
                                            size="small"
                                            sx={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: 600 }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: '#475569' }}>{emp.phone}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Tooltip title="View Full Profile">
                                            <IconButton color="primary" size="small" onClick={() => handleMore(emp._id)}>
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Performance Review">
                                            <IconButton color="warning" size="small" onClick={() => handlePerformance(emp._id)}>
                                                <StarRateIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Edit Details">
                                            <IconButton color="info" size="small" onClick={() => handleUpdate(emp._id)}>
                                                <EditNoteSharpIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Delete Employee">
                                            <IconButton color="error" size="small" onClick={() => handleDelete(emp._id, `${emp.firstName} ${emp.lastName}`)}>
                                                <PersonRemoveRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Edit Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, backgroundColor: '#0f172a', color: '#ffffff' }}>
                    Edit Employee Record
                </DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent dividers sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="First Name"
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Last Name"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Role / Position"
                                    name="position"
                                    value={formik.values.position}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Department"
                                    name="department"
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                        <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none', color: '#64748b' }}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ textTransform: 'none', backgroundColor: '#0284c7', fontWeight: 600 }}>
                            Save Updates
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}

export default EmployeeTable;
