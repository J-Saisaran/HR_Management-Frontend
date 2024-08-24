import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../utlis/http';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Container,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosSharpIcon from  '@mui/icons-material/ArrowForwardIosSharp';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading'


const EmployeeOverview = () => {
    const { id } = useParams(); // Get employee ID from URL params
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    const handlePerformance = async (id) =>{
        navigate(`/employee_performance/${id}`);}

    const handleleave = async (id) =>{
        navigate(`/employee_leaverequest/${id}`);}

        const handleAttendance = async (id) =>{
            navigate(`/employee_attendance/${id}`);}

    useEffect(() => {
        http.get(`/employees/${id}`)
            .then(res => {
                setEmployee(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    if (!employee) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Loading />
</div>;

    return (
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {employee.firstName} {employee.lastName}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {employee.position} - {employee.department}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body2" ><span style={{fontWeight: 'bold' }}>Email:</span> {employee.email}</Typography>
                            <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Phone:</span> {employee.phone}</Typography>
                            <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Start Date:</span> {employee.startDate}</Typography>
                            <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Date of Birth:</span> {employee.dateOfBirth}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Street:</span> {employee.address.street}</Typography>
                            <Typography variant="body2"><span style={{fontWeight: 'bold' }}>City:</span> {employee.address.city} </Typography>
                            <Typography variant="body2"><span style={{fontWeight: 'bold' }}>State:</span> {employee.address.state} </Typography>
                            <Typography variant="body2"><span style={{fontWeight: 'bold' }}>Postal Code:</span> {employee.address.postalCode} </Typography>
                            
                        </Grid>
                        
                           
                             
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default EmployeeOverview ;