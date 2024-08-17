import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import http from '../../../utils/http';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    status: Yup.string().required('Status is required'),
    notes: Yup.string(),
});

const UpdateAttendanceRecord = ({ record, open, handleClose, setAttendance, attendance }) => {
    const updateAttendanceRecord = (values, { setSubmitting }) => {
        http.put(`/attendance/${record._id}`, values)
            .then((res) => {
                const updatedRecords = attendance.map((rec) =>
                    rec._id === record._id ? res.data : rec
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

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Attendance Record</DialogTitle>
            <Formik
                initialValues={{
                    date: record.date || '',
                    status: record.status || '',
                    notes: record.notes || '',
                }}
                validationSchema={validationSchema}
                onSubmit={updateAttendanceRecord}
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
                                type="text"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                error={touched.status && Boolean(errors.status)}
                                helperText={touched.status && errors.status}
                            />
                            <Field
                                as={TextField}
                                name="notes"
                                label="Notes"
                                type="text"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                error={touched.notes && Boolean(errors.notes)}
                                helperText={touched.notes && errors.notes}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" disabled={isSubmitting}>
                                Update
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default UpdateAttendanceRecord;
