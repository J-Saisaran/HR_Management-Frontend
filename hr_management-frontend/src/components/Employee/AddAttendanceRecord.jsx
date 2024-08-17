import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import http from '../../../utils/http';
import { TextField, Button, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    status: Yup.string().required('Status is required'),
    notes: Yup.string(),
});

const AddAttendanceRecord = ({ id, setAttendance, handleClose }) => {
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        http.post(`/employees/${id}/attendance`, values)
            .then((res) => {
                setAttendance((prev) => [...prev, res.data]);
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

    return (
        <Formik
            initialValues={{ date: '', status: '', notes: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => (
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
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Status</InputLabel>
                            <Field
                                as={Select}
                                name="status"
                                label="Status"
                                onChange={(e) => setFieldValue('status', e.target.value)}
                                value={values.status}
                                error={touched.status && Boolean(errors.status)}
                            >
                                <MenuItem value="Present">Present</MenuItem>
                                <MenuItem value="Absent">Absent</MenuItem>
                                <MenuItem value="Leave">Leave</MenuItem>
                                <MenuItem value="Late">Late</MenuItem>
                            </Field>
                            {touched.status && errors.status && (
                                <div style={{ color: 'red', marginTop: '8px' }}>{errors.status}</div>
                            )}
                        </FormControl>
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
                            Add
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    );
};

export default AddAttendanceRecord;

