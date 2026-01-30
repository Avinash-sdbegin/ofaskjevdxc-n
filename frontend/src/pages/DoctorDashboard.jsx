import { useState, useEffect } from 'react';
import { Users, TrendingUp, AlertTriangle, CheckCircle, Search, Filter, Building2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import PatientCard from '../components/PatientCard';
import StatsCard from '../components/StatsCard';

const DoctorDashboard = () => {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Get doctor info and appointments from localStorage
  useEffect(() => {
    const authData = localStorage.getItem('doctorAuth');
    if (authData) {
      setDoctorInfo(JSON.parse(authData));
    }

    // Load appointments from localStorage
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(savedAppointments);
  }, []);

  // Mock patient data with hospital appointments
  const allPatients = [
    {
      id: 'HC78905',
      name: 'Ramesh Kumar',
      age: 45,
      gender: 'Male',
      location: 'Patna, Bihar',
      hospital: 'AIIMS Patna',
      symptoms: ['Chest Pain', 'Shortness of Breath', 'Dizziness'],
      severity: 'High',
      riskScore: 87,
      submittedAt: '2 hours ago',
      hasImages: true,
      aiInsight: 'Possible cardiac event. Immediate attention required.',
      imageCount: 2
    },
    {
      id: 'HC78904',
      name: 'Sunita Devi',
      age: 38,
      gender: 'Female',
      location: 'Muzaffarpur, Bihar',
      hospital: 'AIIMS Patna',
      symptoms: ['Severe Headache', 'Blurred Vision', 'Nausea'],
      severity: 'High',
      riskScore: 82,
      submittedAt: '3 hours ago',
      hasImages: true,
      aiInsight: 'High blood pressure indicators. Urgent consultation needed.',
      imageCount: 1
    },
    {
      id: 'HC78903',
      name: 'Amit Singh',
      age: 52,
      gender: 'Male',
      location: 'Gaya, Bihar',
      hospital: 'Paras HMRI Hospital',
      symptoms: ['Persistent Cough', 'Fever', 'Fatigue'],
      severity: 'Medium',
      riskScore: 65,
      submittedAt: '5 hours ago',
      hasImages: true,
      aiInsight: 'Respiratory infection likely. Monitor for complications.',
      imageCount: 3
    },
    {
      id: 'HC78902',
      name: 'Priya Kumari',
      age: 29,
      gender: 'Female',
      location: 'Bhagalpur, Bihar',
      hospital: 'AIIMS Patna',
      symptoms: ['Skin Rash', 'Itching', 'Mild Fever'],
      severity: 'Medium',
      riskScore: 58,
      submittedAt: '8 hours ago',
      hasImages: true,
      aiInsight: 'Allergic reaction or dermatitis. Treatment recommended.',
      imageCount: 4
    },
    {
      id: 'HC78901',
      name: 'Rajesh Yadav',
      age: 34,
      gender: 'Male',
      location: 'Darbhanga, Bihar',
      hospital: 'Fortis Hospital Patna',
      symptoms: ['Mild Headache', 'Fatigue'],
      severity: 'Low',
      riskScore: 35,
      submittedAt: '1 day ago',
      hasImages: false,
      aiInsight: 'Minor symptoms. Rest and monitoring advised.',
      imageCount: 0
    },
    {
      id: 'HC78900',
      name: 'Kavita Sharma',
      age: 41,
      gender: 'Female',
      location: 'Sitamarhi, Bihar',
      hospital: 'AIIMS Patna',
      symptoms: ['Body Pain', 'Mild Fever'],
      severity: 'Low',
      riskScore: 42,
      submittedAt: '1 day ago',
      hasImages: false,
      aiInsight: 'Viral infection possible. Symptomatic treatment.',
      imageCount: 0
    }
  ];

  // Filter patients by doctor's hospital and doctor name
  // Combine mock data with real appointments
  const bookedPatients = appointments
    .filter(apt => apt.hospital === doctorInfo?.hospital && apt.doctorName === doctorInfo?.name)
    .map(apt => ({
      id: apt.id,
      name: apt.patientName,
      age: apt.patientAge,
      gender: apt.patientGender,
      location: apt.patientLocation,
      hospital: apt.hospital,
      symptoms: apt.symptoms,
      severity: apt.severity,
      riskScore: apt.riskScore,
      submittedAt: apt.submittedAt,
      hasImages: apt.hasImages,
      aiInsight: apt.aiInsight,
      imageCount: apt.imageCount,
      appointmentDate: apt.appointmentDate,
      appointmentTime: apt.appointmentTime,
      isBooked: true,
      isAIAllotted: apt.isAIAllotted,
      selectionMethod: apt.selectionMethod,
      bookedAt: apt.bookedAt
    }));

  const mockPatients = doctorInfo?.hospital 
    ? allPatients.filter(p => p.hospital === doctorInfo.hospital)
    : [];

  // Combine and sort by priority: AI-allotted first, then by risk score
  const patients = [...bookedPatients, ...mockPatients].sort((a, b) => {
    // First priority: AI allotted patients
    if (a.isAIAllotted && !b.isAIAllotted) return -1;
    if (!a.isAIAllotted && b.isAIAllotted) return 1;
    
    // Second priority: Risk score (higher score = higher priority)
    return b.riskScore - a.riskScore;
  });

  const filteredPatients = patients
    .filter(p => filterSeverity === 'all' || p.severity.toLowerCase() === filterSeverity)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 p.id.toLowerCase().includes(searchQuery.toLowerCase()));

  const stats = {
    total: patients.length,
    high: patients.filter(p => p.severity === 'High').length,
    medium: patients.filter(p => p.severity === 'Medium').length,
    low: patients.filter(p => p.severity === 'Low').length
  };

  return (
    <div className="min-h-screen">
      <Navbar userType="doctor" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">AI-Prioritized Patient Queue</p>
          {doctorInfo?.hospital && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-lg">
              <Building2 className="w-5 h-5 text-primary-600" />
              <span className="text-primary-800 font-semibold">{doctorInfo.hospital}</span>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Patients"
            value={stats.total}
            icon={Users}
            color="primary"
          />
          <StatsCard
            title="High Priority"
            value={stats.high}
            icon={AlertTriangle}
            color="danger"
            pulse
          />
          <StatsCard
            title="Medium Priority"
            value={stats.medium}
            icon={TrendingUp}
            color="warning"
          />
          <StatsCard
            title="Low Priority"
            value={stats.low}
            icon={CheckCircle}
            color="success"
          />
        </div>

        {/* Filters & Search */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by patient name or ID..."
                className="input-field pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                className="input-field"
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="space-y-4">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">No patients found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
