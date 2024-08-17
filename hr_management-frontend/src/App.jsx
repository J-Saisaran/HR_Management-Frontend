import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/login/Login'
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';
import EmployeeDetails from './components/Employee/EmployeeDetails';
import EmployeeFull from './components/Employee/EmployeeFull';
import PerformanceReview from './components/performance/PerformanceReview ';
import AttendanceRecords from './components/Employee/AttendanceRecords';
import LeaveRequests from './components/Employee/LeaveRequests';
import Home from './components/Home/Home'
import EmployeeLogin from './components/login/EmployeeLogin';
import Dashboard_Employee from './components/dashboard/Dashboard_Employee';
import EmployeeSideFull from './components/Employee/EmployeeSideFull';
import EmployeeLeaveSubmit from './components/Employee/EmployeeLeaveSubmit';
import Recruitment from './components/jobposting/Recruitment';
import JobPostings from './components/jobposting/JobPostings';
import CandidateApplication from './components/jobposting/CandidateApplications';
import InterviewScheduling from './components/jobposting/InterviewScheduling';
import { CssBaseline, Container, Box } from '@mui/material';
import Footer from './components/footer/Footer'; // Adjust the path as needed
import JobPostingsView from './components/jobposting/JobPostingsView';
import ApplyJob from './components/jobposting/ApplyJob';
import ApplicationStatus from './components/jobposting/ApplicationStatus';
import ViewInterviewSchedule from './components/jobposting/ViewInterviewSchedule';
import RecruitmentCandidate from './components/jobposting/RecruitmentCandidate';



function App() {
  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Container component="main" sx={{ flex: 1 }}>
        {/* Your routes or main content here */}
        <AuthProvider>
          <Router>

            <Routes>
              <Route path='/' element={<Home />}></Route>
              {/* Hr */}
              <Route path='/hr_login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/dashboard' element={<Dashboard />}></Route>
              <Route path='/employee_full/:id' element={<EmployeeFull />}></Route>
              <Route path='/employee_performance/:id' element={<PerformanceReview />}></Route>
              <Route path='/employee_leaverequest/:id' element={<LeaveRequests />}></Route>
              <Route path='/employee_attendance/:id' element={<AttendanceRecords />}></Route>
              <Route path='/employeelist' element={<EmployeeDetails />}></Route>
              <Route path='/recruitment' element={<Recruitment />}></Route>
              <Route path="/job_postings" element={<JobPostings />} />
              <Route path="/candidate_applications/:id" element={<CandidateApplication />} />
              <Route path="/interview_scheduling" element={<InterviewScheduling />} />
              {/* Employee */}
              <Route path='/employee_login' element={<EmployeeLogin />}></Route>
              <Route path='/dashboard_employee/:id' element={<Dashboard_Employee />}></Route>
              <Route path='/employee_side_full/:id' element={<EmployeeSideFull />}></Route>
              <Route path='/employee_leave_submit/:id' element={<EmployeeLeaveSubmit />}></Route>
              {/* Candidate */}
              <Route path="/job_postings_view" element={<JobPostingsView />} />
              <Route path="/apply/:jobId" element={<ApplyJob />} />
              <Route path="/application_status/:jobId" element={<ApplicationStatus />} />
              <Route path="/interview_schedule" element={<ViewInterviewSchedule />} />
            </Routes>

          </Router>
        </AuthProvider >
      </Container>
      <Footer />
    </Box>
  )
}

export default App