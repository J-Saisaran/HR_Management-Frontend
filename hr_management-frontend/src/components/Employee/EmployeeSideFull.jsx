import React from 'react';
import { Container, Grid } from '@mui/material';
import EmployeeOverview from './EmployeeOverview';
import LeaveRequests from './LeaveRequests';
import AttendanceRecords from './AttendanceRecords';
import Dashboard from '../dashboard/Dashboard';
import PerformanceReview from "../performance/PerformanceReview "
import Dashboard_Employee from '../dashboard/Dashboard_Employee';
import EmployeeSideOverview from './EmployeeSideOverview';

const EmployeeSideFull = () => {
    return (
        <Container maxWidth="xl">
          <Dashboard_Employee />

          <EmployeeSideOverview />
          
           
        </Container>
    );
};

export default EmployeeSideFull;
