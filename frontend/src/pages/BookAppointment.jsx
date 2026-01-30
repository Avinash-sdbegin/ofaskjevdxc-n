import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, Building2, User, Phone, MapPin, Mail, CheckCircle, IndianRupee, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAIAllotted, setIsAIAllotted] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    consultationType: 'video', // video, in-person
    paymentMethod: 'upi', // upi, card, wallet
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    additionalNotes: ''
  });

  const [bookingComplete, setBookingComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');

  useEffect(() => {
    const stateData = location.state || {};
    setDoctor(stateData.doctor);
    setPatientData(stateData.patientData);
    setAiAnalysis(stateData.aiAnalysis);
    setIsAIAllotted(stateData.isAIAllotted || false);

    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingData(prev => ({
      ...prev,
      appointmentDate: tomorrow.toISOString().split('T')[0]
    }));
  }, [location]);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  // Calculate consultation fee based on type
  const baseFee = doctor?.consultationFee || 0;
  const consultationFee = bookingData.consultationType === 'video' 
    ? Math.round(baseFee * 0.85) // 15% discount for video consultation
    : baseFee; // Full price for in-person visit

  const platformFee = Math.round(consultationFee * 0.01); // 1% of consultation fee
  const totalAmount = consultationFee + platformFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate appointment ID
    const apptId = 'APPT' + Date.now().toString().slice(-8);
    setAppointmentId(apptId);

    // Simulate payment processing
    setTimeout(() => {
      // Save appointment to localStorage
      const appointment = {
        id: apptId,
        patientName: patientData?.name || 'Patient',
        patientAge: patientData?.age || 'N/A',
        patientGender: patientData?.gender || 'N/A',
        patientPhone: patientData?.phone || 'N/A',
        patientLocation: patientData?.location || 'N/A',
        doctorName: doctor?.name,
        doctorSpecialization: doctor?.specialization,
        hospital: doctor?.hospital,
        appointmentDate: bookingData.appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        consultationType: bookingData.consultationType,
        symptoms: patientData?.symptoms || [],
        aiCondition: aiAnalysis?.condition,
        riskLevel: aiAnalysis?.riskLevel,
        consultationFee: doctor?.consultationFee,
        totalPaid: totalAmount,
        paymentMethod: bookingData.paymentMethod,
        status: 'Confirmed',
        bookedAt: new Date().toISOString(),
        severity: aiAnalysis?.riskLevel === 'High' ? 'High' : aiAnalysis?.riskLevel === 'Medium' ? 'Medium' : 'Low',
        riskScore: aiAnalysis?.riskLevel === 'High' ? 85 : aiAnalysis?.riskLevel === 'Medium' ? 60 : 35,
        hasImages: (patientData?.images?.length || 0) > 0,
        imageCount: patientData?.images?.length || 0,
        aiInsight: aiAnalysis?.urgency || 'General consultation',
        submittedAt: 'Just now',
        isAIAllotted: isAIAllotted, // Track if AI recommended this doctor
        selectionMethod: isAIAllotted ? 'AI Recommended' : 'Manual Selection'
      };

      // Get existing appointments
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      existingAppointments.push(appointment);
      localStorage.setItem('appointments', JSON.stringify(existingAppointments));

      setLoading(false);
      setBookingComplete(true);
    }, 2500);
  };

  if (!doctor) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600">No doctor selected. Please go back and select a doctor.</p>
          <button onClick={() => navigate(-1)} className="btn-primary mt-4">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="card text-center">
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-success-600" />
            </div>
            
            <h2 className="text-3xl font-bold mb-3">Appointment Confirmed! 🎉</h2>
            <p className="text-gray-600 mb-6">
              Your consultation has been successfully booked
            </p>

            {/* Appointment Details Card */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl p-6 mb-6 text-left">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h3 className="font-bold text-lg">Appointment Details</h3>
                <span className="px-3 py-1 bg-success-600 text-white rounded-full text-sm font-semibold">
                  CONFIRMED
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Appointment ID</p>
                  <p className="font-bold text-primary-600 text-lg">{appointmentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                  <p className="font-bold text-success-600 text-lg">₹{totalAmount}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl">{doctor.image}</div>
                  <div>
                    <p className="font-bold text-lg">{doctor.name}</p>
                    <p className="text-primary-600">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{new Date(bookingData.appointmentDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{bookingData.appointmentTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded ${
                      bookingData.consultationType === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {bookingData.consultationType === 'video' ? '📹 Video Call' : '🏥 In-Person'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <p className="text-sm text-blue-800">
                  📧 Confirmation details have been sent to your email and phone number.
                  You'll receive a reminder 1 hour before your appointment.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  ⏰ <strong>Note:</strong> If there's any change in appointment time, you will be notified immediately via SMS and email.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/patient')}
                className="btn-secondary py-3"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-primary py-3"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">Complete the details to confirm your consultation</p>
          {isAIAllotted && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              AI Recommended Doctor
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Doctor Info Card */}
              <div className="card bg-gradient-to-br from-primary-50 to-white">
                <h3 className="font-bold text-lg mb-4">Doctor Details</h3>
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{doctor.image}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-1">{doctor.name}</h4>
                    <p className="text-primary-600 font-semibold mb-3">{doctor.specialization}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span>{doctor.hospital}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-success-600 font-semibold">{doctor.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Info */}
              <div className="card">
                <h3 className="font-bold text-lg mb-4">Patient Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={patientData?.name || ''}
                        className="input-field pl-10"
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={patientData?.phone || ''}
                        className="input-field pl-10"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Date & Time */}
              <div className="card">
                <h3 className="font-bold text-lg mb-4">Select Date & Time</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Appointment Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingData.appointmentDate}
                        onChange={(e) => setBookingData({...bookingData, appointmentDate: e.target.value})}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Appointment Time *</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        required
                        value={bookingData.appointmentTime}
                        onChange={(e) => setBookingData({...bookingData, appointmentTime: e.target.value})}
                        className="input-field pl-10"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Consultation Type *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      bookingData.consultationType === 'video' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="consultationType"
                        value="video"
                        checked={bookingData.consultationType === 'video'}
                        onChange={(e) => setBookingData({...bookingData, consultationType: e.target.value})}
                        className="mr-2"
                      />
                      <div>
                        <span className="font-semibold block">📹 Video Consultation</span>
                        <span className="text-xs text-green-600 font-semibold mt-1 block">
                          💰 Save 15% - ₹{Math.round(baseFee * 0.85)}
                        </span>
                      </div>
                    </label>
                    <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      bookingData.consultationType === 'in-person' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="consultationType"
                        value="in-person"
                        checked={bookingData.consultationType === 'in-person'}
                        onChange={(e) => setBookingData({...bookingData, consultationType: e.target.value})}
                        className="mr-2"
                      />
                      <div>
                        <span className="font-semibold block">🏥 In-Person Visit</span>
                        <span className="text-xs text-gray-600 mt-1 block">
                          Full Fee - ₹{baseFee}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Payment Method *</label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {['upi', 'card', 'wallet'].map((method) => (
                        <label key={method} className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                          bookingData.paymentMethod === method 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={bookingData.paymentMethod === method}
                            onChange={(e) => setBookingData({...bookingData, paymentMethod: e.target.value})}
                            className="sr-only"
                          />
                          <span className="font-semibold capitalize">{method === 'upi' ? '📱 UPI' : method === 'card' ? '💳 Card' : '👛 Wallet'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {bookingData.paymentMethod === 'upi' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">UPI ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="yourname@upi"
                        value={bookingData.upiId}
                        onChange={(e) => setBookingData({...bookingData, upiId: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  )}

                  {bookingData.paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          value={bookingData.cardNumber}
                          onChange={(e) => setBookingData({...bookingData, cardNumber: e.target.value})}
                          className="input-field"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry (MM/YY) *</label>
                          <input
                            type="text"
                            required
                            placeholder="12/25"
                            maxLength="5"
                            value={bookingData.cardExpiry}
                            onChange={(e) => setBookingData({...bookingData, cardExpiry: e.target.value})}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV *</label>
                          <input
                            type="password"
                            required
                            placeholder="123"
                            maxLength="3"
                            value={bookingData.cardCVV}
                            onChange={(e) => setBookingData({...bookingData, cardCVV: e.target.value})}
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="card">
                <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Any specific concerns or questions for the doctor..."
                  value={bookingData.additionalNotes}
                  onChange={(e) => setBookingData({...bookingData, additionalNotes: e.target.value})}
                  className="input-field"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Confirm & Pay ₹{totalAmount}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <h3 className="font-bold text-lg mb-4">Payment Summary</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-gray-600">Consultation Fee</span>
                    {bookingData.consultationType === 'video' && (
                      <span className="block text-xs text-green-600 font-semibold mt-1">
                        15% discount on video call 🎉
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    {bookingData.consultationType === 'video' && (
                      <span className="block text-xs text-gray-400 line-through">₹{doctor.consultationFee}</span>
                    )}
                    <span className="font-semibold">₹{consultationFee}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (1%)</span>
                  <span className="font-semibold">₹{platformFee}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-2xl font-bold text-primary-600">₹{totalAmount}</span>
              </div>

              {/* Savings Info */}
              {bookingData.consultationType === 'video' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-800">
                    💰 You're saving ₹{baseFee - consultationFee} with video consultation!
                  </p>
                </div>
              )}

              {/* Condition Info */}
              {aiAnalysis && (
                <div className={`bg-${aiAnalysis.riskLevel === 'High' ? 'danger' : aiAnalysis.riskLevel === 'Medium' ? 'warning' : 'success'}-50 rounded-lg p-4 mb-4`}>
                  <p className="text-sm font-semibold mb-1">Your Condition</p>
                  <p className="font-bold">{aiAnalysis.condition}</p>
                  <p className={`text-sm mt-2 text-${aiAnalysis.riskLevel === 'High' ? 'danger' : aiAnalysis.riskLevel === 'Medium' ? 'warning' : 'success'}-700`}>
                    {aiAnalysis.riskLevel} Priority
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  🔒 Your payment is secure and encrypted. 100% money-back guarantee if consultation is cancelled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
