import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import http from '../../../utlis/http';

const EmployeeEdit = ({ employeeId, onClose }) => {
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        // Fetch employee details by ID
        const fetchEmployee = async () => {
            try {
                const response = await http.get(`/api/employees/${employeeId}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        if (employeeId) {
            fetchEmployee();
        }
    }, [employeeId]);

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

                const response = await http.put(`/api/employees/${employeeId}`, updatedEmployee);
                console.log('Updated employee:', response.data);
                onClose(); // Close the form or modal after successful update
            } catch (error) {
                console.error('Error updating employee:', error);
            }
        },
    });

    // Pre-fill form fields with employee data when available
    useEffect(() => {
        if (employee) {
            formik.setValues({
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phone: employee.phone,
                street: employee.address?.street || '',
                city: employee.address?.city || '',
                state: employee.address?.state || '',
                postalCode: employee.address?.postalCode || '',
                country: employee.address?.country || '',
                position: employee.position,
                department: employee.department,
                startDate: employee.startDate,
                dateOfBirth: employee.dateOfBirth,
                emergencyContactName: employee.emergencyContact?.name || '',
                emergencyContactRelationship: employee.emergencyContact?.relationship || '',
                emergencyContactPhone: employee.emergencyContact?.phone || '',
            });
        }
    }, [employee]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                />
            </div>
            {/* Add additional form fields for address, position, etc. */}
            <button type="submit">Update Employee</button>
        </form>
    );
};

export default EmployeeEdit;
