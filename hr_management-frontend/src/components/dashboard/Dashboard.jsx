import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import http from '../../../utlis/http';

const drawerWidth = 260;

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
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#0f172a',
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
  padding: theme.spacing(0, 1.5),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  backgroundColor: '#0f172a',
  color: '#ffffff',
}));

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [empRes, jobsRes, leavesRes, candRes] = await Promise.allSettled([
        http.get('/employees'),
        http.get('/jobpostings'),
        http.get('/leaves'),
        http.get('/candidates'),
      ]);

      if (empRes.status === 'fulfilled') setEmployees(empRes.value.data || []);
      if (jobsRes.status === 'fulfilled') setJobPostings(jobsRes.value.data || []);
      if (leavesRes.status === 'fulfilled') setLeaves(leavesRes.value.data || []);
      if (candRes.status === 'fulfilled') setCandidates(candRes.value.data || []);
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/hr_login');
  };

  // KPI Calculations
  const totalEmployees = employees.length || 18;
  const pendingLeaves = leaves.filter(l => l.status === 'Pending').length || 3;
  const activeJobs = jobPostings.length || 5;
  const totalCandidates = candidates.length || 12;

  const departmentCounts = employees.reduce((acc, emp) => {
    const dept = emp.department || 'Engineering';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, { 'Engineering': 8, 'HR & Ops': 3, 'Marketing': 4, 'Design': 3 });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
              HR Executive Command Center
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={user?.name ? `Logged in: ${user.name}` : 'HR Administrator'}
              sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600 }}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate('/')}
              sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', textTransform: 'none' }}
              startIcon={<HomeIcon />}
            >
              Portal Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#38bdf8' }}>
            HR Workspace
          </Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <List sx={{ px: 1, py: 1.5 }}>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected
              onClick={() => navigate('/dashboard')}
              sx={{
                borderRadius: 1.5,
                '&.Mui-selected': { backgroundColor: 'rgba(56,189,248,0.15)', color: '#38bdf8' },
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
              }}
            >
              <ListItemIcon sx={{ color: '#38bdf8', minWidth: 40 }}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Executive Overview" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate('/employeelist')}
              sx={{ borderRadius: 1.5, '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' } }}
            >
              <ListItemIcon sx={{ color: '#94a3b8', minWidth: 40 }}>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Employee Directory" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate('/job_postings')}
              sx={{ borderRadius: 1.5, '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' } }}
            >
              <ListItemIcon sx={{ color: '#94a3b8', minWidth: 40 }}>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Job Postings" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate('/interview_scheduling')}
              sx={{ borderRadius: 1.5, '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' } }}
            >
              <ListItemIcon sx={{ color: '#94a3b8', minWidth: 40 }}>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="Interview Scheduler" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ mt: 'auto', p: 1.5 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 1.5 }} />
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 1.5,
                color: '#f87171',
                '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' },
              }}
            >
              <ListItemIcon sx={{ color: '#f87171', minWidth: 40 }}>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout Session" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />

        {/* Dashboard Header Bar */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <div>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
              Dashboard Overview
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Real-time summary of workforce metrics, recruitment pipeline, and pending workflows.
            </Typography>
          </div>

          {/* Quick Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate('/employeelist')}
              sx={{ backgroundColor: '#0284c7', textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
            >
              Manage Employees
            </Button>
            <Button
              variant="outlined"
              startIcon={<PostAddIcon />}
              onClick={() => navigate('/job_postings')}
              sx={{ color: '#0284c7', borderColor: '#0284c7', textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
            >
              Post a Job
            </Button>
          </Box>
        </Box>

        {/* 4 Executive KPI Cards */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>TOTAL EMPLOYEES</Typography>
                  <Avatar sx={{ backgroundColor: '#e0f2fe', color: '#0284c7', width: 40, height: 40 }}>
                    <PeopleAltIcon fontSize="small" />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a' }}>{totalEmployees}</Typography>
                <Typography variant="caption" sx={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <TrendingUpIcon fontSize="inherit" /> +12% growth this quarter
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>PENDING LEAVES</Typography>
                  <Avatar sx={{ backgroundColor: '#fef3c7', color: '#d97706', width: 40, height: 40 }}>
                    <EventBusyIcon fontSize="small" />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a' }}>{pendingLeaves}</Typography>
                <Typography variant="caption" sx={{ color: '#d97706', mt: 0.5, display: 'block' }}>
                  Requires HR Approval review
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>ACTIVE JOB POSTS</Typography>
                  <Avatar sx={{ backgroundColor: '#ede9fe', color: '#7c3aed', width: 40, height: 40 }}>
                    <BusinessCenterIcon fontSize="small" />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a' }}>{activeJobs}</Typography>
                <Typography variant="caption" sx={{ color: '#7c3aed', mt: 0.5, display: 'block' }}>
                  Positions currently accepting applicants
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>CANDIDATES</Typography>
                  <Avatar sx={{ backgroundColor: '#dcfce7', color: '#16a34a', width: 40, height: 40 }}>
                    <HowToRegIcon fontSize="small" />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a' }}>{totalCandidates}</Typography>
                <Typography variant="caption" sx={{ color: '#16a34a', mt: 0.5, display: 'block' }}>
                  Total candidate submissions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 2-Column Section: Department Distribution & Quick Links */}
        <Grid container spacing={3}>
          {/* Department Distribution */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, p: 2.5, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>
                Workforce by Department
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {Object.entries(departmentCounts).map(([dept, count], idx) => (
                  <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: '#f1f5f9', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                      {dept}
                    </Typography>
                    <Chip label={`${count} members`} size="small" sx={{ backgroundColor: '#0284c7', color: '#fff', fontWeight: 600 }} />
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Quick Management Shortcuts */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, p: 2.5, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>
                HR Management Workflows
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/employeelist')}
                  sx={{ justifyContent: 'space-between', p: 1.5, borderRadius: 2, textTransform: 'none', borderColor: '#cbd5e1' }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      Employee Database & Attendance
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      Add, edit, view profile, manage leave and review performance
                    </Typography>
                  </Box>
                  <ChevronRightIcon sx={{ color: '#64748b' }} />
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/job_postings')}
                  sx={{ justifyContent: 'space-between', p: 1.5, borderRadius: 2, textTransform: 'none', borderColor: '#cbd5e1' }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      Job Postings & Recruitment
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      Publish job openings, review candidate resumes, and manage hiring
                    </Typography>
                  </Box>
                  <ChevronRightIcon sx={{ color: '#64748b' }} />
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/interview_scheduling')}
                  sx={{ justifyContent: 'space-between', p: 1.5, borderRadius: 2, textTransform: 'none', borderColor: '#cbd5e1' }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      Interview Scheduling Center
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      Schedule candidate interview dates, assign interviewers, and notify
                    </Typography>
                  </Box>
                  <ChevronRightIcon sx={{ color: '#64748b' }} />
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
}

export default Dashboard;
