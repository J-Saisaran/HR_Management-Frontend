import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';



import  { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import LoginIcon from '@mui/icons-material/Login';





const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

 function Dashboard_1() {
  const { logout } = useContext(AuthContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleLoginButton = () =>{
    navigate('/hr_login');
  }
  
  const navigate = useNavigate();
  

  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
            <IconButton color="inherit" onClick={() => navigate('/')}>
              HR Management
            </IconButton>
          </Typography>
         <div  edge="end" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleLoginButton}
            edge="end"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          > Login
            <LoginIcon />
            </IconButton>
        </div>
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}
export default Dashboard_1;