import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Dashboard_2 from '../dashboard/Dashboard_2'
import { useNavigate } from 'react-router-dom';


const Home = () => {
   const navigate = useNavigate();

    const handleHRLogin = () => {
        navigate('/hr_login');

       
    };

    const handleEmployeeLogin = () => {
        navigate('/employee_login');

      
    };
    const handleCandidatepage = () => {
        navigate('/job_postings_view');}

    return (
        <Container maxWidth="md" style={{ marginTop: '100px' }}>
            <Dashboard_2/>
           
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                HR Login
                            </Typography>
                            <Typography variant="body2" component="p">
                                Login to access the HR management system.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleHRLogin}
                                style={{ marginTop: '20px' }}
                            >
                                HR Login
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Employee Login
                            </Typography>
                            <Typography variant="body2" component="p">
                                Login to access your employee dashboard.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEmployeeLogin}
                                style={{ marginTop: '20px' }}
                            >
                                Employee Login
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                               Candidate Page 
                            </Typography>                           
                                <ul>
                                <li>Candidate can View the Job posted by HR </li>
                                <li>Candidate can Apply for the Job </li>
                                <li>Candidate can View the Schedule of Interview </li>
                                </ul>                            
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCandidatepage}
                                style={{ marginTop: '20px' }}
                            >
                              Candidate Page
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
