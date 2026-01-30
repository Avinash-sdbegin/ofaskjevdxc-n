import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Heart, Thermometer, Droplet, Activity, Clock, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';

const EmergencyAssessment = () => {
  const [vitals, setVitals] = useState({
    heartRate: '',
    bloodPressure: '',
    temperature: '',
    oxygenLevel: '',
    bloodLoss: '',
    consciousness: '',
    breathingRate: '',
    injuryType: ''
  });

  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    location: ''
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [showPaperwork, setShowPaperwork] = useState(false);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState(null);
  const [assessmentStartTime, setAssessmentStartTime] = useState(null);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [paperworkData, setPaperworkData] = useState({
    bloodGroup: '',
    allergies: '',
    previousConditions: '',
    emergencyContact: '',
    insuranceNumber: '',
    selectedHospitalId: null,
    patientName: '',
    patientAge: ''
  });

  // Hospital database with real-time data
  const hospitalDatabase = [
    {
      id: 1,
      name: 'AIIMS Patna',
      city: 'Patna',
      distance: 12,
      baseTravel: 25, // minutes in normal traffic
      trafficMultiplier: 1.5, // current traffic
      icuBeds: 8,
      totalBeds: 45,
      fees: {
        emergency: 500,
        icu: 3000,
        surgery: 15000,
        ambulance: 800
      },
      specialties: ['Trauma', 'Neurology', 'Cardiology', 'All'],
      rating: 4.8,
      contactNumbers: ['0612-2297000', '0612-2297001']
    },
    {
      id: 2,
      name: 'Patna Medical College Hospital',
      city: 'Patna',
      distance: 8,
      baseTravel: 18,
      trafficMultiplier: 1.3,
      icuBeds: 12,
      totalBeds: 60,
      fees: {
        emergency: 300,
        icu: 2000,
        surgery: 10000,
        ambulance: 600
      },
      specialties: ['Emergency', 'General Surgery', 'Medicine'],
      rating: 4.5,
      contactNumbers: ['0612-2302497', '0612-2302498']
    },
    {
      id: 3,
      name: 'Indira Gandhi Institute (IGIMS)',
      city: 'Patna',
      distance: 15,
      baseTravel: 30,
      trafficMultiplier: 1.4,
      icuBeds: 6,
      totalBeds: 40,
      fees: {
        emergency: 400,
        icu: 2500,
        surgery: 12000,
        ambulance: 700
      },
      specialties: ['Trauma', 'Orthopedics', 'Emergency'],
      rating: 4.6,
      contactNumbers: ['0612-2297049', '0612-2297050']
    },
    {
      id: 4,
      name: 'Paras HMRI Hospital',
      city: 'Patna',
      distance: 10,
      baseTravel: 20,
      trafficMultiplier: 1.2,
      icuBeds: 15,
      totalBeds: 80,
      fees: {
        emergency: 1500,
        icu: 8000,
        surgery: 50000,
        ambulance: 2000
      },
      specialties: ['All', 'Premium Care', 'Advanced Trauma'],
      rating: 4.9,
      contactNumbers: ['0612-3570000', '0612-3570001']
    },
    {
      id: 5,
      name: 'Ruban Memorial Hospital',
      city: 'Patna',
      distance: 6,
      baseTravel: 15,
      trafficMultiplier: 1.1,
      icuBeds: 4,
      totalBeds: 25,
      fees: {
        emergency: 800,
        icu: 4000,
        surgery: 25000,
        ambulance: 1200
      },
      specialties: ['Emergency', 'Cardiology'],
      rating: 4.3,
      contactNumbers: ['0612-2201234', '0612-2201235']
    }
  ];

  // Timer effect to update elapsed time every minute
  useEffect(() => {
    if (assessmentStartTime && result) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - assessmentStartTime) / 60000); // minutes
        setElapsedMinutes(elapsed);
      }, 10000); // Update every 10 seconds for smoother updates

      return () => clearInterval(interval);
    }
  }, [assessmentStartTime, result]);

  // Calculate remaining survival time and updated risk
  const getRemainingTime = () => {
    if (!result || !assessmentStartTime) return result?.survivalTime || 0;
    
    const originalSurvival = result.survivalTime;
    const remaining = originalSurvival - elapsedMinutes;
    return Math.max(0, remaining);
  };

  const getCurrentRisk = () => {
    if (!result) return { level: 'Low', score: 0, color: 'success' };
    
    const remainingTime = getRemainingTime();
    const originalTime = result.survivalTime;
    const timePercent = (remainingTime / originalTime) * 100;
    
    // Risk increases as time passes
    let updatedScore = result.riskScore;
    if (timePercent < 25) updatedScore = Math.min(100, result.riskScore + 30);
    else if (timePercent < 50) updatedScore = Math.min(100, result.riskScore + 15);
    
    let level = 'Low';
    let color = 'success';
    
    if (updatedScore > 70) {
      level = 'Critical';
      color = 'danger';
    } else if (updatedScore > 40) {
      level = 'High';
      color = 'warning';
    } else if (updatedScore > 20) {
      level = 'Medium';
      color = 'warning';
    }
    
    return { level, score: updatedScore, color };
  };

  const handleAnalyze = () => {
    setAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const hr = parseInt(vitals.heartRate) || 0;
      const temp = parseFloat(vitals.temperature) || 0;
      const oxygen = parseInt(vitals.oxygenLevel) || 0;
      const bloodLoss = vitals.bloodLoss;

      // Calculate survival time and decision
      let survivalMinutes = 120; // Default 2 hours
      let riskScore = 0;

      // Heart rate analysis
      if (hr < 40 || hr > 140) riskScore += 35;
      else if (hr < 50 || hr > 120) riskScore += 25;
      else if (hr < 60 || hr > 100) riskScore += 15;

      // Temperature
      if (temp < 35 || temp > 39.5) riskScore += 25;
      else if (temp < 36 || temp > 38.5) riskScore += 15;

      // Oxygen
      if (oxygen < 85) riskScore += 30;
      else if (oxygen < 92) riskScore += 20;
      else if (oxygen < 95) riskScore += 10;

      // Blood loss
      if (bloodLoss === 'severe') riskScore += 35;
      else if (bloodLoss === 'moderate') riskScore += 20;
      else if (bloodLoss === 'mild') riskScore += 10;

      // Calculate survival time based on risk
      if (riskScore >= 80) survivalMinutes = 30; // Critical - 30 minutes
      else if (riskScore >= 60) survivalMinutes = 60; // Severe - 1 hour
      else if (riskScore >= 40) survivalMinutes = 120; // Moderate - 2 hours
      else survivalMinutes = 240; // Stable - 4+ hours

      // Snake bite specific adjustments
      if (vitals.injuryType === 'Snake Bite') {
        survivalMinutes = Math.max(90, survivalMinutes); // Snake bite: 90-240 min window
        if (riskScore < 50) riskScore += 20; // Increase urgency for snake bites
      }

      // Calculate hospital options with survival time comparison
      const calculateHospitalOptions = () => {
        return hospitalDatabase.map(hospital => {
          const actualTravelTime = Math.round(hospital.baseTravel * hospital.trafficMultiplier);
          const canReach = survivalMinutes > (actualTravelTime + 15); // 15 min buffer for stabilization
          const timeMargin = survivalMinutes - actualTravelTime;
          
          // Calculate estimated total cost
          const totalCost = hospital.fees.emergency + hospital.fees.ambulance + 
                           (riskScore >= 60 ? hospital.fees.icu : 0);

          return {
            ...hospital,
            actualTravelTime,
            canReach,
            timeMargin,
            totalCost,
            riskLevel: !canReach ? 'CRITICAL_RISK' : 
                      timeMargin < 30 ? 'HIGH_RISK' : 
                      timeMargin < 60 ? 'MODERATE_RISK' : 'SAFE'
          };
        }).sort((a, b) => {
          // Sort by: reachability first, then time margin, then quality
          if (a.canReach !== b.canReach) return b.canReach - a.canReach;
          if (a.canReach) return b.timeMargin - a.timeMargin; // More time margin is better
          return b.rating - a.rating;
        });
      };

      const hospitalOptions = calculateHospitalOptions();
      const bestReachableHospital = hospitalOptions.find(h => h.canReach);

      // Check if city hospital reachable
      const travelTime = bestReachableHospital ? bestReachableHospital.actualTravelTime : 75;
      const isReachable = !!bestReachableHospital;

      // Get injury-specific protocols
      const getInTransitProtocols = () => {
        if (vitals.injuryType === 'Snake Bite') {
          return [
            '🐍 SNAKE BITE PROTOCOL - CRITICAL STEPS',
            '1. Keep patient CALM - movement spreads venom faster',
            '2. Remove rings, watches, tight clothing near bite',
            '3. Immobilize bitten limb below heart level',
            '4. Mark bite site time with pen (for antivenom timing)',
            '5. DO NOT: Cut wound, suck venom, apply ice, or tourniquet',
            '6. Monitor breathing every 5 minutes',
            '7. If snake killed, bring it for identification (safely)',
            '8. Watch for: Swelling, numbness, difficulty breathing',
            '9. IV line ready (Normal Saline 500ml slow drip)',
            '10. Note symptoms progression for hospital team'
          ];
        } else if (vitals.injuryType === 'Road Accident') {
          return [
            '1. Stabilize neck and spine - avoid movement',
            '2. Control bleeding with direct pressure',
            '3. Monitor consciousness level',
            '4. Keep airway clear',
            '5. IV fluids if available'
          ];
        } else if (vitals.injuryType === 'Heart Attack') {
          return [
            '1. Keep patient sitting upright',
            '2. Aspirin 300mg chewed (if not allergic)',
            '3. Oxygen 6-10L/min',
            '4. Monitor pulse and BP every 5 min',
            '5. Keep calm, reduce stress'
          ];
        } else if (vitals.injuryType === 'Severe Bleeding') {
          return [
            '1. Apply direct pressure to wound',
            '2. Elevate injured part above heart',
            '3. IV Normal Saline wide open',
            '4. Monitor BP every 3 minutes',
            '5. Keep patient warm'
          ];
        } else if (vitals.injuryType === 'Stroke') {
          return [
            '1. Keep head elevated 30 degrees',
            '2. Nothing by mouth (aspiration risk)',
            '3. Monitor BP and glucose',
            '4. Note exact time symptoms started',
            '5. Keep patient calm'
          ];
        } else {
          return [
            '1. Monitor vital signs continuously',
            '2. Keep airway clear',
            '3. Administer oxygen if needed',
            '4. IV access established',
            '5. Comfort and reassure patient'
          ];
        }
      };

      const decision = {
        riskScore: Math.min(riskScore, 100),
        survivalTime: survivalMinutes,
        travelTime: travelTime,
        isReachable: isReachable,
        hospitalOptions: hospitalOptions,
        bestHospital: bestReachableHospital,
        decision: isReachable ? 'REFER_TO_CITY' : 'E_DOCTOR_ASSIST',
        urgency: riskScore >= 80 ? 'CRITICAL' : riskScore >= 60 ? 'SEVERE' : riskScore >= 40 ? 'MODERATE' : 'STABLE',
        injuryType: vitals.injuryType,
        inTransitProtocols: getInTransitProtocols(),
        recommendations: isReachable ? [
          `BEST OPTION: ${bestReachableHospital.name} - Reachable in ${bestReachableHospital.actualTravelTime} min`,
          'Immediately prepare patient for transfer',
          'Ambulance dispatched with pre-filled paperwork',
          'Hospital bed and ICU team pre-alerted',
          'Continuous vitals monitoring during transport'
        ] : [
          'Patient cannot safely reach city hospital',
          'Arrange E-Doctor consultation immediately',
          'E-Doctor will guide local doctors in real-time',
          'Stabilize patient with emergency protocols',
          'Prepare for city transfer once stabilized'
        ]
      };

      setResult(decision);
      setAssessmentStartTime(Date.now());
      setElapsedMinutes(0);
      setAnalyzing(false);
    }, 2500);
  };

  const injuryTypes = [
    'Road Accident',
    'Fall from Height',
    'Snake Bite',
    'Severe Bleeding',
    'Heart Attack',
    'Stroke',
    'Difficulty Breathing',
    'Other Emergency'
  ];

  // Get real-time care instructions based on selected injury

  
  const getInjuryCareInstructions = (injuryType) => {
    switch(injuryType) {
      case 'Snake Bite':
        return {
          icon: '🐍',
          title: 'SNAKE BITE - Critical Ambulance Care',
          color: 'from-danger-600 to-orange-600',
          critical: 'ANTIVENOM needed within 4 hours!',
          dos: [
            'Keep patient ABSOLUTELY STILL (movement spreads venom)',
            'Remove ALL jewelry, rings, watches IMMEDIATELY',
            'Mark bite location and TIME with pen on skin',
            'Immobilize bitten limb BELOW heart level',
            'Bring dead snake for identification (if safe)',
            'Monitor breathing every 5 minutes'
          ],
          donts: [
            'DON\'T cut the wound or suck venom',
            'DON\'T apply ice or cold pack',
            'DON\'T use tourniquet (tight band)',
            'DON\'T give alcohol, tea, or coffee',
            'DON\'T let patient walk or move',
            'DON\'T wash the bite site'
          ],
          monitoring: 'Watch for: Swelling, numbness, drooping eyelids, difficulty breathing, bleeding'
        };
      
      case 'Road Accident':
        return {
          icon: '🚗',
          title: 'ROAD ACCIDENT - Trauma Care',
          color: 'from-red-600 to-orange-600',
          critical: 'Spinal injury risk - Handle with extreme care!',
          dos: [
            'Stabilize neck and spine - avoid ANY movement',
            'Apply direct pressure on bleeding wounds',
            'Keep airway clear (check breathing)',
            'Cover wounds with clean cloth',
            'Note time of accident',
            'Check for internal bleeding signs'
          ],
          donts: [
            'DON\'T move patient unless absolutely necessary',
            'DON\'T remove helmet (if wearing)',
            'DON\'T give water if unconscious',
            'DON\'T pull out embedded objects',
            'DON\'T leave patient alone',
            'DON\'T delay calling ambulance'
          ],
          monitoring: 'Watch for: Consciousness level, breathing rate, bleeding, shock signs'
        };

      case 'Heart Attack':
        return {
          icon: '❤️',
          title: 'HEART ATTACK - Cardiac Emergency',
          color: 'from-red-500 to-pink-600',
          critical: 'Golden Hour - Every minute counts for heart muscle!',
          dos: [
            'Keep patient sitting upright or semi-reclined',
            'Give Aspirin 300mg to chew (if not allergic)',
            'Loosen tight clothing around chest/neck',
            'Keep patient calm and reassured',
            'Administer oxygen if available',
            'Monitor pulse every 5 minutes'
          ],
          donts: [
            'DON\'T let patient walk or exert',
            'DON\'T give food or water',
            'DON\'T leave patient alone',
            'DON\'T delay medical help',
            'DON\'T give multiple medications',
            'DON\'T panic (stay calm)'
          ],
          monitoring: 'Watch for: Chest pain level, sweating, nausea, breathing difficulty, pulse changes'
        };

      case 'Severe Bleeding':
        return {
          icon: '🩸',
          title: 'SEVERE BLEEDING - Hemorrhage Control',
          color: 'from-danger-700 to-red-600',
          critical: 'Blood loss can be fatal in 15-20 minutes!',
          dos: [
            'Apply DIRECT pressure to wound with clean cloth',
            'Elevate injured part ABOVE heart level',
            'Press on pressure points if needed',
            'Keep patient warm (prevent shock)',
            'Note time bleeding started',
            'Monitor BP every 3 minutes'
          ],
          donts: [
            'DON\'T remove cloth if soaked (add more on top)',
            'DON\'T use tourniquet unless limb amputation risk',
            'DON\'T give water if surgery likely',
            'DON\'T probe wound with fingers',
            'DON\'T waste time - call ambulance NOW',
            'DON\'T let patient see blood (causes panic)'
          ],
          monitoring: 'Watch for: Bleeding control, pale skin, cold hands, weak pulse, confusion'
        };

      case 'Stroke':
        return {
          icon: '🧠',
          title: 'STROKE - Brain Attack Emergency',
          color: 'from-purple-600 to-pink-600',
          critical: 'Brain cells die every minute - Time = Brain!',
          dos: [
            'Keep head elevated 30 degrees',
            'Note EXACT time symptoms started (critical)',
            'Turn head to side if vomiting',
            'Loosen tight clothing',
            'Keep patient calm and still',
            'Monitor consciousness level'
          ],
          donts: [
            'DON\'T give anything by mouth (choking risk)',
            'DON\'T give aspirin (bleeding risk)',
            'DON\'T let patient sleep',
            'DON\'T delay ambulance',
            'DON\'T leave patient alone',
            'DON\'T move patient unnecessarily'
          ],
          monitoring: 'Watch for: Face drooping, arm weakness, speech difficulty, time of onset (FAST)'
        };

      case 'Fall from Height':
        return {
          icon: '⬇️',
          title: 'FALL FROM HEIGHT - Multi-trauma',
          color: 'from-orange-600 to-red-600',
          critical: 'Spinal & internal injury risk - Handle carefully!',
          dos: [
            'Keep patient absolutely still',
            'Stabilize head and neck',
            'Check for consciousness and breathing',
            'Cover with blanket (prevent shock)',
            'Note height of fall',
            'Look for hidden injuries'
          ],
          donts: [
            'DON\'T move unless life-threatening danger',
            'DON\'T bend neck or back',
            'DON\'T give food/water',
            'DON\'T assume no injury if conscious',
            'DON\'T transport in private vehicle',
            'DON\'T delay professional help'
          ],
          monitoring: 'Watch for: Back pain, paralysis, internal bleeding, breathing, consciousness'
        };

      case 'Difficulty Breathing':
        return {
          icon: '🫁',
          title: 'DIFFICULTY BREATHING - Respiratory Emergency',
          color: 'from-blue-600 to-cyan-600',
          critical: 'Brain damage starts after 4-6 minutes without oxygen!',
          dos: [
            'Keep patient sitting upright (easier breathing)',
            'Loosen tight clothing around chest',
            'Open windows for fresh air',
            'Give prescribed inhaler if available',
            'Keep patient calm (panic worsens breathing)',
            'Count breathing rate per minute'
          ],
          donts: [
            'DON\'T lay patient flat',
            'DON\'T give water while gasping',
            'DON\'T leave patient alone',
            'DON\'T let crowd gather',
            'DON\'T delay oxygen if available',
            'DON\'T assume it will pass'
          ],
          monitoring: 'Watch for: Lip color (blue?), breathing rate, chest movement, consciousness'
        };

      default:
        return {
          icon: '🚨',
          title: 'GENERAL EMERGENCY - Basic Care',
          color: 'from-gray-600 to-gray-700',
          critical: 'Monitor vitals and call for help!',
          dos: [
            'Keep patient calm and comfortable',
            'Monitor breathing and pulse',
            'Note time of emergency',
            'Keep airway clear',
            'Call ambulance immediately',
            'Stay with patient'
          ],
          donts: [
            'DON\'T panic',
            'DON\'T move patient unnecessarily',
            'DON\'T give medications',
            'DON\'T delay medical help',
            'DON\'T leave patient alone',
            'DON\'T make assumptions'
          ],
          monitoring: 'Watch for: Any changes in condition, breathing, consciousness'
        };
    }
  };

  const selectedInjuryInfo = vitals.injuryType ? getInjuryCareInstructions(vitals.injuryType) : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        {/* Emergency Banner */}
        <div className="bg-danger-600 text-white rounded-xl p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-12 h-12 animate-pulse" />
            <div>
              <h1 className="text-3xl font-bold mb-1">Emergency Assessment System</h1>
              <p className="text-danger-100">AI-powered critical care decision support</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white text-danger-600 px-6 py-3 rounded-lg">
              <Phone className="w-6 h-6 inline mr-2" />
              <span className="text-2xl font-bold">108</span>
              <p className="text-xs">Emergency Helpline (Toll-Free)</p>
            </div>
          </div>
        </div>

        {!result ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Patient Info */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Patient Information
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Patient Name *"
                  className="input-field"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Age *"
                    className="input-field"
                    value={patientInfo.age}
                    onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                  />
                  <select
                    className="input-field"
                    value={patientInfo.gender}
                    onChange={(e) => setPatientInfo({...patientInfo, gender: e.target.value})}
                  >
                    <option value="">Gender *</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Village/Location *"
                  className="input-field"
                  value={patientInfo.location}
                  onChange={(e) => setPatientInfo({...patientInfo, location: e.target.value})}
                />
              </div>
            </div>

            {/* Critical Vitals */}
            <div className="card border-2 border-danger-200 bg-danger-50">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-danger-800">
                <span className="bg-danger-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Critical Vitals (Emergency)
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-danger-900">Heart Rate (bpm) *</label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-danger-600 w-5 h-5" />
                    <input
                      type="number"
                      placeholder="e.g., 72"
                      className="input-field pl-10 bg-white"
                      value={vitals.heartRate}
                      onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-danger-900">Blood Pressure</label>
                    <input
                      type="text"
                      placeholder="120/80"
                      className="input-field bg-white"
                      value={vitals.bloodPressure}
                      onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-danger-900">Temperature (°C) *</label>
                    <div className="relative">
                      <Thermometer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-danger-600 w-5 h-5" />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="37.0"
                        className="input-field pl-10 bg-white"
                        value={vitals.temperature}
                        onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-danger-900">Oxygen Level (%) *</label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-danger-600 w-5 h-5" />
                    <input
                      type="number"
                      placeholder="e.g., 95"
                      className="input-field pl-10 bg-white"
                      value={vitals.oxygenLevel}
                      onChange={(e) => setVitals({...vitals, oxygenLevel: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-danger-900">Blood Loss Estimate *</label>
                  <div className="relative">
                    <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-danger-600 w-5 h-5" />
                    <select
                      className="input-field pl-10 bg-white"
                      value={vitals.bloodLoss}
                      onChange={(e) => setVitals({...vitals, bloodLoss: e.target.value})}
                    >
                      <option value="">Select blood loss</option>
                      <option value="none">No visible bleeding</option>
                      <option value="mild">Mild (Minor cuts)</option>
                      <option value="moderate">Moderate (Noticeable bleeding)</option>
                      <option value="severe">Severe (Heavy bleeding)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-danger-900">Consciousness</label>
                    <select
                      className="input-field bg-white"
                      value={vitals.consciousness}
                      onChange={(e) => setVitals({...vitals, consciousness: e.target.value})}
                    >
                      <option value="">Select level</option>
                      <option value="alert">Alert & Responsive</option>
                      <option value="drowsy">Drowsy</option>
                      <option value="unconscious">Unconscious</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-danger-900">Breathing Rate</label>
                    <input
                      type="number"
                      placeholder="e.g., 16"
                      className="input-field bg-white"
                      value={vitals.breathingRate}
                      onChange={(e) => setVitals({...vitals, breathingRate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Injury Type */}
            <div className="lg:col-span-2 card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Type of Emergency *
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {injuryTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setVitals({...vitals, injuryType: type})}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      vitals.injuryType === type
                        ? 'border-danger-500 bg-danger-50 text-danger-700 font-semibold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Real-Time Ambulance Care Instructions */}
            {selectedInjuryInfo && (
              <div className="lg:col-span-2">
                <div className={`bg-gradient-to-r ${selectedInjuryInfo.color} text-white rounded-xl p-6 shadow-lg border-2 border-white/20`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl">{selectedInjuryInfo.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">{selectedInjuryInfo.title}</h3>
                      <p className="text-white/90 font-semibold">⏱️ {selectedInjuryInfo.critical}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* DO'S */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        ✅ AMBULANCE JOURNEY - DO'S
                      </h4>
                      <ul className="space-y-2">
                        {selectedInjuryInfo.dos.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="bg-green-400 text-green-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-white/95">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DON'TS */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        ❌ CRITICAL - DON'TS
                      </h4>
                      <ul className="space-y-2">
                        {selectedInjuryInfo.donts.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              !
                            </span>
                            <span className="text-white/95">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Monitoring Info */}
                  <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      CONTINUOUS MONITORING
                    </h4>
                    <p className="text-sm text-white/95">{selectedInjuryInfo.monitoring}</p>
                  </div>

                  <div className="mt-4 text-center text-sm text-white/80 italic">
                    💡 These instructions will guide paramedics during ambulance transport to hospital
                  </div>
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <div className="lg:col-span-2">
              <button
                onClick={handleAnalyze}
                disabled={analyzing || !vitals.heartRate || !vitals.temperature || !vitals.oxygenLevel || !vitals.bloodLoss || !vitals.injuryType}
                className="btn-danger w-full py-4 text-lg flex items-center justify-center gap-2 bg-danger-600 hover:bg-danger-700 text-white font-semibold rounded-lg disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    AI Analyzing Critical Vitals...
                  </>
                ) : (
                  <>
                    <Activity className="w-6 h-6" />
                    Analyze & Get AI Decision
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          // Results
          <div className="space-y-6">
            {/* Decision Banner */}
            <div className={`card border-4 ${
              result.decision === 'REFER_TO_CITY' 
                ? 'border-warning-400 bg-warning-50' 
                : 'border-primary-400 bg-primary-50'
            }`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {result.decision === 'REFER_TO_CITY' 
                      ? '🚑 REFER TO CITY HOSPITAL' 
                      : '🏥 E-DOCTOR ASSISTANCE REQUIRED'}
                  </h2>
                  <p className="text-lg text-gray-700">
                    {result.decision === 'REFER_TO_CITY'
                      ? 'Patient can safely reach city hospital. Ambulance ready with pre-registration.'
                      : 'City transfer risky. E-Doctor will assist local team in stabilizing patient.'}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-5xl font-bold mb-1 ${
                    getCurrentRisk().color === 'danger' ? 'text-danger-600' :
                    getCurrentRisk().color === 'warning' ? 'text-warning-600' :
                    'text-success-600'
                  }`}>
                    {Math.round(getCurrentRisk().score)}
                  </div>
                  <div className="text-sm text-gray-600">Risk Score</div>
                  {elapsedMinutes > 0 && (
                    <div className="text-xs text-danger-600 mt-1 font-semibold">
                      {elapsedMinutes} min elapsed
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border-2 border-danger-200">
                  <Clock className="w-6 h-6 text-danger-600 mb-2" />
                  <div className="text-sm text-gray-600">⏱️ TIME LEFT TO SURVIVE</div>
                  <div className="text-3xl font-bold text-danger-600">{getRemainingTime()} min</div>
                  <div className="text-xs text-danger-500 mt-1">
                    {elapsedMinutes > 0 && `${elapsedMinutes} min elapsed | `}
                    Based on current vitals
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-primary-200">
                  <Activity className="w-6 h-6 text-primary-600 mb-2" />
                  <div className="text-sm text-gray-600">🚑 Travel to Best available Hospital</div>
                  <div className="text-3xl font-bold text-primary-600">
                    {Math.max(0, result.travelTime - elapsedMinutes)} min
                  </div>
                  <div className="text-xs text-primary-500 mt-1">
                    {elapsedMinutes > 0 ? `${elapsedMinutes} min traveled | ` : ''}Including traffic
                  </div>
                </div>
                <div className={`bg-white rounded-lg p-4 border-2 ${
                  (getRemainingTime() - Math.max(0, result.travelTime - elapsedMinutes)) > 15 
                    ? 'border-success-400' 
                    : 'border-danger-400'
                }`}>
                  <AlertTriangle className={`w-6 h-6 mb-2 ${
                    (getRemainingTime() - Math.max(0, result.travelTime - elapsedMinutes)) > 15 
                      ? 'text-success-600' 
                      : 'text-danger-600 animate-pulse'
                  }`} />
                  <div className="text-sm text-gray-600">⚠️ Safety Margin</div>
                  <div className={`text-3xl font-bold ${
                    (getRemainingTime() - Math.max(0, result.travelTime - elapsedMinutes)) > 15 
                      ? 'text-success-600' 
                      : 'text-danger-600'
                  }`}>
                    {Math.max(0, getRemainingTime() - Math.max(0, result.travelTime - elapsedMinutes))} min
                  </div>
                  <div className={`text-xs mt-1 font-semibold ${
                    (getRemainingTime() - Math.max(0, result.travelTime - elapsedMinutes)) > 15 
                      ? 'text-success-600' 
                      : 'text-danger-600'
                  }`}>
                    {(getRemainingTime() - Math.max(0, result.travelTime - elapsedMinutes)) > 15 ? '✓ SAFE TO TRANSFER' : '⚠️ HIGH RISK'}
                  </div>
                </div>
              </div>

              {/* Hospital Options - CRITICAL DECISION TABLE */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  🏥 Hospitals You Can Reach in Time
                  <span className="text-sm font-normal text-gray-500">
                    (Within {getRemainingTime()} min remaining survival time)
                  </span>
                </h3>
                
                {result.hospitalOptions.filter(h => h.canReach).length > 0 ? (
                  <>
                    <div className="mb-4 bg-success-50 border border-success-300 rounded-lg p-3 text-sm">
                      <p className="text-success-800">
                        ✓ <strong>{result.hospitalOptions.filter(h => h.canReach).length} hospitals</strong> are reachable within patient's survival time. 
                        Showing best options sorted by time margin and quality.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {result.hospitalOptions.filter(h => h.canReach).map((hospital, idx) => (
                    <div 
                        key={hospital.id}
                        className={`border-2 rounded-lg p-4 ${
                          idx === 0
                            ? 'border-success-500 bg-success-50 shadow-lg'
                            : 'border-gray-300 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-lg">{hospital.name}</h4>
                              {idx === 0 && (
                                <span className="bg-success-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                  ⭐ RECOMMENDED
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              Quality Rating: {'⭐'.repeat(Math.floor(hospital.rating))} {hospital.rating}/5
                            </p>
                          </div>
                          <div className="text-right">
                            <div className={`text-3xl font-bold ${
                              (getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 20 ? 'text-success-600' :
                              (getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 10 ? 'text-warning-600' :
                              'text-orange-600'
                            }`}>
                              {Math.max(0, hospital.actualTravelTime - elapsedMinutes)} min
                            </div>
                            <div className="text-xs text-gray-500">
                              {hospital.distance} km away
                              {elapsedMinutes > 0 && ` | ${elapsedMinutes} min traveled`}
                            </div>
                            <div className={`text-xs font-semibold mt-1 ${
                              (getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 20 ? 'text-success-600' :
                              (getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 10 ? 'text-warning-600' :
                              'text-danger-600'
                            }`}>
                              {(getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 0 
                                ? `✓ ${Math.max(0, getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes))} min extra time`
                                : '⚠ TIME CRITICAL'}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3 mb-3">
                          <div className="bg-white rounded p-2 text-center">
                            <div className="text-xs text-gray-600">ICU Beds</div>
                            <div className={`font-bold ${hospital.icuBeds > 10 ? 'text-success-600' : hospital.icuBeds > 5 ? 'text-warning-600' : 'text-danger-600'}`}>
                              {hospital.icuBeds} Free
                            </div>
                          </div>
                          <div className="bg-white rounded p-2 text-center">
                            <div className="text-xs text-gray-600">Total Beds</div>
                            <div className="font-bold">{hospital.totalBeds}</div>
                          </div>
                          <div className="bg-white rounded p-2 text-center">
                            <div className="text-xs text-gray-600">Est. Cost</div>
                            <div className="font-bold text-primary-600">₹{hospital.totalCost.toLocaleString()}</div>
                          </div>
                          <div className="bg-white rounded p-2 text-center">
                            <div className="text-xs text-gray-600">Safety</div>
                            <div className={`font-bold text-xs ${
                              (getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 20 ? 'text-success-600' :
                              (getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 10 ? 'text-warning-600' :
                              'text-danger-600'
                            }`}>
                              {(getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 20 ? '✓ SAFE' :
                               (getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 10 ? '⚠ MODERATE' : 
                               (getRemainingTime() - Math.max(0, hospital.actualTravelTime - elapsedMinutes)) > 0 ? '⚠ CRITICAL' : '❌ UNSAFE'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs mb-3">
                          <div className="flex gap-2 flex-wrap">
                            {hospital.specialties.slice(0, 3).map((spec, i) => (
                              <span key={i} className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Cost Breakdown */}
                        <div className="pt-3 border-t border-gray-200">
                          <details className="text-sm">
                            <summary className="cursor-pointer font-semibold text-gray-700 hover:text-primary-600">
                              💰 Detailed Cost Breakdown
                            </summary>
                            <div className="mt-2 space-y-1 text-xs bg-gray-50 p-2 rounded">
                              <div className="flex justify-between">
                                <span>Emergency Fee:</span>
                                <span className="font-semibold">₹{hospital.fees.emergency.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Ambulance:</span>
                                <span className="font-semibold">₹{hospital.fees.ambulance.toLocaleString()}</span>
                              </div>
                              {result.riskScore >= 60 && (
                                <div className="flex justify-between">
                                  <span>ICU (24 hours):</span>
                                  <span className="font-semibold">₹{hospital.fees.icu.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-1 border-t border-gray-300 font-bold">
                                <span>Total Initial:</span>
                                <span className="text-primary-600">₹{hospital.totalCost.toLocaleString()}</span>
                              </div>
                              <div className="text-xs text-gray-500 italic mt-1">
                                * Surgery costs (if needed): ₹{hospital.fees.surgery.toLocaleString()}
                              </div>
                            </div>
                          </details>
                        </div>

                        {/* Hospital Contact Numbers */}
                        <div className="pt-3 border-t border-gray-200 mt-3">
                          <div className="text-xs font-semibold text-gray-700 mb-2">📞 Hospital Contact Numbers</div>
                          <div className="space-y-1">
                            {hospital.contactNumbers.map((number, idx) => (
                              <a
                                key={idx}
                                href={`tel:${number}`}
                                className="flex items-center text-xs bg-primary-50 hover:bg-primary-100 text-primary-700 px-2 py-1.5 rounded transition"
                              >
                                <Phone className="w-3 h-3 mr-2" />
                                <span className="font-mono">{number}</span>
                              </a>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 italic mt-2">
                            For price confirmation or admission queries
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
                ) : (
                  <div className="bg-danger-100 border-2 border-danger-400 rounded-lg p-6 text-center">
                    <AlertTriangle className="w-12 h-12 text-danger-600 mx-auto mb-3 animate-pulse" />
                    <h4 className="font-bold text-danger-700 text-lg mb-2">⚠️ NO HOSPITAL REACHABLE IN TIME</h4>
                    <p className="text-danger-600 mb-4">
                      Patient's survival time is <strong>{result.survivalTime} minutes</strong>, but nearest hospital takes <strong>{result.hospitalOptions[0].actualTravelTime} minutes</strong> to reach.
                    </p>
                    <div className="bg-white rounded-lg p-4 text-left">
                      <h5 className="font-bold mb-2">Immediate Action Required:</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 font-bold">1.</span>
                          <span>Click "Connect E-Doctor Now" button below</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 font-bold">2.</span>
                          <span>E-Doctor will guide local hospital in stabilizing patient</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 font-bold">3.</span>
                          <span>Once stable, patient can be transferred to city hospital</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Show unreachable hospitals in collapsed section */}
              {result.hospitalOptions.filter(h => !h.canReach).length > 0 && result.hospitalOptions.filter(h => h.canReach).length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-300">
                  <details>
                    <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
                      ⚠️ {result.hospitalOptions.filter(h => !h.canReach).length} Other Hospitals (TOO FAR - Not Recommended)
                    </summary>
                    <div className="mt-4 space-y-2">
                      {result.hospitalOptions.filter(h => !h.canReach).map((hospital) => (
                        <div key={hospital.id} className="bg-white border border-danger-300 rounded p-3 opacity-60">
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="font-semibold text-gray-700">{hospital.name}</h5>
                              <p className="text-xs text-gray-500">{hospital.distance} km • {hospital.actualTravelTime} min travel</p>
                            </div>
                            <div className="text-right">
                              <div className="text-danger-600 font-bold text-sm">⚠️ RISKY</div>
                              <div className="text-xs text-danger-500">{hospital.timeMargin} min shortage</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}

              {!result.isReachable && result.hospitalOptions.filter(h => h.canReach).length === 0 && (
                <div className="bg-danger-100 border-2 border-danger-400 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-danger-600 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-danger-700 mb-1">⚠️ CRITICAL: E-Doctor Recommended</h4>
                      <p className="text-sm text-danger-600">
                        Patient's survival time ({result.survivalTime} min) is less than travel time to nearest hospital. 
                        <strong className="block mt-2">Click "Connect E-Doctor Now" below to get immediate remote assistance.</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Paperwork Pre-filling Section */}
              {result.isReachable && !showPaperwork && (
                <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-2xl mb-2">📋 Start Ambulance Paperwork</h3>
                      <p className="text-primary-100">
                        Complete registration during ambulance ride - Hospital bed will be ready at gate!
                      </p>
                      <ul className="mt-3 space-y-1 text-sm text-primary-100">
                        <li>✓ No waiting at hospital reception</li>
                        <li>✓ ICU team pre-alerted and ready</li>
                        <li>✓ Doctor briefed with patient history</li>
                        <li>✓ Bed assigned before arrival</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setShowPaperwork(true)}
                      className="bg-white text-primary-600 px-6 py-4 rounded-lg font-bold hover:bg-primary-50 transition-all shadow-lg"
                    >
                      Start Paperwork →
                    </button>
                  </div>
                </div>
              )}

              {/* Paperwork Form */}
              {showPaperwork && !registrationSubmitted && (
                <div className="bg-white rounded-lg p-6 mb-6 border-2 border-primary-400">
                  <h3 className="font-bold text-xl mb-4">📝 Hospital Pre-Registration Form</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Fill this during ambulance journey. Data will be sent to selected hospital immediately.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Hospital Selection */}
                    <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-300 rounded-lg p-4">
                      <label className="block text-sm font-bold mb-2 text-primary-900">
                        🏥 Select Hospital for Registration *
                      </label>
                      <select
                        className="input-field text-base font-semibold"
                        value={paperworkData.selectedHospitalId || result.bestHospital.id}
                        onChange={(e) => setPaperworkData({...paperworkData, selectedHospitalId: parseInt(e.target.value)})}
                      >
                        {result.hospitalOptions.filter(h => h.canReach).map((hospital, idx) => {
                          const selected = (paperworkData.selectedHospitalId || result.bestHospital.id) === hospital.id;
                          return (
                            <option key={hospital.id} value={hospital.id}>
                              {idx === 0 ? '⭐ ' : ''}{hospital.name} - {hospital.actualTravelTime} min, ₹{hospital.totalCost.toLocaleString()} {idx === 0 ? '(RECOMMENDED)' : ''}
                            </option>
                          );
                        })}
                      </select>
                      {(() => {
                        const selectedHospital = result.hospitalOptions.find(h => h.id === (paperworkData.selectedHospitalId || result.bestHospital.id));
                        return selectedHospital && (
                          <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                            <div className="bg-white rounded p-2 text-center">
                              <div className="text-gray-600">Travel Time</div>
                              <div className="font-bold text-primary-600">{selectedHospital.actualTravelTime} min</div>
                            </div>
                            <div className="bg-white rounded p-2 text-center">
                              <div className="text-gray-600">ICU Beds</div>
                              <div className="font-bold text-success-600">{selectedHospital.icuBeds} Free</div>
                            </div>
                            <div className="bg-white rounded p-2 text-center">
                              <div className="text-gray-600">Est. Cost</div>
                              <div className="font-bold text-primary-600">₹{selectedHospital.totalCost.toLocaleString()}</div>
                            </div>
                            <div className="bg-white rounded p-2 text-center">
                              <div className="text-gray-600">Rating</div>
                              <div className="font-bold">⭐ {selectedHospital.rating}</div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Patient Name *</label>
                        <input
                          type="text"
                          className="input-field"
                          value={paperworkData.patientName || patientInfo.name}
                          onChange={(e) => setPaperworkData({...paperworkData, patientName: e.target.value})}
                          placeholder="Enter patient name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Age *</label>
                        <input
                          type="number"
                          className="input-field"
                          value={paperworkData.patientAge || patientInfo.age}
                          onChange={(e) => setPaperworkData({...paperworkData, patientAge: e.target.value})}
                          placeholder="Enter age"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Blood Group *</label>
                      <select
                        className="input-field"
                        value={paperworkData.bloodGroup}
                        onChange={(e) => setPaperworkData({...paperworkData, bloodGroup: e.target.value})}
                      >
                        <option value="">Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Known Allergies</label>
                      <input
                        type="text"
                        placeholder="e.g., Penicillin, Sulfa drugs, None"
                        className="input-field"
                        value={paperworkData.allergies}
                        onChange={(e) => setPaperworkData({...paperworkData, allergies: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Previous Medical Conditions</label>
                      <textarea
                        placeholder="e.g., Diabetes, Hypertension, Heart disease, None"
                        className="input-field"
                        rows="2"
                        value={paperworkData.previousConditions}
                        onChange={(e) => setPaperworkData({...paperworkData, previousConditions: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Emergency Contact Number *</label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        className="input-field"
                        value={paperworkData.emergencyContact}
                        onChange={(e) => setPaperworkData({...paperworkData, emergencyContact: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Insurance Policy Number (Optional)</label>
                      <input
                        type="text"
                        placeholder="Enter if available, else leave blank"
                        className="input-field"
                        value={paperworkData.insuranceNumber}
                        onChange={(e) => setPaperworkData({...paperworkData, insuranceNumber: e.target.value})}
                      />
                    </div>

                    <button
                      onClick={() => {
                        const selectedHospital = result.hospitalOptions.find(h => h.id === (paperworkData.selectedHospitalId || result.bestHospital.id));
                        const bedNumber = Math.floor(Math.random() * 300) + 100;
                        const patientName = paperworkData.patientName || patientInfo.name;
                        const patientAge = paperworkData.patientAge || patientInfo.age;
                        
                        setSubmissionDetails({
                          hospital: selectedHospital,
                          bedNumber,
                          patientName,
                          patientAge,
                          bloodGroup: paperworkData.bloodGroup,
                          emergencyContact: paperworkData.emergencyContact,
                          allergies: paperworkData.allergies,
                          previousConditions: paperworkData.previousConditions,
                          insuranceNumber: paperworkData.insuranceNumber,
                          timestamp: new Date().toLocaleString(),
                          referenceId: `EMR-${bedNumber}-${new Date().getFullYear()}`
                        });
                        setRegistrationSubmitted(true);
                      }}
                      disabled={!paperworkData.bloodGroup || !paperworkData.emergencyContact}
                      className="w-full bg-success-600 text-white py-3 rounded-lg font-bold hover:bg-success-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✅ Send to Hospital & Reserve Bed
                    </button>
                  </div>
                </div>
              )}

              {/* Registration Confirmation */}
              {registrationSubmitted && submissionDetails && (
                <div className="max-w-5xl mx-auto mb-8 animate-fadeIn">
                  {/* Success Header */}
                  <div className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-3xl shadow-2xl overflow-hidden mb-6">
                    <div className="relative p-10 text-center">
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
                      </div>
                      
                      {/* Success Icon */}
                      <div className="relative mb-6">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-xl animate-bounce-subtle">
                          <svg className="w-14 h-14 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                        Pre-Registration Successful! ✅
                      </h1>
                      <p className="text-xl text-emerald-50 font-medium">
                        Hospital has been notified • Bed reserved • Medical team alerted
                      </p>
                    </div>
                  </div>

                  {/* Reference ID Banner */}
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 mb-6 shadow-lg border-4 border-amber-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">🎫</span>
                        <div>
                          <p className="text-amber-900 font-semibold text-sm">Your Reference ID</p>
                          <p className="text-2xl md:text-3xl font-black text-white tracking-wider">{submissionDetails.referenceId}</p>
                        </div>
                      </div>
                      <div className="bg-white/30 backdrop-blur-sm rounded-xl px-6 py-3">
                        <p className="text-orange-900 font-bold text-lg">Keep this safe!</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    {/* Hospital Details Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          🏥 Hospital Details
                        </h3>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🏥</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 font-medium">Hospital Name</p>
                            <p className="text-lg font-bold text-gray-900">{submissionDetails.hospital.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📍</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 font-medium">Location</p>
                            <p className="text-lg font-bold text-gray-900">{submissionDetails.hospital.city}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-purple-50 rounded-xl p-4">
                            <p className="text-sm text-purple-700 font-medium mb-1">Bed Number</p>
                            <p className="text-2xl font-black text-purple-900">#{submissionDetails.bedNumber}</p>
                          </div>
                          <div className="bg-indigo-50 rounded-xl p-4">
                            <p className="text-sm text-indigo-700 font-medium mb-1">ICU Beds</p>
                            <p className="text-2xl font-black text-indigo-900">{submissionDetails.hospital.icuBeds}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Patient Information Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          👤 Patient Information
                        </h3>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium flex items-center gap-2">
                            <span className="text-xl">👤</span> Name
                          </span>
                          <span className="font-bold text-gray-900 text-lg">{submissionDetails.patientName}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium flex items-center gap-2">
                            <span className="text-xl">🎂</span> Age
                          </span>
                          <span className="font-bold text-gray-900 text-lg">{submissionDetails.patientAge} years</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium flex items-center gap-2">
                            <span className="text-xl">🩸</span> Blood Group
                          </span>
                          <span className="font-bold text-red-600 text-lg">{submissionDetails.bloodGroup}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600 font-medium flex items-center gap-2">
                            <span className="text-xl">📞</span> Emergency
                          </span>
                          <span className="font-bold text-gray-900 text-lg">{submissionDetails.emergencyContact}</span>
                        </div>
                        {submissionDetails.allergies && (
                          <div className="bg-red-50 rounded-xl p-3 border border-red-200">
                            <p className="text-sm text-red-700 font-medium mb-1">⚠️ Allergies</p>
                            <p className="text-red-900 font-bold">{submissionDetails.allergies}</p>
                          </div>
                        )}
                        {submissionDetails.previousConditions && (
                          <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                            <p className="text-sm text-orange-700 font-medium mb-1">📋 Previous Conditions</p>
                            <p className="text-orange-900 font-bold">{submissionDetails.previousConditions}</p>
                          </div>
                        )}
                        {submissionDetails.insuranceNumber && (
                          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                            <p className="text-sm text-blue-700 font-medium mb-1">🛡️ Insurance</p>
                            <p className="text-blue-900 font-bold">{submissionDetails.insuranceNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hospital Confirmation Grid */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        ✅ Hospital Confirmation Status
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-emerald-200 text-center">
                          <div className="w-16 h-16 bg-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                            <span className="text-3xl">🛏️</span>
                          </div>
                          <p className="font-bold text-gray-900 mb-1">Bed Reserved</p>
                          <p className="text-2xl font-black text-emerald-600">#{submissionDetails.bedNumber}</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200 text-center">
                          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                            <span className="text-3xl">🏥</span>
                          </div>
                          <p className="font-bold text-gray-900 mb-1">ICU Team</p>
                          <p className="text-2xl font-black text-blue-600">Alerted</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200 text-center">
                          <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                            <span className="text-3xl">👨‍⚕️</span>
                          </div>
                          <p className="font-bold text-gray-900 mb-1">Doctor</p>
                          <p className="text-sm font-black text-purple-600">Dr. Rajesh Kumar</p>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-5 border-2 border-red-200 text-center">
                          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                            <span className="text-3xl">🩸</span>
                          </div>
                          <p className="font-bold text-gray-900 mb-1">Blood Bank</p>
                          <p className="text-2xl font-black text-red-600">{submissionDetails.bloodGroup}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timing & Cost */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        ⏱️ Timing & Cost Estimate
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 text-center">
                          <div className="text-orange-600 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600 font-semibold mb-2">ETA to Hospital</p>
                          <p className="text-4xl font-black text-orange-600 mb-1">{submissionDetails.hospital.actualTravelTime}</p>
                          <p className="text-orange-700 font-bold">minutes</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 text-center">
                          <div className="text-blue-600 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600 font-semibold mb-2">Distance</p>
                          <p className="text-4xl font-black text-blue-600 mb-1">{submissionDetails.hospital.distance}</p>
                          <p className="text-blue-700 font-bold">kilometers</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 text-center">
                          <div className="text-green-600 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600 font-semibold mb-2">Estimated Cost</p>
                          <p className="text-4xl font-black text-green-600 mb-1">₹{submissionDetails.hospital.totalCost.toLocaleString()}</p>
                          <p className="text-green-700 font-bold">total estimated</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ambulance Instructions */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-red-600 to-pink-600 p-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        🚑 Ambulance Instructions
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <span className="text-gray-800 font-semibold">Proceed directly to Emergency Gate B</span>
                        </div>
                        <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <span className="text-gray-800 font-semibold">Medical team will be waiting</span>
                        </div>
                        <div className="flex items-center gap-4 bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <span className="text-gray-800 font-semibold">All paperwork pre-completed</span>
                        </div>
                        <div className="flex items-center gap-4 bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500">
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <span className="text-gray-800 font-semibold">Fast-track admission approved</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-6">
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                      <span className="font-semibold">Registration sent: {submissionDetails.timestamp}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setRegistrationSubmitted(false);
                        setSubmissionDetails(null);
                      }}
                      className="group bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-8 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      <span>Edit Registration</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                      </svg>
                      <span>Print Confirmation</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {!registrationSubmitted && (
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-lg mb-4">AI Recommendations:</h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* In-Transit Care Protocols - CRITICAL FOR AMBULANCE */}
              {result.inTransitProtocols && !registrationSubmitted && (
                <div className="bg-gradient-to-r from-danger-600 to-orange-600 text-white rounded-lg p-6 border-4 border-danger-700">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 animate-pulse" />
                    <div>
                      <h3 className="font-bold text-2xl">AMBULANCE JOURNEY PROTOCOL</h3>
                      <p className="text-danger-100">Follow these steps during entire transport</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-lg font-semibold mb-3">
                      Emergency Type: {result.injuryType}
                    </p>
                    <ul className="space-y-2">
                      {result.inTransitProtocols.map((protocol, index) => (
                        <li key={index} className="flex items-start gap-3 text-white">
                          {protocol.includes('🐍') ? (
                            <span className="text-2xl flex-shrink-0">{protocol}</span>
                          ) : (
                            <>
                              <span className="bg-white/20 px-2 py-1 rounded flex-shrink-0 font-mono text-sm">
                                {protocol.split('.')[0]}
                              </span>
                              <span className="text-white leading-relaxed font-medium">
                                {protocol.includes('.') ? protocol.split('.').slice(1).join('.').trim() : protocol}
                              </span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="font-bold text-lg mb-2">⏱️ TIME IS CRITICAL</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-danger-100">Survival Window:</p>
                        <p className="text-2xl font-bold">{getRemainingTime()} minutes</p>
                        {elapsedMinutes > 0 && (
                          <p className="text-xs text-danger-200 mt-1">{elapsedMinutes} min elapsed</p>
                        )}
                      </div>
                      <div>
                        <p className="text-danger-100">Travel Time to {paperworkData.selectedHospitalId ? 'Selected' : 'Best'} Hospital:</p>
                        <p className="text-2xl font-bold">
                          {(() => {
                            const selectedHospital = result.hospitalOptions.find(h => h.id === (paperworkData.selectedHospitalId || result.bestHospital.id));
                            const remainingTravel = Math.max(0, (selectedHospital?.actualTravelTime || result.travelTime) - elapsedMinutes);
                            return remainingTravel;
                          })()} minutes
                        </p>
                        {elapsedMinutes > 0 && (
                          <p className="text-xs text-danger-200 mt-1">
                            {(() => {
                              const selectedHospital = result.hospitalOptions.find(h => h.id === (paperworkData.selectedHospitalId || result.bestHospital.id));
                              return `${elapsedMinutes} min traveled | ${selectedHospital?.name || result.bestHospital.name}`;
                            })()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {result.injuryType === 'Snake Bite' && (
                    <div className="mt-4 bg-danger-800 rounded-lg p-4 border-2 border-white">
                      <p className="font-bold text-lg mb-2">🐍 SNAKE BITE - CRITICAL DO's & DON'Ts</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold mb-2 text-success-300">✅ DO THIS:</p>
                          <ul className="text-sm space-y-1">
                            <li>• Keep patient absolutely still</li>
                            <li>• Remove jewelry immediately</li>
                            <li>• Mark bite time on skin</li>
                            <li>• Immobilize bitten limb</li>
                            <li>• Bring dead snake if safe</li>
                            <li>• Monitor breathing constantly</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold mb-2 text-danger-300">❌ NEVER DO:</p>
                          <ul className="text-sm space-y-1">
                            <li>• DON'T cut the wound</li>
                            <li>• DON'T suck out venom</li>
                            <li>• DON'T apply ice</li>
                            <li>• DON'T use tourniquet</li>
                            <li>• DON'T give alcohol/caffeine</li>
                            <li>• DON'T let patient walk</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-3 bg-warning-600 text-white p-3 rounded">
                        <p className="font-bold">⚠️ ANTIVENOM TIMING: Critical within 4 hours of bite!</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-4">
              <a 
                href="tel:108"
                className="btn-danger py-4 flex items-center justify-center gap-2 bg-danger-600 hover:bg-danger-700 text-white rounded-lg font-semibold no-underline"
              >
                <Phone className="w-5 h-5" />
                Call Ambulance (108)
              </a>
              
              {result.decision === 'E_DOCTOR_ASSIST' ? (
                <Link 
                  to="/e-doctor"
                  className="btn-primary py-4 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold no-underline"
                >
                  <Activity className="w-5 h-5" />
                  Connect E-Doctor Now
                </Link>
              ) : (
                <Link 
                  to="/e-doctor"
                  className="btn-success py-4 flex items-center justify-center gap-2 bg-success-600 hover:bg-success-700 text-white rounded-lg font-semibold no-underline"
                >
                  <Activity className="w-5 h-5" />
                  E-Doctor Backup Option
                </Link>
              )}
              
              <button 
                onClick={() => {
                  setResult(null);
                  setShowPaperwork(false);
                  setPaperworkData({
                    bloodGroup: '',
                    allergies: '',
                    previousConditions: '',
                    emergencyContact: '',
                    insuranceNumber: '',
                    selectedHospitalId: null
                  });
                }}
                className="btn-secondary py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
              >
                New Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyAssessment;
