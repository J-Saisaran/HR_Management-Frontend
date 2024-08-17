import React from 'react';
import { Card, CardContent, Typography, Grid, Button , Container} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dashboard_Employee from '../dashboard/Dashboard_Employee';
import Dashboard from '../dashboard/Dashboard';

const Recruitment = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Container>
            <Dashboard/>
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Job Postings
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Manage and create job postings.
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            style={{ marginTop: '16px' }} 
                            onClick={() => handleNavigate('/job_postings')}
                        >
                            Go to Job Postings
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            
            
        </Grid>
        </Container>
    );
};

export default Recruitment;
