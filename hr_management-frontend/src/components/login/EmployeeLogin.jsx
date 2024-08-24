import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Container, AppBar, Box, Toolbar, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import http from '../../../utlis/http';
import './Style.css';
import IconButton from '@mui/material/IconButton';

function EmployeeLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

   
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Send login request
            const res = await http.post('/employees/login', { email, password });
    
            if (res.status === 200) {
                // Assuming the response contains the employee ID
                const id = res.data.id;
                console.log(id);
                // Navigate to the dashboard with the employee ID in the URL
                navigate(`/employee_side_full/${id}`);
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed">
                    <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
            <IconButton color="inherit" onClick={() => navigate('/')}>
              HR Management
            </IconButton>
          </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <br />
            <br />
            <br />
            <div>
                <Typography variant="h3" component="h1" gutterBottom>
                    Employee Login
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default EmployeeLogin;
