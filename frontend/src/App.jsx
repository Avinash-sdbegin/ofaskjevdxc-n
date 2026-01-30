import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorLogin from './pages/DoctorLogin';
import HospitalLogin from './pages/HospitalLogin';
import HospitalDashboard from './pages/HospitalDashboard';
import SymptomChecker from './pages/SymptomChecker';
import SymptomResults from './pages/SymptomResults';
import DoctorSelection from './pages/DoctorSelection';
import BookAppointment from './pages/BookAppointment';
import PatientDetails from './pages/PatientDetails';
import AIChatbot from './pages/AIChatbot';
import MRIAnalysis from './pages/MRIAnalysis';
import HospitalFinder from './pages/HospitalFinder';
import EmergencyAssessment from './pages/EmergencyAssessment';
import EDoctorConsultation from './pages/EDoctorConsultation';

// Protected Route Component
const ProtectedDoctorRoute = ({ children }) => {
  const doctorAuth = JSON.parse(localStorage.getItem('doctorAuth') || '{}');
  
  if (!doctorAuth.isAuthenticated) {
    return <Navigate to="/doctor/login" replace />;
  }
  
  return children;
};

const ProtectedHospitalRoute = ({ children }) => {
  const hospitalAuth = JSON.parse(localStorage.getItem('hospitalAuth') || 'null');
  
  if (!hospitalAuth) {
    return <Navigate to="/hospital/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/check-symptoms" element={<SymptomChecker />} />
          <Route path="/symptom-results" element={<SymptomResults />} />
          <Route path="/doctor-selection" element={<DoctorSelection />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/patient/ai-chatbot" element={<AIChatbot />} />
          <Route path="/patient/mri-analysis" element={<MRIAnalysis />} />
          <Route path="/mri-analysis" element={<MRIAnalysis />} />
          <Route path="/hospital-finder" element={<HospitalFinder />} />
          <Route path="/emergency" element={<EmergencyAssessment />} />
          <Route path="/e-doctor" element={<EDoctorConsultation />} />
          
          {/* Doctor Routes - Protected */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route 
            path="/doctor" 
            element={
              <ProtectedDoctorRoute>
                <DoctorDashboard />
              </ProtectedDoctorRoute>
            } 
          />
          <Route 
            path="/doctor/patient/:id" 
            element={
              <ProtectedDoctorRoute>
                <PatientDetails />
              </ProtectedDoctorRoute>
            } 
          />

          {/* Hospital Routes - Protected */}
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route 
            path="/hospital/dashboard" 
            element={
              <ProtectedHospitalRoute>
                <HospitalDashboard />
              </ProtectedHospitalRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
