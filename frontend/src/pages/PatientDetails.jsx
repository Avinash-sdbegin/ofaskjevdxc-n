import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Phone, Calendar, FileText, Image as ImageIcon, Brain, Activity } from 'lucide-react';
import Navbar from '../components/Navbar';
import RiskScoreChart from '../components/RiskScoreChart';

const PatientDetails = () => {
  const { id } = useParams();

  // Mock patient data - in production, fetch based on ID
  const patient = {
    id: 'HC78905',
    name: 'Ramesh Kumar',
    age: 45,
    gender: 'Male',
    phone: '+91 98765 43210',
    location: 'Patna, Bihar',
    submittedAt: '2 Jan 2026, 10:30 AM',
    symptoms: ['Chest Pain', 'Shortness of Breath', 'Dizziness', 'Fatigue', 'Sweating'],
    duration: '3-7 days',
    severity: 'severe',
    medicalHistory: 'Hypertension for 5 years. Currently on Amlodipine 5mg. Father had heart attack at age 55.',
    riskScore: 87,
    priority: 'High',
    aiInsight: 'Possible cardiac event. Immediate attention required.',
    aiExplanation: 'The AI model detected high-risk indicators based on symptom combination (chest pain + shortness of breath + sweating), patient age, and medical history of hypertension. Family history of cardiac events increases risk further.',
    vitalSigns: {
      heartRate: 95,
      bloodPressure: '145/92',
      temperature: '37.2°C',
      oxygenLevel: 94
    },
    images: [
      { id: 1, type: 'ECG Report', url: '/mock-ecg.jpg' },
      { id: 2, type: 'Chest X-Ray', url: '/mock-xray.jpg' }
    ]
  };

  return (
    <div className="min-h-screen">
      <Navbar userType="doctor" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/doctor" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        {/* Patient Header */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">{patient.name}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <span>{patient.age} years • {patient.gender}</span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {patient.location}
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {patient.phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`badge-${patient.priority.toLowerCase()} text-lg px-4 py-2`}>
                {patient.priority} Priority
              </span>
              <span className="text-sm text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {patient.submittedAt}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Risk Assessment */}
            <div className="card border-2 border-danger-200 bg-danger-50">
              <div className="flex items-start gap-3 mb-4">
                <Brain className="w-6 h-6 text-danger-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-danger-800 mb-2">AI Risk Assessment</h2>
                  <p className="text-danger-700 font-semibold text-lg mb-3">{patient.aiInsight}</p>
                  <div className="bg-white rounded-lg p-4 border border-danger-200">
                    <p className="text-sm text-gray-700"><strong>AI Explanation:</strong> {patient.aiExplanation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Score Visualization */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Risk Score Analysis</h2>
              <RiskScoreChart score={patient.riskScore} />
            </div>

            {/* Symptoms */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary-600" />
                Reported Symptoms
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {patient.symptoms.map((symptom, index) => (
                    <div key={index} className="bg-primary-50 border border-primary-200 rounded-lg px-4 py-2 text-sm font-medium text-primary-700">
                      {symptom}
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <span className="text-gray-600 text-sm">Duration:</span>
                    <p className="font-semibold">{patient.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Severity Level:</span>
                    <p className="font-semibold capitalize">{patient.severity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Medical History
              </h2>
              <p className="text-gray-700 leading-relaxed">{patient.medicalHistory}</p>
            </div>

            {/* Medical Images */}
            {patient.images.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Medical Images ({patient.images.length})
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {patient.images.map((image) => (
                    <div key={image.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-400 transition-colors cursor-pointer">
                      <div className="bg-gray-100 h-48 rounded-lg mb-3 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="font-semibold text-center">{image.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="card bg-gray-50">
              <h2 className="text-xl font-bold mb-4">Doctor Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="btn-primary">Schedule Consultation</button>
                <button className="btn-secondary">Request More Info</button>
                <button className="btn-secondary">Mark as Reviewed</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vital Signs */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Vital Signs (Self-Reported)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Heart Rate</span>
                  <span className="font-semibold">{patient.vitalSigns.heartRate} bpm</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Blood Pressure</span>
                  <span className="font-semibold">{patient.vitalSigns.bloodPressure} mmHg</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Temperature</span>
                  <span className="font-semibold">{patient.vitalSigns.temperature}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Oxygen Level</span>
                  <span className="font-semibold">{patient.vitalSigns.oxygenLevel}%</span>
                </div>
              </div>
            </div>

            {/* Case Information */}
            <div className="card bg-primary-50 border-2 border-primary-200">
              <h3 className="text-lg font-bold mb-4 text-primary-800">Case Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-700">Case ID:</span>
                  <span className="font-semibold text-primary-900">{patient.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Status:</span>
                  <span className="font-semibold text-primary-900">Pending Review</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Priority:</span>
                  <span className="font-semibold text-danger-600">{patient.priority}</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="card bg-warning-50 border-2 border-warning-200">
              <h3 className="text-lg font-bold mb-3 text-warning-800">AI Recommendations</h3>
              <ul className="space-y-2 text-sm text-warning-900">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Immediate ECG recommended</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check cardiac enzyme levels</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Monitor blood pressure closely</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Consider emergency admission</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
