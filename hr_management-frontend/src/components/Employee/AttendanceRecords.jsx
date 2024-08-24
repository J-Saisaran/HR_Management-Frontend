import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    MenuItem,
} from '@mui/material';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import Dashboard from '../dashboard/Dashboard';

const AttendanceRecords = () => {
    const { id } = useParams(); 
    const [attendance, setAttendance] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentRecordId, setCurrentRecordId] = useState(null);

    useEffect(() => {
        http.get(`/attendance/${id}/`)
            .then(res => {
                setAttendance(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setCurrentRecordId(null); // Reset current record ID
    };

    const handleEdit = (record) => {
        setCurrentRecordId(record._id);
        setEditMode(true);
        setOpen(true);
    };

    const handleDelete = (recordId) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this record?");
        if (confirmDelete) {
            http.delete(`/attendance/${recordId}`)
                .then(() => {
                    setAttendance(attendance.filter((record) => record._id !== recordId));
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const validationSchema = Yup.object().shape({
        date: Yup.date().required('Date is required'),
        status: Yup.string().required('Status is required'),
        notes: Yup.string(),
    });

    const addAttendanceRecord = (values, { setSubmitting, resetForm }) => {
        http.post(`/attendance/${id}/`, { ...values, employee: `${id}` })
            .then((res) => {
                setAttendance([...attendance, res.data]);
                resetForm();
                handleClose();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const updateAttendanceRecord = (values, { setSubmitting }) => {
        http.put(`/attendance/${currentRecordId}`, values)
            .then((res) => {
                const updatedRecords = attendance.map((record) =>
                    record._id === currentRecordId ? res.data : record
                );
                setAttendance(updatedRecords);
                handleClose();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleSubmit = (values, formikBag) => {
        if (editMode) {
            updateAttendanceRecord(values, formikBag);
        } else {
            addAttendanceRecord(values, formikBag);
        }
    };

    return (
        <Container maxWidth="md">
            <Dashboard />
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Attendance Records
                        <IconButton
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            <AddCircleSharpIcon />
                        </IconButton>
                    </Typography>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            {editMode ? 'Edit Attendance Record' : 'Add Attendance Record'}
                        </DialogTitle>
                        <Formik
                            initialValues={{
                                date: '',
                                status: '',
                                notes: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <Form>
                                    <DialogContent>
                                        <Field
                                            as={TextField}
                                            name="date"
                                            label="Date"
                                            type="date"
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.date && Boolean(errors.date)}
                                            helperText={touched.date && errors.date}
                                        />
                                        <Field
                                            as={TextField}
                                            name="status"
                                            label="Status"
                                            select
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            error={touched.status && Boolean(errors.status)}
                                            helperText={touched.status && errors.status}
                                        >
                                            <MenuItem value="Present">Present</MenuItem>
                                            <MenuItem value="Absent">Absent</MenuItem>
                                            <MenuItem value="On Leave">On Leave</MenuItem>
                                            <MenuItem value="Late">Late</MenuItem>
                                        </Field>
                                        <Field
                                            as={TextField}
                                            name="notes"
                                            label="Notes"
                                            type="text"
                                            margin="normal"
                                            fullWidth
                                            variant="outlined"
                                            error={touched.notes && Boolean(errors.notes)}
                                            helperText={touched.notes && errors.notes}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="secondary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary" disabled={isSubmitting}>
                                            {editMode ? 'Update' : 'Add'}
                                        </Button>
                                    </DialogActions>
                                </Form>
                            )}
                        </Formik>
                    </Dialog>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Notes</TableCell>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Edit</TableCell>
                                    <TableCell style={{ borderBottom: '2px solid #000' , fontWeight: 'bold' }}>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendance.map((record) => (
                                    <TableRow key={record._id}>
                                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{record.status}</TableCell>
                                        <TableCell>{record.notes}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(record)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => handleDelete(record._id)}
                                            >
                                                <PersonRemoveRoundedIcon />
                                            </IconButton>
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

export default AttendanceRecords;
