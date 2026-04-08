import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import PatientDashboard from './pages/patient/PatientDashboard'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import PatientProfile from './pages/patient/components/PatientProfile'
import PatientMain from './pages/patient/components/PatientMain'
import Records from './pages/patient/components/Records'
import Settings from './pages/patient/components/Settings'
import Appointments from './pages/patient/components/Appointments'
import DoctorMain from './pages/doctor/components/DoctorMain'
import DoctorProfile from './pages/doctor/components/DoctorProfile'
import Schedules from './pages/doctor/components/Schedules'
import Patients from './pages/doctor/components/Patients'
import DocSettings from './pages/doctor/components/DocSettings'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMain from './pages/admin/components/AdminMain'
import Manage from './pages/admin/components/Manage'
import AdminSettings from './pages/admin/components/AdminSettings'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} >
        <Route index element={<AdminMain/>}/>
        <Route path="/admin/manage" element={<Manage />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        <Route path="/patient" element={<PatientDashboard />} >
        <Route index element={<PatientMain/>}/>
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/appointments" element={<Appointments />} />
        <Route path="/patient/records" element={<Records />} />
        <Route path="/patient/settings" element={<Settings />} />
        </Route>

        <Route path="/doctor" element={<DoctorDashboard />} >
        <Route index element={<DoctorMain/>}/>
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/doctor/schedules" element={<Schedules />} />
        <Route path="/doctor/patients" element={<Patients />} />
        <Route path="/doctor/settings" element={<DocSettings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
