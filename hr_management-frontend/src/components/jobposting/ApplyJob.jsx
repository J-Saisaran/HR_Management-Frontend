import React from 'react';
import { Typography, Container, Button, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import http from '../../../utlis/http'; // Correct path to Axios instance
import { useParams } from 'react-router-dom';
import Dashboard_2 from '../dashboard/Dashboard_2';

const ApplyJob = () => {
    const { jobId } = useParams(); // Get the job ID from URL parameters

    return (
        <Container>
            <Dashboard_2 /> <br /><br /><br />
            <Typography variant="h4" component="h1" gutterBottom>
                Apply for Job
            </Typography>
            <Formik
                initialValues={{
                    candidateName: '',
                    candidateEmail: '',
                    phoneNumber: '', 
                    resume: '',
                    coverLetter: ''
                }}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        await http.post(`candidates/apply/${jobId}`, values);
                        alert('Application submitted successfully!');
                        resetForm();
                    } catch (err) {
                        console.error(err);
                    }
                }}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form>
                        <Field
                            as={TextField}
                            label="Name"
                            name="candidateName"
                            fullWidth
                            required
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.candidateName}
                        />
                        <Field
                            as={TextField}
                            label="Email"
                            name="candidateEmail"
                            type="email"
                            fullWidth
                            required
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.candidateEmail}
                        />
                        <Field
                            as={TextField}
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                            fullWidth
                            required
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phoneNumber}
                        />
                        <Field
                            as={TextField}
                            label="Resume (Link)"
                            name="resume"
                            fullWidth
                            required
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.resume}
                        />
                        <Field
                            as={TextField}
                            label="Cover Letter"
                            name="coverLetter"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.coverLetter}
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Apply
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default ApplyJob;
