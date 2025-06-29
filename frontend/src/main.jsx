import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Profile from './components/Profile/Profile.jsx'
import Layout from './components/Layout.jsx'
import Home from './Page/Home.jsx'
import Project from './Page/Project/Project.jsx'
import BoardProjects from './Page/Project/BoardProjects.jsx'
import SingleProjectWrapper from './Page/Project/SingleProjectWrapper.jsx'
import NotFound from './Page/NotFound.jsx'
import ProjectCreate from './components/Project/ProjectCreate.jsx'
import ProjectUpdate from './components/Project/UpdateProject.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='project' element={<Project />}>
              <Route index element={<BoardProjects />} />
              <Route path=":id" element={<SingleProjectWrapper />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="project/create" element={<ProjectCreate />} />
            <Route path="project/:id/settings" element={<ProjectUpdate/>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
