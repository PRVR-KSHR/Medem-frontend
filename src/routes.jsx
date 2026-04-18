import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import SimplePage from './pages/SimplePage/SimplePage.jsx'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <SimplePage title="About" hashFallback="about" /> },
      { path: '/services', element: <SimplePage title="Services" hashFallback="services" /> },
      { path: '/doctors', element: <SimplePage title="Doctors" hashFallback="doctors" /> },
      { path: '/blog', element: <SimplePage title="Blog" hashFallback="blog" /> },
      { path: '/contact', element: <SimplePage title="Contact" hashFallback="contact" /> }
    ]
  }
])
