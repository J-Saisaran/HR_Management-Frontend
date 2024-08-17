import React from 'react';
import { Container, Grid } from '@mui/material';
import EmployeeOverview from './EmployeeOverview';
import LeaveRequests from './LeaveRequests';
import AttendanceRecords from './AttendanceRecords';
import Dashboard from '../dashboard/Dashboard';
import PerformanceReview from "../performance/PerformanceReview "

const EmployeeFull = () => {
    return (
        <Container maxWidth="xl">
          <Dashboard />
          <EmployeeOverview />
            {/* <Grid container spacing={4}>
                
                <Grid item xs={12}>
                    <EmployeeOverview />
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                    <LeaveRequests />
                </Grid>
               
                
                <Grid item xs={12} md={6} lg={12}>
                    <AttendanceRecords />
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                    <PerformanceReview />
                </Grid>
                
            </Grid> */}
           
        </Container>
    );
};

export default EmployeeFull;
