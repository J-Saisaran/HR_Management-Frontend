import React, { useState, useEffect } from 'react'
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
} from '@mui/material';
import http from '../../../utlis/http';
import Container from '@mui/material/Container';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { useNavigate } from 'react-router-dom';

function EmployeeTable() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Handle the delete operation
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");
        if (confirmed) {
            try {
                // Perform the delete request
                await http.delete(`/employees/${id}`);

                // Update the state to remove the deleted employee
                setEmployees(employees.filter((employee) => employee._id !== id));
            } catch (error) {
                console.error("Failed to delete employee:", error);
            }
        }
    };

    // Handle Full details with handleMore
    const handleMore = (id) => {
        navigate(`/employee_full/${id}`);
        setOpen(true);
    };

    useEffect(() => {
        http.get('/employees')
            .then(res => {
                setEmployees(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    // Handle the edit button click
    const handleUpdate = async (id) => {
        try {
            const employee = await http.get(`/employees/${id}`);
            setSelectedEmployee(employee.data);

            // Open the update form/modal
            setOpen(true);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const handlePerformance = async (id) => {
        navigate(`/employee_performance/${id}`);
        setOpen(true);
    };

    // Handle form submission and update the employee
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
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
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

                // Send PUT request to update employee details
                const response = await http.put(`/employees/${selectedEmployee._id}`, updatedEmployee);
                console.log('Updated employee:', response.data);

                // Update the state with the new employee data
                setEmployees((prev) =>
                    prev.map((emp) => (emp._id === selectedEmployee._id ? response.data : emp))
                );

                // Close the form/modal
                setOpen(false);
                setSelectedEmployee(null);
            } catch (error) {
                console.error('Error updating employee:', error);
            }
        },
    });

    // Pre-fill form fields with employee data when selected
    useEffect(() => {
        if (selectedEmployee) {
            formik.setValues({
                firstName: selectedEmployee.firstName,
                lastName: selectedEmployee.lastName,
                email: selectedEmployee.email,
                phone: selectedEmployee.phone,
                street: selectedEmployee.address?.street || '',
                city: selectedEmployee.address?.city || '',
                state: selectedEmployee.address?.state || '',
                postalCode: selectedEmployee.address?.postalCode || '',
                country: selectedEmployee.address?.country || '',
                position: selectedEmployee.position,
                department: selectedEmployee.department,
                startDate: selectedEmployee.startDate,
                dateOfBirth: selectedEmployee.dateOfBirth,
                emergencyContactName: selectedEmployee.emergencyContact?.name || '',
                emergencyContactRelationship: selectedEmployee.emergencyContact?.relationship || '',
                emergencyContactPhone: selectedEmployee.emergencyContact?.phone || '',
            });
        }
    }, [selectedEmployee]);

    return (
        <Container maxWidth="xl" className="employee-management-container">
            <TableContainer component={Paper} className="table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>First Name</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000', fontWeight: 'bold'  }}>Last Name</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000', fontWeight: 'bold'  }}>Email</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000', fontWeight: 'bold'  }}>Phone</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Position</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000', fontWeight: 'bold'  }}>Department</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Edit</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Delete</TableCell>
                            <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>More</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell>{employee.firstName}</TableCell>
                                <TableCell>{employee.lastName}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.phone}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>
                                    <IconButton
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleUpdate(employee._id)}
                                    >
                                        <EditNoteSharpIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        <PersonRemoveRoundedIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleMore(employee._id)}
                                    >
                                        <ArrowForwardIosSharpIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Employee</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="street"
                            name="street"
                            label="Street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.street && Boolean(formik.errors.street)}
                            margin="normal"
                            helperText={formik.touched.street && formik.errors.street}
                        />
                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            margin="normal"
                            helperText={formik.touched.city && formik.errors.city}
                        />
                        <TextField
                            fullWidth
                            id="state"
                            name="state"
                            label="State"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            margin="normal"
                            helperText={formik.touched.state && formik.errors.state}
                        />
                        <TextField
                            fullWidth
                            id="postalCode"
                            name="postalCode"
                            label="Postal Code"
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                            margin="normal"
                            helperText={formik.touched.postalCode && formik.errors.postalCode}
                        />
                        <TextField
                            fullWidth
                            id="country"
                            name="country"
                            label="Country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            margin="normal"
                            helperText={formik.touched.country && formik.errors.country}
                        />
                        <TextField
                            fullWidth
                            id="position"
                            name="position"
                            label="Position"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.position && Boolean(formik.errors.position)}
                            margin="normal"
                            helperText={formik.touched.position && formik.errors.position}
                        />
                        <TextField
                            fullWidth
                            id="department"
                            name="department"
                            label="Department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.department && Boolean(formik.errors.department)}
                            margin="normal"
                            helperText={formik.touched.department && formik.errors.department}
                        />
                        <TextField
                            fullWidth
                            id="startDate"
                            name="startDate"
                            label="Start Date"
                            type="date"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                            helperText={formik.touched.startDate && formik.errors.startDate}
                            InputLabelProps={{
                                shrink: true,

                            }} margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="dateOfBirth"
                            name="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            value={formik.values.dateOfBirth}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                            InputLabelProps={{
                                shrink: true,

                            }} margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="emergencyContactName"
                            name="emergencyContactName"
                            label="Emergency Contact Name"
                            value={formik.values.emergencyContactName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.emergencyContactName && Boolean(formik.errors.emergencyContactName)}
                            margin="normal"
                            helperText={formik.touched.emergencyContactName && formik.errors.emergencyContactName}
                        />
                        <TextField
                            fullWidth
                            id="emergencyContactRelationship"
                            name="emergencyContactRelationship"
                            label="Emergency Contact Relationship"
                            value={formik.values.emergencyContactRelationship}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.emergencyContactRelationship && Boolean(formik.errors.emergencyContactRelationship)}
                            margin="normal"
                            helperText={formik.touched.emergencyContactRelationship && formik.errors.emergencyContactRelationship}
                        />
                        <TextField
                            fullWidth
                            id="emergencyContactPhone"
                            name="emergencyContactPhone"
                            label="Emergency Contact Phone"
                            value={formik.values.emergencyContactPhone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.emergencyContactPhone && Boolean(formik.errors.emergencyContactPhone)}
                            margin="normal"
                            helperText={formik.touched.emergencyContactPhone && formik.errors.emergencyContactPhone}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
}

export default EmployeeTable;
