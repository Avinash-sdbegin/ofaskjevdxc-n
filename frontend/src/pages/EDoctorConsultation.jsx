import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Video, Mic, MicOff, VideoOff, Phone, MessageSquare, Activity, Heart, Droplet, User, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const EDoctorConsultation = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const [patientVitals, setPatientVitals] = useState({
    heartRate: 142,
    bloodPressure: '90/60',
    oxygenLevel: 88,
    temperature: 38.5,
    status: 'Critical'
  });

  const [eDoctor, setEDoctor] = useState({
    name: 'Dr. Rajesh Kumar',
    specialty: 'Emergency Medicine & Critical Care',
    experience: '15 years',
    location: 'AIIMS Delhi',
    availability: 'Connected',
    avatar: '👨‍⚕️'
  });

  const [instructions, setInstructions] = useState([
    { id: 1, text: 'Immediately start IV line with Normal Saline', status: 'completed', time: '2 min ago' },
    { id: 2, text: 'Administer Oxygen at 5L/min via mask', status: 'completed', time: '1 min ago' },
    { id: 3, text: 'Inject 1mg Adrenaline IM stat', status: 'in-progress', time: 'Just now' },
    { id: 4, text: 'Monitor BP every 5 minutes', status: 'pending', time: '' }
  ]);

  useEffect(() => {
    // Simulate connection
    setTimeout(() => {
      setConnectionStatus('connected');
      setIsConnected(true);
      
      // Initial messages
      const initialMessages = [
        {
          type: 'bot',
          text: 'Hello! I am Dr. Rajesh Kumar from AIIMS Delhi. I have received the patient vitals. This is a critical case. I will guide your local team step by step.',
          time: new Date().toLocaleTimeString()
        },
        {
          type: 'bot',
          text: 'Patient shows signs of severe blood loss and shock. Heart rate elevated at 142 bpm, BP low at 90/60, Oxygen at 88%. We need to stabilize immediately.',
          time: new Date().toLocaleTimeString()
        }
      ];
      setMessages(initialMessages);
    }, 2000);

    // Simulate vitals update
    const vitalsInterval = setInterval(() => {
      setPatientVitals(prev => ({
        ...prev,
        heartRate: prev.heartRate + Math.floor(Math.random() * 4 - 2),
        oxygenLevel: Math.min(100, prev.oxygenLevel + Math.floor(Math.random() * 2))
      }));
    }, 5000);

    return () => clearInterval(vitalsInterval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        type: 'user',
        text: inputMessage,
        time: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate doctor response
      setTimeout(() => {
        const responses = [
          'Understood. Please proceed with that step and report back.',
          'Good work! Continue monitoring the vitals closely.',
          'Yes, that is correct. Make sure to follow proper dosage.',
          'Excellent. Patient is showing signs of improvement.',
          'Keep me updated on any changes in patient condition.'
        ];
        const botMessage = {
          type: 'bot',
          text: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1500);
    }
  };

  const updateInstructionStatus = (id, status) => {
    setInstructions(instructions.map(inst => 
      inst.id === id ? {...inst, status, time: 'Just now'} : inst
    ));
  };

  const costBreakdown = {
    consultation: 1000,
    guidance: 500,
    monitoring: 500,
    total: 2000,
    cityCost: 10000,
    savings: 8000
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/emergency" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Emergency Assessment
        </Link>

        {/* Header */}
        <div className="bg-primary-600 text-white rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">E-Doctor Live Consultation 🩺</h1>
              <p className="text-primary-100">Real-time remote specialist assistance at 20% cost</p>
            </div>
            <div className="text-right">
              <div className={`text-sm font-semibold px-4 py-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-success-500' : 'bg-warning-500'
              }`}>
                {connectionStatus === 'connected' ? '● LIVE' : '○ Connecting...'}
              </div>
              <div className="text-xs text-primary-100 mt-1">Session: 12:35 mins</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Feed */}
            <div className="card p-0 overflow-hidden">
              <div className="bg-gray-900 aspect-video relative">
                {isConnected ? (
                  <>
                    {/* E-Doctor Video */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-700">
                      <div className="text-center">
                        <div className="text-8xl mb-4">{eDoctor.avatar}</div>
                        <h3 className="text-white text-2xl font-bold">{eDoctor.name}</h3>
                        <p className="text-primary-200">{eDoctor.specialty}</p>
                        <div className="mt-4 flex items-center justify-center gap-2 text-success-400">
                          <Activity className="w-5 h-5 animate-pulse" />
                          <span>Live Consultation Active</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Local Video (Picture-in-Picture) */}
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white shadow-xl">
                      <div className="flex items-center justify-center h-full text-white">
                        {isVideoOff ? (
                          <div className="text-center">
                            <VideoOff className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-xs">Video Off</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <User className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-xs">Local Hospital</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                      <p>Connecting to E-Doctor...</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Video Controls */}
              <div className="bg-gray-800 p-4 flex items-center justify-center gap-4">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-full ${isMuted ? 'bg-danger-600' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-colors`}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                
                <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-4 rounded-full ${isVideoOff ? 'bg-danger-600' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-colors`}
                >
                  {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </button>
                
                <button className="p-4 rounded-full bg-danger-600 hover:bg-danger-700 text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* AI Instructions Panel */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-primary-600" />
                Doctor's Instructions - Follow Step by Step
              </h3>
              <div className="space-y-3">
                {instructions.map((instruction) => (
                  <div key={instruction.id} className={`p-4 rounded-lg border-2 ${
                    instruction.status === 'completed' ? 'border-success-200 bg-success-50' :
                    instruction.status === 'in-progress' ? 'border-warning-200 bg-warning-50' :
                    'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{instruction.text}</p>
                        {instruction.time && (
                          <p className="text-xs text-gray-500 mt-1">{instruction.time}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {instruction.status === 'completed' && (
                          <CheckCircle className="w-6 h-6 text-success-600" />
                        )}
                        {instruction.status === 'in-progress' && (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-warning-600"></div>
                        )}
                        {instruction.status === 'pending' && (
                          <button 
                            onClick={() => updateInstructionStatus(instruction.id, 'in-progress')}
                            className="text-xs bg-primary-600 text-white px-3 py-1 rounded-full hover:bg-primary-700"
                          >
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary-600" />
                Live Chat with E-Doctor
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'bot' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">{message.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message or report status..."
                  className="input-field flex-1"
                />
                <button onClick={sendMessage} className="btn-primary px-6">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Patient Vitals - Real Time */}
            <div className="card border-2 border-danger-200">
              <h3 className="text-lg font-bold mb-4 text-danger-800 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Live Patient Vitals
              </h3>
              <div className="space-y-4">
                <div className="bg-danger-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      Heart Rate
                    </span>
                    <span className={`font-bold ${
                      patientVitals.heartRate > 120 ? 'text-danger-600' : 'text-success-600'
                    }`}>
                      {patientVitals.heartRate} bpm
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        patientVitals.heartRate > 120 ? 'bg-danger-600' : 'bg-success-600'
                      } animate-pulse`}
                      style={{width: `${Math.min((patientVitals.heartRate / 200) * 100, 100)}%`}}
                    ></div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      Oxygen Level
                    </span>
                    <span className={`font-bold ${
                      patientVitals.oxygenLevel < 90 ? 'text-danger-600' : 'text-success-600'
                    }`}>
                      {patientVitals.oxygenLevel}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        patientVitals.oxygenLevel < 90 ? 'bg-danger-600' : 'bg-success-600'
                      }`}
                      style={{width: `${patientVitals.oxygenLevel}%`}}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">Blood Pressure</p>
                    <p className="font-bold">{patientVitals.bloodPressure}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">Temperature</p>
                    <p className="font-bold">{patientVitals.temperature}°C</p>
                  </div>
                </div>

                <div className={`p-3 rounded-lg text-center font-semibold ${
                  patientVitals.status === 'Critical' ? 'bg-danger-100 text-danger-700' : 'bg-success-100 text-success-700'
                }`}>
                  {patientVitals.status}
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{eDoctor.avatar}</div>
                <h3 className="font-bold text-lg">{eDoctor.name}</h3>
                <p className="text-sm text-gray-600">{eDoctor.specialty}</p>
                <p className="text-xs text-gray-500 mt-1">{eDoctor.experience} • {eDoctor.location}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-success-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-success-600 rounded-full animate-pulse"></span>
                    {eDoctor.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="card bg-success-50 border-2 border-success-200">
              <h3 className="text-lg font-bold mb-4 text-success-800 flex items-center gap-2">
                💰 Cost Saving
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">E-Doctor Consultation</span>
                  <span className="font-semibold">₹{costBreakdown.consultation}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Real-time Guidance</span>
                  <span className="font-semibold">₹{costBreakdown.guidance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vitals Monitoring</span>
                  <span className="font-semibold">₹{costBreakdown.monitoring}</span>
                </div>
                <div className="border-t-2 border-success-200 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total E-Doctor Cost</span>
                    <span className="text-success-600">₹{costBreakdown.total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>City Hospital Cost</span>
                    <span className="line-through">₹{costBreakdown.cityCost}</span>
                  </div>
                  <div className="bg-success-600 text-white rounded-lg p-3 mt-3 text-center">
                    <p className="text-sm">You Save</p>
                    <p className="text-2xl font-bold">₹{costBreakdown.savings}</p>
                    <p className="text-xs opacity-90">(80% reduction in cost)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card bg-danger-50 border-2 border-danger-200">
              <h3 className="font-bold mb-3 text-danger-800">Emergency Helpline</h3>
              <a href="tel:108" className="bg-danger-600 text-white rounded-lg p-4 flex items-center justify-center gap-2 hover:bg-danger-700 transition-colors">
                <Phone className="w-5 h-5" />
                <span className="text-xl font-bold">108</span>
              </a>
              <p className="text-xs text-center text-gray-600 mt-2">Toll-Free Ambulance Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EDoctorConsultation;
