import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Send, AlertCircle, CheckCircle, Phone, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    location: '',
    symptoms: [],
    duration: '',
    severity: '',
    medicalHistory: '',
    images: []
  });

  const [loading, setLoading] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  const commonSymptoms = [
    'Fever', 'Cough', 'Headache', 'Body Pain', 'Fatigue',
    'Chest Pain', 'Shortness of Breath', 'Nausea', 'Vomiting',
    'Diarrhea', 'Skin Rash', 'Dizziness', 'Loss of Appetite'
  ];

  // Emergency symptoms that require immediate attention
  const emergencySymptoms = ['Chest Pain', 'Shortness of Breath', 'Severe Bleeding'];

  // Check if it's an emergency situation
  const isEmergency = () => {
    const hasEmergencySymptom = formData.symptoms.some(symptom => 
      emergencySymptoms.includes(symptom)
    );
    const isSevere = formData.severity === 'severe';
    
    return hasEmergencySymptom || isSevere;
  };

  const handleSymptomToggle = (symptom) => {
    const updatedSymptoms = formData.symptoms.includes(symptom)
      ? formData.symptoms.filter(s => s !== symptom)
      : [...formData.symptoms, symptom];
    
    setFormData(prev => ({
      ...prev,
      symptoms: updatedSymptoms
    }));

    // Check for emergency:
    // 1. Chest Pain AND Shortness of Breath together, OR
    // 2. Shortness of Breath with 2 or more other symptoms (total 3+)
    const hasChestPainAndBreathing = updatedSymptoms.includes('Chest Pain') && updatedSymptoms.includes('Shortness of Breath');
    const hasBreathingWithMultiple = updatedSymptoms.includes('Shortness of Breath') && updatedSymptoms.length >= 3;
    
    const hasEmergency = hasChestPainAndBreathing || hasBreathingWithMultiple;
    setShowEmergencyAlert(hasEmergency);
  };

  const handleSeverityChange = (severity) => {
    setFormData(prev => ({ ...prev, severity }));
    
    // Check for emergency if severe
    if (severity === 'severe') {
      setShowEmergencyAlert(true);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if emergency - redirect directly to emergency page
    if (isEmergency()) {
      localStorage.setItem('lastSymptomCheck', JSON.stringify(formData));
      navigate('/emergency', { 
        state: { 
          patientData: formData,
          fromSymptomChecker: true 
        } 
      });
      return;
    }
    
    setLoading(true);
    
    // Save to localStorage
    localStorage.setItem('lastSymptomCheck', JSON.stringify(formData));
    
    // Simulate API call and navigate to results
    setTimeout(() => {
      setLoading(false);
      navigate('/symptom-results', { state: { patientData: formData } });
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/patient" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="card">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Symptom Checker</h1>
            <p className="text-gray-600">
              Fill in your details and symptoms. Our AI will analyze and prioritize your case.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Age *</label>
                  <input
                    type="number"
                    required
                    className="input-field"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender *</label>
                  <select
                    required
                    className="input-field"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="input-field"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, District, State"
                  />
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                Select Your Symptoms
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.symptoms.includes(symptom)
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-semibold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Duration *</label>
                <select
                  required
                  className="input-field"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                >
                  <option value="">How long have you had symptoms?</option>
                  <option value="1-2 days">1-2 days</option>
                  <option value="3-7 days">3-7 days</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="more than 2 weeks">More than 2 weeks</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Severity Level *</label>
                <select
                  required
                  className="input-field"
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                >
                  <option value="">Rate your discomfort</option>
                  <option value="mild">Mild (manageable)</option>
                  <option value="moderate">Moderate (affecting daily life)</option>
                  <option value="severe">Severe (very painful/difficult)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Medical History (Optional)</label>
              <textarea
                className="input-field"
                rows="3"
                value={formData.medicalHistory}
                onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                placeholder="Any chronic diseases, allergies, or ongoing medications..."
              ></textarea>
            </div>

            {/* Emergency Alert */}
            {showEmergencyAlert && (
              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mt-4">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="text-red-600 w-12 h-12 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-700 mb-2">🚨 EMERGENCY DETECTED</h3>
                    <p className="text-red-800 mb-4">
                      Your symptoms indicate a potentially serious medical emergency. Please seek immediate medical attention.
                    </p>
                    <div className="bg-white rounded-lg p-4 mb-4 border border-red-300">
                      <p className="text-lg font-semibold text-red-700 mb-2">Emergency Ambulance Service</p>
                      <a href="tel:108" className="flex items-center text-3xl font-bold text-red-600 hover:text-red-700">
                        <Phone className="w-8 h-8 mr-3" />
                        108
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Toll-Free 24/7 Emergency Number</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/emergency')}
                      className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center"
                    >
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Go to Emergency Assessment Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">3</span>
                Upload Medical Images (Optional)
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload X-rays, skin photos, wound images, etc.</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="btn-secondary cursor-pointer">
                  Choose Files
                </label>
                {formData.images.length > 0 && (
                  <p className="mt-4 text-sm text-primary-600 font-medium">
                    {formData.images.length} file(s) selected
                  </p>
                )}
              </div>
            </div>

            {/* Alert */}
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-warning-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-warning-800">
                <p className="font-semibold mb-1">Important Notice</p>
                <p>This is an AI-assisted screening tool. It does not replace professional medical advice. In case of emergency, please call 108 or visit the nearest hospital immediately.</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || formData.symptoms.length === 0}
              className="btn-primary w-full py-4 text-lg flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit for AI Analysis
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
