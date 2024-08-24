import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import http from '../../../utlis/http';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import EditIcon from '@mui/icons-material/Edit';
import Dashboard from '../dashboard/Dashboard'

const PerformanceReviewSchema = Yup.object().shape({
    reviewDate: Yup.date().required('Review Date is required'),
    rating: Yup.number().min(1).max(10).required('Rating is required'),  // Updated max value to 10
    comments: Yup.string().required('Comments are required')
});

const PerformanceReview = () => {
    const [performances, setPerformances] = useState([]);
    const [editingPerformance, setEditingPerformance] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        http.get(`/performances/${id}/`)
            .then(res => {
                setPerformances(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    const addPerformanceReview = (values, { setSubmitting, resetForm }) => {
        http.post(`/performances/${id}/`, { ...values, employee: `${id}` })
            .then((res) => {
                setPerformances([...performances, res.data]);
                resetForm();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleEdit = (performance) => {
        setEditingPerformance(performance._id);
    };

    const updatePerformanceReview = (values, { setSubmitting, resetForm }) => {
        http.put(`/performances/${editingPerformance}/`, values)
            .then((res) => {
                const updatedRecords = performances.map((record) =>
                    record._id === editingPerformance ? res.data : record
                );
                setPerformances(updatedRecords);
                setEditingPerformance(null);
                resetForm();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleDelete = (performanceId) => {
        // Confirm deletion
        if (window.confirm('Are you sure you want to delete this performance review?')) {
            http.delete(`/performances/${performanceId}/`)
                .then(() => {
                    setPerformances(performances.filter(performance => performance._id !== performanceId));
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    return (
        <Container maxWidth="md">
            <Card>
                <Dashboard />
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {editingPerformance ? 'Edit Performance Review' : 'Add Performance Review'}
                    </Typography>
                    <Formik
                        initialValues={{
                            reviewDate: editingPerformance ? editingPerformance.reviewDate : '',
                            projectName: editingPerformance ? editingPerformance.projectName : '',
                            rating: editingPerformance ? editingPerformance.rating : '',
                            comments: editingPerformance ? editingPerformance.comments : ''
                        }}
                        validationSchema={PerformanceReviewSchema}
                        onSubmit={editingPerformance ? updatePerformanceReview : addPerformanceReview}
                        enableReinitialize={true}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="reviewDate"
                                    label="Review Date"
                                    type="date"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.reviewDate && Boolean(errors.reviewDate)}
                                    helperText={touched.reviewDate && errors.reviewDate}
                                />
                                <Field
                                    as={TextField}
                                    name="projectName"
                                    label="Project Name"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={touched.projectName && Boolean(errors.projectName)}
                                    helperText={touched.projectName && errors.projectName}
                                />
                                <Field
                                    as={TextField}
                                    name="rating"
                                    label="Rating"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={touched.rating && Boolean(errors.rating)}
                                    helperText={touched.rating && errors.rating}
                                />
                                <Field
                                    as={TextField}
                                    name="comments"
                                    label="Comments"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={touched.comments && Boolean(errors.comments)}
                                    helperText={touched.comments && errors.comments}
                                />
                                <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                                    {editingPerformance ? 'Update Review' : 'Add Review'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>

            <Card style={{ marginTop: '20px' }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Performance Reviews
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Review Date</TableCell>
                                    <TableCell>Project Name</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Comments</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {performances.map((performance) => (
                                    <TableRow key={performance._id}>
                                        <TableCell>{new Date(performance.reviewDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{performance.projectName}</TableCell>
                                        <TableCell>{performance.rating}</TableCell>
                                        <TableCell>{performance.comments}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(performance)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => handleDelete(performance._id)}
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

export default PerformanceReview;
