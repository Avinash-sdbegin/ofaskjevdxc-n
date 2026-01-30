import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Search, Building2, MapPin, Star, Award, Calendar, ArrowRight, User } from 'lucide-react';
import Navbar from '../components/Navbar';

const DoctorSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectionMode, setSelectionMode] = useState(null); // 'ai' or 'manual'
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  useEffect(() => {
    const data = location.state?.patientData;
    const analysis = location.state?.aiAnalysis;
    setPatientData(data);
    setAiAnalysis(analysis);
  }, [location]);

  // Hospital data
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

  // Mock doctors data
  const allDoctors = [
    // AIIMS Patna
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialization: 'Cardiologist',
      hospital: 'AIIMS Patna',
      experience: '15 years',
      rating: 4.8,
      consultationFee: 800,
      availability: 'Available Today',
      patients: 2500,
      image: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Demo User',
      specialization: 'Internal Medicine',
      hospital: 'AIIMS Patna',
      experience: '10 years',
      rating: 4.9,
      consultationFee: 600,
      availability: 'Available Today',
      patients: 1800,
      image: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Dr. Amit Verma',
      specialization: 'Pulmonologist',
      hospital: 'AIIMS Patna',
      experience: '14 years',
      rating: 4.5,
      consultationFee: 700,
      availability: 'Available Tomorrow',
      patients: 1950,
      image: '👨‍⚕️'
    },
    {
      id: 4,
      name: 'Dr. Amresh Krishna',
      specialization: 'Nephrology Head',
      hospital: 'AIIMS Patna',
      experience: '20 years',
      rating: 4.9,
      consultationFee: 1000,
      availability: 'Available Today',
      patients: 3500,
      image: '👨‍⚕️'
    },
    {
      id: 5,
      name: 'Dr. Sanjeev Kumar',
      specialization: 'CTVS Surgeon',
      hospital: 'AIIMS Patna',
      experience: '18 years',
      rating: 4.8,
      consultationFee: 1200,
      availability: 'Available Tomorrow',
      patients: 2800,
      image: '👨‍⚕️'
    },
    {
      id: 6,
      name: 'Dr. Sagufta Naaz',
      specialization: 'Anaesthesiologist',
      hospital: 'AIIMS Patna',
      experience: '12 years',
      rating: 4.7,
      consultationFee: 700,
      availability: 'Available Today',
      patients: 2200,
      image: '👩‍⚕️'
    },
    
    // Indira Gandhi Institute of Medical Sciences (IGIMS)
    {
      id: 7,
      name: 'Dr. Sanjay Kumar',
      specialization: 'Community Medicine',
      hospital: 'Indira Gandhi Institute of Medical Sciences (IGIMS)',
      experience: '16 years',
      rating: 4.6,
      consultationFee: 500,
      availability: 'Monday',
      patients: 2100,
      image: '👨‍⚕️'
    },
    {
      id: 8,
      name: 'Dr. D.K. Bharti',
      specialization: 'Community Medicine',
      hospital: 'Indira Gandhi Institute of Medical Sciences (IGIMS)',
      experience: '14 years',
      rating: 4.5,
      consultationFee: 500,
      availability: 'Tuesday',
      patients: 1900,
      image: '👨‍⚕️'
    },
    {
      id: 9,
      name: 'Dr. S.K. Choudhary',
      specialization: 'Community Medicine',
      hospital: 'Indira Gandhi Institute of Medical Sciences (IGIMS)',
      experience: '15 years',
      rating: 4.7,
      consultationFee: 500,
      availability: 'Wednesday',
      patients: 2000,
      image: '👨‍⚕️'
    },
    {
      id: 10,
      name: 'Dr. Aman Kumar',
      specialization: 'Community Medicine',
      hospital: 'Indira Gandhi Institute of Medical Sciences (IGIMS)',
      experience: '11 years',
      rating: 4.6,
      consultationFee: 500,
      availability: 'Thursday',
      patients: 1800,
      image: '👨‍⚕️'
    },
    {
      id: 11,
      name: 'Dr. Setu Sinha',
      specialization: 'Community Medicine',
      hospital: 'Indira Gandhi Institute of Medical Sciences (IGIMS)',
      experience: '13 years',
      rating: 4.8,
      consultationFee: 500,
      availability: 'Friday',
      patients: 2200,
      image: '👩‍⚕️'
    },
    {
      id: 12,
      name: 'Dr. Jagjit Pandey',
      specialization: 'Surgical Oncologist',
      hospital: 'Indira Gandhi Institute of Medical Sciences (IGIMS)',
      experience: '17 years',
      rating: 4.9,
      consultationFee: 1100,
      availability: 'Available Today',
      patients: 2600,
      image: '👨‍⚕️'
    },
    
    // Patna Medical College Hospital (PMCH)
    {
      id: 13,
      name: 'Dr. Rajesh Kumar',
      specialization: 'General Physician',
      hospital: 'Patna Medical College Hospital (PMCH)',
      experience: '12 years',
      rating: 4.6,
      consultationFee: 400,
      availability: 'Available Today',
      patients: 3200,
      image: '👨‍⚕️'
    },
    {
      id: 14,
      name: 'Dr. Meera Jha',
      specialization: 'Gynaecologist',
      hospital: 'Patna Medical College Hospital (PMCH)',
      experience: '15 years',
      rating: 4.7,
      consultationFee: 600,
      availability: 'Available Today',
      patients: 2800,
      image: '👩‍⚕️'
    },
    {
      id: 15,
      name: 'Dr. Vijay Singh',
      specialization: 'Orthopaedic Surgeon',
      hospital: 'Patna Medical College Hospital (PMCH)',
      experience: '18 years',
      rating: 4.8,
      consultationFee: 700,
      availability: 'Available Tomorrow',
      patients: 2400,
      image: '👨‍⚕️'
    },
    {
      id: 16,
      name: 'Dr. Anita Kumari',
      specialization: 'Paediatrician',
      hospital: 'Patna Medical College Hospital (PMCH)',
      experience: '14 years',
      rating: 4.6,
      consultationFee: 500,
      availability: 'Available Today',
      patients: 3000,
      image: '👩‍⚕️'
    },
    {
      id: 17,
      name: 'Dr. Prakash Yadav',
      specialization: 'Dermatologist',
      hospital: 'Patna Medical College Hospital (PMCH)',
      experience: '10 years',
      rating: 4.5,
      consultationFee: 550,
      availability: 'Available Today',
      patients: 2100,
      image: '👨‍⚕️'
    },

    // Nalanda Medical College
    {
      id: 18,
      name: 'Dr. Ramesh Prasad',
      specialization: 'General Surgeon',
      hospital: 'Nalanda Medical College',
      experience: '16 years',
      rating: 4.7,
      consultationFee: 600,
      availability: 'Available Today',
      patients: 2300,
      image: '👨‍⚕️'
    },
    {
      id: 19,
      name: 'Dr. Kavita Singh',
      specialization: 'ENT Specialist',
      hospital: 'Nalanda Medical College',
      experience: '12 years',
      rating: 4.6,
      consultationFee: 500,
      availability: 'Available Tomorrow',
      patients: 1900,
      image: '👩‍⚕️'
    },
    {
      id: 20,
      name: 'Dr. Sunil Kumar',
      specialization: 'Psychiatrist',
      hospital: 'Nalanda Medical College',
      experience: '14 years',
      rating: 4.8,
      consultationFee: 700,
      availability: 'Available Today',
      patients: 1700,
      image: '👨‍⚕️'
    },
    {
      id: 21,
      name: 'Dr. Rekha Devi',
      specialization: 'Ophthalmologist',
      hospital: 'Nalanda Medical College',
      experience: '13 years',
      rating: 4.7,
      consultationFee: 550,
      availability: 'Available Today',
      patients: 2200,
      image: '👩‍⚕️'
    },
    {
      id: 22,
      name: 'Dr. Ajay Sharma',
      specialization: 'Radiologist',
      hospital: 'Nalanda Medical College',
      experience: '11 years',
      rating: 4.5,
      consultationFee: 650,
      availability: 'Available Tomorrow',
      patients: 1600,
      image: '👨‍⚕️'
    },

    // Apollo Hospital Patna
    {
      id: 23,
      name: 'Dr. Sunita Singh',
      specialization: 'Neurologist',
      hospital: 'Apollo Hospital Patna',
      experience: '18 years',
      rating: 4.9,
      consultationFee: 1200,
      availability: 'Available Today',
      patients: 2800,
      image: '👩‍⚕️'
    },
    {
      id: 24,
      name: 'Dr. Anil Mishra',
      specialization: 'Cardiologist',
      hospital: 'Apollo Hospital Patna',
      experience: '20 years',
      rating: 4.9,
      consultationFee: 1500,
      availability: 'Available Tomorrow',
      patients: 3200,
      image: '👨‍⚕️'
    },
    {
      id: 25,
      name: 'Dr. Ritu Verma',
      specialization: 'Endocrinologist',
      hospital: 'Apollo Hospital Patna',
      experience: '15 years',
      rating: 4.8,
      consultationFee: 1000,
      availability: 'Available Today',
      patients: 2400,
      image: '👩‍⚕️'
    },
    {
      id: 26,
      name: 'Dr. Manoj Kumar',
      specialization: 'Gastroenterologist',
      hospital: 'Apollo Hospital Patna',
      experience: '16 years',
      rating: 4.7,
      consultationFee: 1100,
      availability: 'Available Today',
      patients: 2200,
      image: '👨‍⚕️'
    },
    {
      id: 27,
      name: 'Dr. Priyanka Jha',
      specialization: 'Oncologist',
      hospital: 'Apollo Hospital Patna',
      experience: '14 years',
      rating: 4.8,
      consultationFee: 1300,
      availability: 'Available Tomorrow',
      patients: 2000,
      image: '👩‍⚕️'
    },

    // Fortis Hospital Patna
    {
      id: 28,
      name: 'Dr. Deepak Singh',
      specialization: 'Urologist',
      hospital: 'Fortis Hospital Patna',
      experience: '17 years',
      rating: 4.8,
      consultationFee: 1100,
      availability: 'Available Today',
      patients: 2300,
      image: '👨‍⚕️'
    },
    {
      id: 29,
      name: 'Dr. Neha Kumari',
      specialization: 'Rheumatologist',
      hospital: 'Fortis Hospital Patna',
      experience: '12 years',
      rating: 4.6,
      consultationFee: 900,
      availability: 'Available Today',
      patients: 1800,
      image: '👩‍⚕️'
    },
    {
      id: 30,
      name: 'Dr. Vikram Pandey',
      specialization: 'Nephrology',
      hospital: 'Fortis Hospital Patna',
      experience: '19 years',
      rating: 4.9,
      consultationFee: 1200,
      availability: 'Available Tomorrow',
      patients: 2600,
      image: '👨‍⚕️'
    },
    {
      id: 31,
      name: 'Dr. Shalini Rai',
      specialization: 'Diabetologist',
      hospital: 'Fortis Hospital Patna',
      experience: '13 years',
      rating: 4.7,
      consultationFee: 800,
      availability: 'Available Today',
      patients: 2100,
      image: '👩‍⚕️'
    },
    {
      id: 32,
      name: 'Dr. Ashok Kumar',
      specialization: 'Vascular Surgeon',
      hospital: 'Fortis Hospital Patna',
      experience: '16 years',
      rating: 4.8,
      consultationFee: 1000,
      availability: 'Available Today',
      patients: 1900,
      image: '👨‍⚕️'
    },

    // Paras HMRI Hospital
    {
      id: 33,
      name: 'Dr. Santosh Kumar',
      specialization: 'General Physician',
      hospital: 'Paras HMRI Hospital',
      experience: '12 years',
      rating: 4.6,
      consultationFee: 600,
      availability: 'Available Today',
      patients: 3200,
      image: '👨‍⚕️'
    },
    {
      id: 34,
      name: 'Dr. Anjali Sharma',
      specialization: 'Pulmonologist',
      hospital: 'Paras HMRI Hospital',
      experience: '14 years',
      rating: 4.7,
      consultationFee: 800,
      availability: 'Available Today',
      patients: 2400,
      image: '👩‍⚕️'
    },
    {
      id: 35,
      name: 'Dr. Rajiv Ranjan',
      specialization: 'Neurosurgeon',
      hospital: 'Paras HMRI Hospital',
      experience: '20 years',
      rating: 4.9,
      consultationFee: 1500,
      availability: 'Available Tomorrow',
      patients: 2200,
      image: '👨‍⚕️'
    },
    {
      id: 36,
      name: 'Dr. Pooja Singh',
      specialization: 'Obstetrics',
      hospital: 'Paras HMRI Hospital',
      experience: '15 years',
      rating: 4.8,
      consultationFee: 900,
      availability: 'Available Today',
      patients: 2800,
      image: '👩‍⚕️'
    },
    {
      id: 37,
      name: 'Dr. Binod Kumar',
      specialization: 'Emergency Medicine',
      hospital: 'Paras HMRI Hospital',
      experience: '11 years',
      rating: 4.5,
      consultationFee: 700,
      availability: 'Available Today',
      patients: 3500,
      image: '👨‍⚕️'
    },

    // Kurji Holy Family Hospital
    {
      id: 38,
      name: 'Dr. Thomas Joseph',
      specialization: 'Cardiologist',
      hospital: 'Kurji Holy Family Hospital',
      experience: '18 years',
      rating: 4.8,
      consultationFee: 900,
      availability: 'Available Today',
      patients: 2600,
      image: '👨‍⚕️'
    },
    {
      id: 39,
      name: 'Dr. Mary Francis',
      specialization: 'Gynaecologist',
      hospital: 'Kurji Holy Family Hospital',
      experience: '16 years',
      rating: 4.7,
      consultationFee: 700,
      availability: 'Available Today',
      patients: 2900,
      image: '👩‍⚕️'
    },
    {
      id: 40,
      name: 'Dr. John Peter',
      specialization: 'Orthopaedic Surgeon',
      hospital: 'Kurji Holy Family Hospital',
      experience: '14 years',
      rating: 4.6,
      consultationFee: 800,
      availability: 'Available Tomorrow',
      patients: 2100,
      image: '👨‍⚕️'
    },
    {
      id: 41,
      name: 'Dr. Sarah Matthew',
      specialization: 'Paediatrician',
      hospital: 'Kurji Holy Family Hospital',
      experience: '12 years',
      rating: 4.8,
      consultationFee: 600,
      availability: 'Available Today',
      patients: 3100,
      image: '👩‍⚕️'
    },
    {
      id: 42,
      name: 'Dr. David Samuel',
      specialization: 'General Surgeon',
      hospital: 'Kurji Holy Family Hospital',
      experience: '15 years',
      rating: 4.7,
      consultationFee: 750,
      availability: 'Available Today',
      patients: 2300,
      image: '👨‍⚕️'
    },

    // Anugrah Narayan Magadh Medical College
    {
      id: 43,
      name: 'Dr. Ramakant Jha',
      specialization: 'General Medicine',
      hospital: 'Anugrah Narayan Magadh Medical College',
      experience: '13 years',
      rating: 4.6,
      consultationFee: 400,
      availability: 'Available Today',
      patients: 2400,
      image: '👨‍⚕️'
    },
    {
      id: 44,
      name: 'Dr. Bharti Kumari',
      specialization: 'Dermatologist',
      hospital: 'Anugrah Narayan Magadh Medical College',
      experience: '11 years',
      rating: 4.5,
      consultationFee: 500,
      availability: 'Available Today',
      patients: 2000,
      image: '👩‍⚕️'
    },
    {
      id: 45,
      name: 'Dr. Ravi Shankar',
      specialization: 'ENT Specialist',
      hospital: 'Anugrah Narayan Magadh Medical College',
      experience: '14 years',
      rating: 4.7,
      consultationFee: 550,
      availability: 'Available Tomorrow',
      patients: 1900,
      image: '👨‍⚕️'
    },
    {
      id: 46,
      name: 'Dr. Kiran Devi',
      specialization: 'Psychiatrist',
      hospital: 'Anugrah Narayan Magadh Medical College',
      experience: '12 years',
      rating: 4.6,
      consultationFee: 600,
      availability: 'Available Today',
      patients: 1600,
      image: '👩‍⚕️'
    },
    {
      id: 47,
      name: 'Dr. Nitish Kumar',
      specialization: 'Ophthalmologist',
      hospital: 'Anugrah Narayan Magadh Medical College',
      experience: '10 years',
      rating: 4.5,
      consultationFee: 450,
      availability: 'Available Today',
      patients: 2100,
      image: '👨‍⚕️'
    }
  ];

  const getAIRecommendedDoctor = () => {
    // AI logic based on symptoms and risk level
    if (aiAnalysis?.riskLevel === 'High') {
      return allDoctors.find(d => d.specialization === 'Cardiologist') || allDoctors[0];
    } else if (aiAnalysis?.condition?.includes('Respiratory')) {
      return allDoctors.find(d => d.specialization === 'Pulmonologist') || allDoctors[4];
    } else {
      return allDoctors.find(d => d.specialization === 'General Physician') || allDoctors[1];
    }
  };

  const handleAIAllot = () => {
    const recommendedDoctor = getAIRecommendedDoctor();
    setSelectedDoctor(recommendedDoctor);
    navigate('/book-appointment', {
      state: {
        doctor: recommendedDoctor,
        patientData,
        aiAnalysis,
        isAIAllotted: true
      }
    });
  };

  const handleManualSelection = (doctor) => {
    setSelectedDoctor(doctor);
    navigate('/book-appointment', {
      state: {
        doctor,
        patientData,
        aiAnalysis,
        isAIAllotted: false
      }
    });
  };

  const filteredDoctors = selectedHospital 
    ? allDoctors.filter(d => d.hospital === selectedHospital)
    : allDoctors;

  if (!selectionMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">Choose Your Consultation Method</h1>
            <p className="text-gray-600 text-lg">Select how you'd like to connect with a doctor</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Allot Option */}
            <div 
              onClick={() => setSelectionMode('ai')}
              className="card hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-primary-500 group"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">AI Recommended</h3>
                <p className="text-gray-600 mb-6">
                  Our AI will automatically allot the best doctor based on your symptoms and condition
                </p>
                
                <div className="bg-primary-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-primary-800 mb-2">Benefits:</p>
                  <ul className="text-sm text-primary-700 space-y-1 text-left">
                    <li>✓ Instant doctor allocation</li>
                    <li>✓ AI-matched to your condition</li>
                    <li>✓ Best specialist selection</li>
                    <li>✓ Faster booking process</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <span className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold group-hover:bg-primary-700 transition-colors">
                    Quick & Smart
                  </span>
                </div>
              </div>
            </div>

            {/* Manual Selection Option */}
            <div 
              onClick={() => setSelectionMode('manual')}
              className="card hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-success-500 group"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-success-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Choose Yourself</h3>
                <p className="text-gray-600 mb-6">
                  Browse and select a specific doctor from your preferred hospital
                </p>
                
                <div className="bg-success-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-success-800 mb-2">Benefits:</p>
                  <ul className="text-sm text-success-700 space-y-1 text-left">
                    <li>✓ Choose your preferred hospital</li>
                    <li>✓ Select specific doctor</li>
                    <li>✓ View doctor profiles & ratings</li>
                    <li>✓ Compare consultation fees</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <span className="inline-block px-4 py-2 bg-success-600 text-white rounded-lg font-semibold group-hover:bg-success-700 transition-colors">
                    Your Choice
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI Allot Mode
  if (selectionMode === 'ai') {
    const recommendedDoctor = getAIRecommendedDoctor();
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button 
            onClick={() => setSelectionMode(null)}
            className="mb-6 text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← Back to Selection
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">AI Recommended Doctor</h1>
            <p className="text-gray-600">Based on your symptoms and condition</p>
          </div>

          {/* Recommended Doctor Card */}
          <div className="card bg-gradient-to-br from-white to-primary-50 border-2 border-primary-300 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold">
                AI RECOMMENDED
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{recommendedDoctor.rating}</span>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="text-6xl">{recommendedDoctor.image}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{recommendedDoctor.name}</h2>
                <p className="text-primary-600 font-semibold mb-2">{recommendedDoctor.specialization}</p>
                
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span>{recommendedDoctor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{recommendedDoctor.patients}+ patients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span>{recommendedDoctor.hospital}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-success-600 font-semibold">{recommendedDoctor.availability}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-primary-200">
                  <p className="text-sm text-gray-600 mb-1">Consultation Fee</p>
                  <p className="text-2xl font-bold text-primary-600">₹{recommendedDoctor.consultationFee}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Why this doctor?</strong> Based on your symptoms ({aiAnalysis?.condition}), 
                our AI recommends a {recommendedDoctor.specialization.toLowerCase()} for the best care.
              </p>
            </div>

            <button
              onClick={handleAIAllot}
              className="btn-primary w-full py-3 text-lg flex items-center justify-center gap-2"
            >
              Proceed to Book Appointment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Manual Selection Mode
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => setSelectionMode(null)}
          className="mb-6 text-primary-600 hover:text-primary-700 font-semibold"
        >
          ← Back to Selection
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Select Doctor & Hospital</h1>
          <p className="text-gray-600">Choose your preferred doctor and hospital</p>
        </div>

        {/* Hospital Filter */}
        <div className="card mb-6">
          <label className="block text-sm font-semibold mb-2">Filter by Hospital</label>
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="input-field"
          >
            <option value="">All Hospitals</option>
            {hospitals.map((hospital) => (
              <option key={hospital} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>
        </div>

        {/* Doctors List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{doctor.image}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{doctor.name}</h3>
                      <p className="text-primary-600 font-semibold">{doctor.specialization}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{doctor.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-success-600 font-semibold">{doctor.availability}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Consultation Fee</p>
                      <p className="text-xl font-bold text-primary-600">₹{doctor.consultationFee}</p>
                    </div>
                    <button
                      onClick={() => handleManualSelection(doctor)}
                      className="btn-primary px-6 py-2"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-500">No doctors found for selected hospital</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSelection;
