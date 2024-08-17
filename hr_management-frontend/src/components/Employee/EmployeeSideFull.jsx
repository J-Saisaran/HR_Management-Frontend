import React from 'react';
import { Container, Grid } from '@mui/material';
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
