import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, User } from 'lucide-react';

const Navbar = ({ userType }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (userType === 'doctor') {
      localStorage.removeItem('doctorAuth');
      navigate('/doctor/login');
    } else {
      navigate('/');
    }
  };

  // Get doctor name from localStorage
  const doctorAuth = JSON.parse(localStorage.getItem('doctorAuth') || '{}');
  const doctorName = doctorAuth.name || 'Dr. Priya Sharma';

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              AI HealthBridge
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {userType === 'patient' && (
              <>
                <Link to="/patient" className="text-gray-700 hover:text-primary-600 font-medium">
                  Dashboard
                </Link>
                <Link to="/patient/ai-chatbot" className="text-gray-700 hover:text-primary-600 font-medium">
                  AI Chat
                </Link>
                <Link to="/patient/mri-analysis" className="text-gray-700 hover:text-primary-600 font-medium">
                  MRI Analysis
                </Link>
                <Link to="/hospital-finder" className="text-gray-700 hover:text-primary-600 font-medium">
                  Hospitals
                </Link>
              </>
            )}
            
            {userType === 'doctor' && (
              <>
                <Link to="/doctor" className="text-gray-700 hover:text-primary-600 font-medium">
                  Patient Queue
                </Link>
                <span className="text-gray-700 font-medium">{doctorName}</span>
              </>
            )}
            
            <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
              <User className="w-5 h-5" />
            </button>
            
            {userType && (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-danger-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
