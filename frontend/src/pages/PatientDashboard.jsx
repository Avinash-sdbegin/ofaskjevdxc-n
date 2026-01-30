import { Link } from 'react-router-dom';
import { Activity, FileText, Bell, User, Clock, TrendingUp, AlertTriangle, Phone, Search, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
// Feedback and rating system

// Multi-language translations
const translations = {
  en: {
    welcome: 'Welcome Back!',
    trackHealth: 'Track your health and get AI-powered insights',
    emergency: 'Emergency? Get Help Now!',
    emergencyDesc: 'AI-powered critical care decision in seconds',
    trackAppointment: 'Track Your Appointment',
    enterAppointment: 'Enter your Appointment ID to check status',
    searchPlaceholder: 'Enter Appointment ID (e.g., APPT12345678)',
    trackBtn: 'Track Appointment',
    healthTips: 'Daily Health Tips',
    feedback: 'Feedback & Rating',
    medicine: 'Medicine Reminders & Tracking',
    addMedicine: 'Add Medicine',
    currentMedicines: 'Current Medicines',
    noMedicines: 'No medicines added yet.',
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    wellBeing: 'We wish you good health and well-being',
    hindi: 'Hindi',
    english: 'English',
    language: 'Language',
    markTaken: 'Mark as Taken',
    healthTipsArr: [
      'Drink at least 8 glasses of water daily',
      'Get 7-8 hours of sleep every night',
      'Exercise for at least 30 minutes daily',
      'Regular health checkups are important'
    ],
    doctorName: "Doctor Name",
    doctorPlaceholder: "Enter Doctor's Name (optional)",
    hospitalName: "Hospital Name",
    hospitalPlaceholder: "Enter Hospital Name (optional)",
    yourFeedback: "Your Feedback",
    feedbackPlaceholder: "Write your feedback...",
    rating: "Rating",
    submitFeedback: "Submit Feedback",
    recentFeedbacks: "Recent Feedbacks",
    noFeedbacks: "No feedbacks yet.",
    medicineName: "Medicine Name",
    medicineNamePlaceholder: "Enter medicine name",
    dosage: "Dosage",
    dosagePlaceholder: "e.g. 500mg",
    timing: "Timing",
    timingPlaceholder: "e.g. 8:00 AM, 2:00 PM",
    duration: "Duration",
    durationPlaceholder: "e.g. 5 days",
    taken: "Taken",
  },
  hi: {
    welcome: 'वापसी पर स्वागत है!',
    trackHealth: 'अपना स्वास्थ्य ट्रैक करें और एआई-आधारित सलाह पाएं',
    emergency: 'आपातकाल? तुरंत सहायता पाएं!',
    emergencyDesc: 'सेकंडों में एआई-आधारित क्रिटिकल केयर निर्णय',
    trackAppointment: 'अपॉइंटमेंट ट्रैक करें',
    enterAppointment: 'अपॉइंटमेंट आईडी डालें और स्थिति देखें',
    searchPlaceholder: 'अपॉइंटमेंट आईडी डालें (जैसे, APPT12345678)',
    trackBtn: 'अपॉइंटमेंट ट्रैक करें',
    healthTips: 'दैनिक स्वास्थ्य सुझाव',
    feedback: 'प्रतिक्रिया और रेटिंग',
    medicine: 'दवा अनुस्मारक और ट्रैकिंग',
    addMedicine: 'दवा जोड़ें',
    currentMedicines: 'वर्तमान दवाएं',
    noMedicines: 'कोई दवा नहीं जोड़ी गई है।',
    notifications: 'सूचनाएं',
    noNotifications: 'कोई नई सूचना नहीं',
    wellBeing: 'हम आपके मंगल स्वास्थ्य की कामना करते हैं',
    hindi: 'हिन्दी',
    english: 'अंग्रेज़ी',
    language: 'भाषा',
    markTaken: 'ले लिया',
    healthTipsArr: [
      'रोज़ कम से कम 8 गिलास पानी पिएं',
      'हर रात 7-8 घंटे की नींद लें',
      'रोज़ कम से कम 30 मिनट व्यायाम करें',
      'नियमित स्वास्थ्य जांच ज़रूरी है'
    ],
    doctorName: "डॉक्टर का नाम",
    doctorPlaceholder: "डॉक्टर का नाम दर्ज करें (वैकल्पिक)",
    hospitalName: "अस्पताल का नाम",
    hospitalPlaceholder: "अस्पताल का नाम दर्ज करें (वैकल्पिक)",
    yourFeedback: "आपकी प्रतिक्रिया",
    feedbackPlaceholder: "अपनी प्रतिक्रिया लिखें...",
    rating: "रेटिंग",
    submitFeedback: "प्रतिक्रिया सबमिट करें",
    recentFeedbacks: "हाल की प्रतिक्रियाएं",
    noFeedbacks: "कोई प्रतिक्रिया नहीं।",
    medicineName: "दवा का नाम",
    medicineNamePlaceholder: "दवा का नाम दर्ज करें",
    dosage: "मात्रा",
    dosagePlaceholder: "जैसे 500mg",
    timing: "समय",
    timingPlaceholder: "जैसे 8:00 AM, 2:00 PM",
    duration: "अवधि",
    durationPlaceholder: "जैसे 5 दिन",
    taken: "ले लिया",
  }
};

const PatientDashboard = () => {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    lastCheckup: 'N/A',
    completed: 0
  });

  // Feedback and rating system state
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');

  // Medicine reminders and tracking state
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [timing, setTiming] = useState('');
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('en');
  const t = translations[language];
  const healthTips = t.healthTipsArr;

  useEffect(() => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const now = new Date();
    const upcoming = appointments.filter(apt => new Date(`${apt.appointmentDate} ${apt.appointmentTime}`) > now);
    const completed = appointments.filter(apt => new Date(`${apt.appointmentDate} ${apt.appointmentTime}`) <= now);
    const lastAppt = appointments.length > 0 
      ? appointments.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))[0]
      : null;
    
    const lastCheckupText = lastAppt 
      ? (() => {
          const bookedDate = new Date(lastAppt.bookedAt);
          const diffDays = Math.floor((now - bookedDate) / (1000 * 60 * 60 * 24));
          if (diffDays === 0) return 'Today';
          if (diffDays === 1) return 'Yesterday';
          return `${diffDays} days ago`;
        })()
      : 'N/A';
    
    setStats({
      total: appointments.length,
      upcoming: upcoming.length,
      lastCheckup: lastCheckupText,
      completed: completed.length
    });
    
    const recent = appointments
      .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
      .slice(0, 3)
      .map(apt => ({
        id: apt.id,
        date: new Date(apt.bookedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: apt.status,
        severity: apt.severity,
        doctor: apt.doctorName,
        appointmentDate: apt.appointmentDate,
        appointmentTime: apt.appointmentTime,
        hospital: apt.hospital
      }));
    
    setRecentAppointments(recent);

    const notifs = appointments
      .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
      .map(apt => ({
        id: apt.id,
        title: `Appointment ${apt.status}`,
        message: `${apt.consultationType === 'video' ? 'Video' : 'In-person'} consultation with ${apt.doctorName}`,
        date: apt.appointmentDate,
        time: apt.appointmentTime,
        type: apt.status === 'Confirmed' ? 'success' : 'info'
      }));
    
    setNotifications(notifs);
    // Load feedbacks from localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    setFeedbacks(storedFeedbacks);
    // Load medicines from localStorage
    const storedMeds = JSON.parse(localStorage.getItem('medicines') || '[]');
    setMedicines(storedMeds);
  }, []);

  // Handle feedback submit
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim() || rating < 1 || (!selectedDoctor && !selectedHospital)) return;
    const newFeedback = {
      id: Date.now(),
      doctor: selectedDoctor,
      hospital: selectedHospital,
      text: feedbackText,
      rating,
      date: new Date().toLocaleString()
    };
    const updatedFeedbacks = [newFeedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
    setFeedbackText('');
    setRating(0);
    setSelectedDoctor('');
    setSelectedHospital('');
  };

  // Handle medicine add
  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!medicineName.trim() || !dosage.trim() || !timing.trim() || !duration.trim()) return;
    const newMed = {
      id: Date.now(),
      name: medicineName,
      dosage,
      timing,
      duration,
      taken: false
    };
    const updatedMeds = [newMed, ...medicines];
    setMedicines(updatedMeds);
    localStorage.setItem('medicines', JSON.stringify(updatedMeds));
    setMedicineName('');
    setDosage('');
    setTiming('');
    setDuration('');
  };

  // Mark medicine as taken
  const handleMarkTaken = (id) => {
    const updatedMeds = medicines.map(med =>
      med.id === id ? { ...med, taken: true } : med
    );
    setMedicines(updatedMeds);
    localStorage.setItem('medicines', JSON.stringify(updatedMeds));
  };

  const handleTrackCase = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    const foundAppointment = appointments.find(apt => 
      apt.id.toUpperCase() === searchId.toUpperCase()
    );

    if (foundAppointment) {
      const bookedDate = new Date(foundAppointment.bookedAt);
      const validUntil = new Date(bookedDate);
      validUntil.setDate(validUntil.getDate() + 7);
      const isValid = new Date() <= validUntil;

      const appointmentDateTime = new Date(`${foundAppointment.appointmentDate} ${foundAppointment.appointmentTime}`);
      const isCompleted = new Date() > appointmentDateTime;

      setSearchResult({
        id: foundAppointment.id,
        date: new Date(foundAppointment.bookedAt).toLocaleString(),
        status: foundAppointment.status,
        severity: foundAppointment.severity,
        doctor: foundAppointment.doctorName,
        hospital: foundAppointment.hospital,
        appointmentDate: foundAppointment.appointmentDate,
        appointmentTime: foundAppointment.appointmentTime,
        consultationType: foundAppointment.consultationType,
        symptoms: foundAppointment.symptoms,
        aiAnalysis: foundAppointment.aiInsight,
        nextAction: `Your ${foundAppointment.consultationType} consultation is scheduled`,
        prescription: foundAppointment.prescription || null,
        totalPaid: foundAppointment.totalPaid,
        isAIAllotted: foundAppointment.isAIAllotted,
        selectionMethod: foundAppointment.selectionMethod,
        validUntil: validUntil.toLocaleDateString(),
        isValid: isValid,
        isCompleted: isCompleted,
        doctorAccepted: foundAppointment.doctorAccepted !== false,
        transferredTo: foundAppointment.transferredTo || null,
        consultationStatus: isCompleted ? 'Completed' : 'Upcoming',
        prescriptionDetails: foundAppointment.prescriptionDetails || null
      });
    } else {
      const mockDatabase = {
        'HC78901': {
          id: 'HC78901',
          date: '2 Jan 2026, 10:30 AM',
          status: 'Under Review',
          severity: 'Medium',
          doctor: 'Dr. Priya Sharma',
          symptoms: ['Fever', 'Cough', 'Headache'],
          aiAnalysis: 'Possible viral infection. Monitoring required.',
          nextAction: 'Doctor will review within 2 hours',
          prescription: null
    },
        'HC78890': {
          id: 'HC78890',
          date: '28 Dec 2025, 3:45 PM',
          status: 'Reviewed',
          severity: 'Low',
          doctor: 'Dr. Rajesh Kumar',
          symptoms: ['Body Pain', 'Fatigue'],
          aiAnalysis: 'Mild symptoms. Rest recommended.',
          nextAction: 'Follow prescribed medication',
          prescription: 'Paracetamol 500mg, 3 times daily for 3 days'
        }
      };
      const result = mockDatabase[searchId.toUpperCase()];
      if (result) {
        setSearchResult(result);
      } else {
        setSearchResult({
          id: searchId,
          error: true,
          message: 'Appointment not found. Please check your Appointment ID and try again.'
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar userType="patient" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <label className="mr-2 font-semibold">{t.language}:</label>
          <select
            className="input-field px-2 py-1 border rounded"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            <option value="en">{t.english}</option>
            <option value="hi">{t.hindi}</option>
          </select>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-danger-600 to-orange-600 text-white rounded-xl p-6 mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-12 h-12 animate-pulse" />
              <div>
                <h2 className="text-2xl font-bold mb-1">{t.emergency}</h2>
                <p className="text-danger-100">{t.emergencyDesc}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/emergency" className="bg-white text-danger-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                {t.emergency}
              </Link>
              <a href="tel:108" className="bg-danger-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-danger-800 transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call 108
              </a>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t.welcome}</h1>
          <p className="text-gray-600">{t.trackHealth}</p>
        </div>

        {/* Track Case Section */}
        <div className="mb-8">
          <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{t.trackAppointment}</h2>
                <p className="text-gray-600">{t.enterAppointment}</p>
              </div>
            </div>

            <form onSubmit={handleTrackCase} className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="input-field flex-1 text-lg"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
              />
              <button type="submit" className="btn-primary px-8 whitespace-nowrap">
                {t.trackBtn}
              </button>
            </form>

            {/* Search Result */}
            {searchResult && (
              searchResult.error ? (
                <div className="bg-danger-50 border-2 border-danger-300 rounded-lg p-4">
                  <p className="text-danger-700 font-semibold">❌ {searchResult.message}</p>
                </div>
              ) : (
                <div className="bg-white border-2 border-primary-400 rounded-lg p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Appointment ID: {searchResult.id}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Booked: {searchResult.date}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                        searchResult.status === 'Confirmed' ? 'bg-success-100 text-success-700' :
                        searchResult.consultationStatus === 'Completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-warning-100 text-warning-700'
                      }`}>
                        {searchResult.consultationStatus || searchResult.status}
                      </span>
                      {!searchResult.isValid && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-danger-100 text-danger-700">
                          Expired
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Doctor Status */}
                  <div className="mb-4">
                    {searchResult.doctorAccepted ? (
                      <div className="bg-success-50 border-2 border-success-300 rounded-lg p-4">
                        <p className="font-semibold text-success-800 flex items-center">
                          ✅ Your preferred doctor has accepted this appointment
                        </p>
                        {searchResult.selectionMethod === 'AI Recommended' && (
                          <p className="text-xs text-success-700 mt-1">
                            🤖 This doctor was recommended by AI based on your symptoms
                          </p>
                        )}
                      </div>
                    ) : searchResult.transferredTo ? (
                      <div className="bg-warning-50 border-2 border-warning-300 rounded-lg p-4">
                        <p className="font-semibold text-warning-800">
                          🔄 Transferred to: {searchResult.transferredTo}
                        </p>
                        <p className="text-xs text-warning-700 mt-1">
                          Your appointment has been transferred to another specialist for better care
                        </p>
                      </div>
                    ) : (
                      <div className="bg-primary-50 border-2 border-primary-300 rounded-lg p-4">
                        <p className="font-semibold text-primary-800">
                          ⏳ Pending doctor confirmation
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {searchResult.appointmentDate && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Scheduled Time</p>
                        <p className="font-bold text-lg text-primary-600">
                          {new Date(searchResult.appointmentDate).toLocaleDateString()} at {searchResult.appointmentTime}
                        </p>
                      </div>
                    )}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Valid Until</p>
                      <p className={`font-bold text-lg ${searchResult.isValid ? 'text-success-600' : 'text-danger-600'}`}>
                        {searchResult.validUntil}
                      </p>
                    </div>
                    {searchResult.consultationType && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Consultation Type</p>
                        <p className="font-bold text-lg capitalize">{searchResult.consultationType}</p>
                      </div>
                    )}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Doctor</p>
                      <p className="font-bold text-lg flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-600" />
                        {searchResult.doctor}
                      </p>
                    </div>
                    {searchResult.hospital && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Hospital</p>
                        <p className="font-bold text-lg">{searchResult.hospital}</p>
                      </div>
                    )}
                    {searchResult.totalPaid && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Amount Paid</p>
                        <p className="font-bold text-lg text-success-600">₹{searchResult.totalPaid}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Prescription Section - Show if consultation completed */}
                    {searchResult.isCompleted && searchResult.prescriptionDetails ? (
                      <div className="bg-gradient-to-r from-success-50 to-green-50 border-2 border-success-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">💊</span>
                          <p className="font-bold text-success-900 text-lg">Prescription Details</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 space-y-3">
                          {searchResult.prescriptionDetails.medicines?.map((med, idx) => (
                            <div key={idx} className="border-b border-gray-200 pb-2 last:border-0">
                              <p className="font-semibold text-gray-800">{med.name}</p>
                              <div className="text-sm text-gray-600 mt-1 grid grid-cols-2 gap-2">
                                <span>📋 Dosage: {med.dosage}</span>
                                <span>⏰ Timing: {med.timing}</span>
                                <span>📅 Duration: {med.duration}</span>
                              </div>
                              {med.instructions && (
                                <p className="text-xs text-gray-500 mt-1 italic">ℹ️ {med.instructions}</p>
                              )}
                            </div>
                          ))}
                          {searchResult.prescriptionDetails.advice && (
                            <div className="bg-blue-50 rounded p-3 mt-3">
                              <p className="text-sm font-semibold text-blue-900">Doctor's Advice:</p>
                              <p className="text-sm text-blue-800 mt-1">{searchResult.prescriptionDetails.advice}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : searchResult.isCompleted ? (
                      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                        <p className="font-semibold text-warning-900 mb-2">⚠️ Consultation Completed</p>
                        <p className="text-warning-800 text-sm">Prescription will be available soon. Check back later or contact the hospital.</p>
                      </div>
                    ) : null}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="font-semibold text-blue-900 mb-2">🤖 AI Analysis:</p>
                      <p className="text-blue-800">{searchResult.aiAnalysis}</p>
                    </div>

                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <p className="font-semibold text-primary-900 mb-2">📋 Status:</p>
                      <p className="text-primary-800">
                        {searchResult.isCompleted 
                          ? `Consultation completed on ${new Date(searchResult.appointmentDate).toLocaleDateString()}`
                          : searchResult.nextAction}
                      </p>
                    </div>

                    {searchResult.symptoms && searchResult.symptoms.length > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-2">🩺 Reported Symptoms:</p>
                        <div className="flex flex-wrap gap-2">
                          {searchResult.symptoms.map((symptom, idx) => (
                            <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-300">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {searchResult.status === 'AI Analysis Complete' && (
                    <div className="mt-4 bg-warning-50 border-2 border-warning-300 rounded-lg p-4">
                      <p className="text-warning-800 font-semibold">
                        ⏰ Your case is in queue. Doctor will review shortly. We'll send you SMS/Email notification.
                      </p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Well-being Quote Strip */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center shadow-md">
            <p className="text-2xl font-bold text-orange-800">
              {language === 'hi' ? t.wellBeing : 'हम आपके मंगल स्वास्थ्य की कामना करते हैं'}
            </p>
            <p className="text-sm text-orange-600 mt-1 italic">
              {language === 'hi' ? 'We wish you good health and well-being' : t.wellBeing}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/patient/check-symptoms" className="card hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <Activity className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t.trackHealth}</h3>
            <p className="opacity-90">AI symptom analysis</p>
          </Link>

          <Link to="/patient/ai-chatbot" className="card hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">AI Chatbot</h3>
            <p className="opacity-90">Talk to AI assistant</p>
          </Link>

          <Link to="/patient/mri-analysis" className="card hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">MRI Analysis</h3>
            <p className="opacity-90">Upload medical scans</p>
          </Link>

          <Link to="/hospital-finder" className="card hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-success-500 to-success-600 text-white">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Find Hospitals</h3>
            <p className="opacity-90">Nearby hospitals</p>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Appointments</span>
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-primary-600">{stats.total}</div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Upcoming</span>
              <Clock className="w-5 h-5 text-warning-600" />
            </div>
            <div className="text-3xl font-bold text-warning-600">{stats.upcoming}</div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Last Appointment</span>
              <Activity className="w-5 h-5 text-success-600" />
            </div>
            <div className="text-lg font-bold text-success-600">{stats.lastCheckup}</div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Completed</span>
              <TrendingUp className="w-5 h-5 text-success-600" />
            </div>
            <div className="text-3xl font-bold text-success-600">{stats.completed}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Submissions */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Recent Appointments</h2>
              {recentAppointments.length > 0 ? (
                <div className="space-y-4">
                  {recentAppointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-lg">Appointment ID: {appointment.id}</div>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            Booked: {appointment.date}
                          </div>
                        </div>
                        <span className={`badge-${appointment.severity?.toLowerCase() || 'medium'}`}>
                          {appointment.severity || 'Medium'} Priority
                        </span>
                      </div>
                      <div className="bg-primary-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-primary-600" />
                          <span className="font-semibold text-primary-800">
                            {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="text-sm text-gray-600">
                          <User className="w-4 h-4 inline mr-1" />
                          {appointment.doctor}
                        </div>
                        <div className="text-sm font-medium text-success-600">
                          {appointment.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No appointments yet</p>
                  <Link to="/patient/check-symptoms" className="btn-primary mt-4 inline-block">
                    Book Your First Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Notifications & Health Tips */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-primary-600" />
                {t.notifications}
              </h3>
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notif, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${
                      notif.type === 'success' ? 'bg-success-50 border-success-100' : 'bg-primary-50 border-primary-100'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-semibold ${
                          notif.type === 'success' ? 'text-success-800' : 'text-primary-800'
                        }`}>
                          {notif.title}
                        </p>
                        <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-gray-300">
                          {notif.id}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${
                        notif.type === 'success' ? 'text-success-600' : 'text-primary-600'
                      }`}>
                        {notif.message}
                      </p>
                      {notif.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          📅 {new Date(notif.date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })} at {notif.time}
                        </p>
                      )}
                    </div>
                  ))}
                  {notifications.length > 3 && (
                    <p className="text-xs text-center text-gray-500 pt-2">
                      {notifications.length - 3} more notification(s)
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{t.noNotifications}</p>
                </div>
              )}
            </div>

            {/* Health Tips */}
            <div className="card bg-gradient-to-br from-success-50 to-primary-50">
              <h3 className="text-xl font-bold mb-4">{t.healthTips}</h3>
              <ul className="space-y-2">
                {healthTips.map((tip, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-success-600 mr-2">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Feedback and Rating System */}
            <div className="card bg-gradient-to-br from-primary-50 to-success-50">
              <h3 className="text-xl font-bold mb-4">{t.feedback}</h3>
              <form onSubmit={handleFeedbackSubmit} className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">{t.doctorName}</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder={t.doctorPlaceholder}
                    value={selectedDoctor}
                    onChange={e => setSelectedDoctor(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">{t.hospitalName}</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder={t.hospitalPlaceholder}
                    value={selectedHospital}
                    onChange={e => setSelectedHospital(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">{t.yourFeedback}</label>
                  <textarea
                    className="input-field w-full"
                    rows={2}
                    placeholder={t.feedbackPlaceholder}
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">{t.rating}</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => (
                      <span
                        key={star}
                        className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => setRating(star)}
                        title={`${star} ${t.rating}`}
                      >★</span>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn-primary px-6">{t.submitFeedback}</button>
              </form>
              <div>
                <h4 className="font-semibold mb-2">{t.recentFeedbacks}</h4>
                {feedbacks.length > 0 ? (
                  <ul className="space-y-3">
                    {feedbacks.slice(0,3).map(fb => (
                      <li key={fb.id} className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-primary-700">{fb.doctor || fb.hospital}</span>
                          <span className="text-yellow-500 text-lg">{'★'.repeat(fb.rating)}<span className="text-gray-400">{'★'.repeat(5-fb.rating)}</span></span>
                        </div>
                        <p className="text-sm text-gray-800">{fb.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{fb.date}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">{t.noFeedbacks}</p>
                )}
              </div>
            </div>

            {/* Medicine Reminders and Tracking */}
            <div className="card bg-gradient-to-br from-blue-50 to-primary-50">
              <h3 className="text-xl font-bold mb-4">{t.medicine}</h3>
              <form onSubmit={handleAddMedicine} className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">{t.medicineName}</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder={t.medicineNamePlaceholder}
                    value={medicineName}
                    onChange={e => setMedicineName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">{t.dosage}</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder={t.dosagePlaceholder}
                    value={dosage}
                    onChange={e => setDosage(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">{t.timing}</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder={t.timingPlaceholder}
                    value={timing}
                    onChange={e => setTiming(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">{t.duration}</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder={t.durationPlaceholder}
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-primary px-6">{t.addMedicine}</button>
              </form>
              <div>
                <h4 className="font-semibold mb-2">{t.currentMedicines}</h4>
                {medicines.length > 0 ? (
                  <ul className="space-y-3">
                    {medicines.map(med => (
                      <li key={med.id} className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-primary-700">{med.name}</span>
                          <span className="ml-2 text-sm text-gray-600">{med.dosage}</span>
                          <div className="text-xs text-gray-500">{t.timing}: {med.timing} | {t.duration}: {med.duration}</div>
                        </div>
                        <div>
                          {med.taken ? (
                            <span className="text-success-600 font-semibold">{t.taken}</span>
                          ) : (
                            <button className="btn-success px-3 py-1 text-xs" onClick={() => handleMarkTaken(med.id)}>{t.markTaken}</button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">{t.noMedicines}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
