# HR Management Dashboard - Frontend

## Overview

This is the frontend part of the HR Management Dashboard, a web application designed to manage various HR activities, 
such as employee management, attendance tracking, leave requests, recruitment, and more. 
The project is built using React.js for the frontend and is integrated with a Node.js backend and MongoDB database.

## Features

- **Employee Management**: Add, update, and delete employee details.
- **Attendance Tracking**: Record and display employee attendance data.
- **Leave Management**: Apply for and approve/reject leave requests.
- **Recruitment**: Manage job postings, candidate applications, and interview schedules.
- **Authentication**: Secure login and registration for HR admins.
- **Responsive Design**: Built using MUI and other CSS frameworks for a responsive UI.

## Tech Stack

- **Frontend**: React.js, MUI (Material-UI), Formik
- **State Management**: Redux/Context API (Specify if used)
- **HTTP Client**: Axios
- **Routing**: React Router
- **Form Validation**: Formik with Yup

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- A backend server to connect with the frontend

### Installation

For employee login the registration is done when the employee is added to the employee list.
Use that credential in Employee login.
for every enum mentioned in the backend dropdown the value is mentioned in the frontend dropdown.
 
 Hr Side action:
 * Hr can register
 * Hr can login
 * Hr can add employee , delete employee, edit employee.
 * Hr can enter attendance for a employee
 * Hr can Approve leave request.
 * Hr can can set the performance made by the employee in a particular project
 * Hr can post a job and the candidate can apply for the job
 * Hr can view the candidate list and candidate details and make contact throught the information given by the candidate
 * Hr can schedule the interview for the candidates

 Employee side action:
 * Employee can login with the credentials given by the hr while addig the employee in the employee list
 * Employee can apply for the leave
 * Employee can view the status of the leave

 Candidate side action:
 * Candidate can apply for the job
 * Candidate can view the interview schedule
 * While updating the details the resume should be a pdf link
 
