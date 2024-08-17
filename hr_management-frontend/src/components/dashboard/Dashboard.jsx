import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/hr_login');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          
            <IconButton color="inherit" onClick={() => navigate('/')}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              HR Management
              </Typography>
            </IconButton>
          
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
              Options
              </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/employeelist'); }}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Employee List" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/job_postings'); }}>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Job Posting" />
            </ListItemButton>
          </ListItem>
          {/* Add more list items here if needed */}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* Add content for the dashboard here */}
      </Main>
    </Box>
  );
}

export default Dashboard;



// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import { Button } from '@mui/material';
// import Menu from '@mui/material/Menu';
// import usestate from 'react';
// import MenuItem from '@mui/material/MenuItem';
// import './dashboard.css';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import  { useNavigate } from 'react-router-dom';
// import AuthContext from '../../context/AuthContext';
// import { useContext } from 'react';




// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

//  function Dashboard() {
//   const { logout } = useContext(AuthContext);
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleLogout = () =>{
//     logout();
//     navigate('/hr_login');

//   }

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const navigate = useNavigate();

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             <Button color="inherit" >
//               HR Management
//             </Button>
//           </Typography>

//          {/* <div  edge="end" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             // onClick={}
//             edge="end"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <AccountCircleIcon />
//             </IconButton>
//         </div> */}
//         </Toolbar>
       
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />

        
//         <List>
            

//             <ListItem disablePadding>
//               <ListItemButton onClick={()=>{navigate('/employeelist')}}>
//                 <ListItemIcon>
//                 </ListItemIcon>
//                 <ListItemText primary="Employee" />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton onClick={()=>{navigate('/employee')}}>
//                 <ListItemIcon>
//                 </ListItemIcon>
//                 <ListItemText primary="Employee" />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton onClick={()=>{navigate('/employee')}}>
//                 <ListItemIcon>
//                 </ListItemIcon>
//                 <ListItemText primary="Employee" />
//               </ListItemButton>
//             </ListItem>
        
        
        
        
//         </List>
//          <Divider />
//         <List>
//             <ListItem disablePadding>
//               <ListItemButton onClick={()=>{handleLogout()}}>
//                 <ListItemIcon>
//                 </ListItemIcon>
//                 <ListItemText primary = "Logout" />
//               </ListItemButton>
//             </ListItem>
        
//         </List>
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//       </Main>
//     </Box>
//   );
// }
// export default Dashboard;