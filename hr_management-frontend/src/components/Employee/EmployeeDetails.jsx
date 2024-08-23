import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import http from '../../../utlis/http';
import Container from '@mui/material/Container';
import './Style.css';
import EmployeeTable from './EmployeeTable';
import Dashboard from '../dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Typography from '@mui/material/Typography';


const EmployeeManagement = () => {
const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

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
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            phone: Yup.string().required('Phone is required'),
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            postalCode: Yup.string().required('Postal Code is required'),
            country: Yup.string().required('Country is required'),
            position: Yup.string().required('Position is required'),
            department: Yup.string().required('Department is required'),
            startDate: Yup.date().required('Start Date is required'),
            dateOfBirth: Yup.date().required('Date of Birth is required'),
            emergencyContactName: Yup.string().required('Emergency Contact Name is required'),
            emergencyContactRelationship: Yup.string().required('Emergency Contact Relationship is required'),
            emergencyContactPhone: Yup.string().required('Emergency Contact Phone is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: values => {
            http.post('/employees', {
                ...values,
                address: {
                    street: values.street,
                    city: values.city,
                    state: values.state,
                    postalCode: values.postalCode,
                    country: values.country
                },
                emergencyContact: {
                    name: values.emergencyContactName,
                    relationship: values.emergencyContactRelationship,
                    phone: values.emergencyContactPhone
                }
            })
            .then(res => {
                setEmployees([...employees, res.data]);
                setOpen(false);
                formik.resetForm(true);
                window.location.reload();
                navigate('/employeelist');

            })
            .catch(err => {
                console.error(err);
                clg("Employee already exists");
            });
        },
      });



   


    return (
        <Container maxWidth="xl" className="employee-management-container">
            <Dashboard />
            <Typography variant="h5" style={{textAlign: 'center', fontWeight:'bolder'}}>
                Employees Management
                </Typography>
        <div className="add-employee-button">
        
            <IconButton
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            > <GroupAddIcon/>
             <Typography variant="h5" component="div" gutterBottom>
                Add Employee
                </Typography>
            </IconButton>
           
        </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            margin="normal"
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            margin="normal"
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            margin="normal"
                            helperText={formik.touched.phone && formik.errors.phone}
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
                            
                        }}margin="normal"
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
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            margin="normal"
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add Employee
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <EmployeeTable/>
            
            </Container>
      
    );
};

export default EmployeeManagement;
