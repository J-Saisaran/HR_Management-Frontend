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
        </Container>
    );
};

export default EmployeeFull;
