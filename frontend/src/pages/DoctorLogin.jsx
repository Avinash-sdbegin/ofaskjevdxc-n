import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Lock, Mail, Eye, EyeOff, UserCheck, AlertCircle } from 'lucide-react';

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    hospital: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock doctor credentials (in production, this will be backend API)
  const validDoctors = [
    { email: 'doctor@aihealth.com', password: 'doctor123', name: 'Dr. Priya Sharma' },
    { email: 'dr.rajesh@aihealth.com', password: 'rajesh123', name: 'Dr. Rajesh Kumar' },
    { email: 'demo@doctor.com', password: 'demo123', name: 'Dr. Demo User' }
  ];

  // Available hospitals
  const hospitals = [
    'AIIMS Patna',
    'Indira Gandhi Institute of Medical Sciences (IGIMS)',
    'Patna Medical College Hospital (PMCH)',
    'Nalanda Medical College',
    'Apollo Hospital Patna',
    'Fortis Hospital Patna',
    'Paras HMRI Hospital',
    'Kurji Holy Family Hospital',
    'Anugrah Narayan Magadh Medical College'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const doctor = validDoctors.find(
        d => d.email === formData.email && d.password === formData.password
      );

      if (doctor && formData.hospital) {
        // Store doctor info in localStorage (in production, use proper auth tokens)
        localStorage.setItem('doctorAuth', JSON.stringify({
          isAuthenticated: true,
          name: doctor.name,
          email: doctor.email,
          hospital: formData.hospital
        }));
        
        // Navigate to doctor dashboard
        navigate('/doctor');
      } else {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@doctor.com',
      password: 'demo123',
      hospital: 'AIIMS Patna'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <Heart className="w-12 h-12 text-primary-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              AI HealthBridge
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Login</h1>
          <p className="text-gray-600">Access your patient dashboard</p>
        </div>

        {/* Login Card */}
        <div className="card">
          {/* Demo Credentials Info */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <UserCheck className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-primary-800 mb-1">Demo Credentials:</p>
                <p className="text-primary-700">Email: demo@doctor.com</p>
                <p className="text-primary-700">Password: demo123</p>
                <button
                  onClick={handleDemoLogin}
                  className="mt-2 text-primary-600 hover:text-primary-700 font-semibold underline"
                >
                  Click to auto-fill
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-danger-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-danger-800">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Hospital Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Hospital
              </label>
              <select
                required
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                className="input-field"
              >
                <option value="">Choose your hospital...</option>
                {hospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field pl-10"
                  placeholder="doctor@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Patient Link */}
          <div className="text-center">
            <p className="text-gray-600 mb-3">Are you a patient?</p>
            <Link to="/patient" className="btn-secondary w-full">
              Go to Patient Portal
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-primary-600 text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Additional Info */}
        <div className="card bg-gradient-to-r from-success-50 to-primary-50 mt-6">
          <h3 className="font-semibold mb-2 text-success-800">Registered Doctors</h3>
          <ul className="text-sm text-success-700 space-y-1">
            <li>✓ Access AI-prioritized patient queue</li>
            <li>✓ View detailed patient reports</li>
            <li>✓ AI-powered diagnosis assistance</li>
            <li>✓ Smart case management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
