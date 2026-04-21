import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import Doctors from './pages/Doctors/Doctors.jsx'
import Services from './pages/Services/Services.jsx'
import About from './pages/About/About.jsx'
import Appointment from './pages/Appointment/Appointment.jsx'
import Emergency from './pages/Emergency/Emergency.jsx'
import Auth from './pages/Auth/Auth.jsx'
import LabTests from './pages/LabTests/LabTests.jsx'
import Medicine from './pages/Medicine/Medicine.jsx'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/doctors', element: <Doctors /> },
      { path: '/appointment', element: <Appointment /> },
      { path: '/emergency', element: <Emergency /> },
      { path: '/lab-tests', element: <LabTests /> },
      { path: '/medicine', element: <Medicine /> },
      { path: '/services/lab-tests', element: <LabTests /> },
      { path: '/services/medicine', element: <Medicine /> },
      { path: '/login', element: <Auth type="login" /> },
      { path: '/register', element: <Auth type="register" /> }
    ]
  }
])
