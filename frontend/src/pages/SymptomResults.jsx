import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Brain, Stethoscope, Activity, AlertTriangle, CheckCircle, Info, ArrowRight, Pill, Droplet, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';

const SymptomResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get patient data from navigation state or localStorage
    const data = location.state?.patientData || JSON.parse(localStorage.getItem('lastSymptomCheck') || '{}');
    setPatientData(data);

    // Simulate AI analysis
    setTimeout(() => {
      const analysis = generateAIAnalysis(data);
      setAiAnalysis(analysis);
      setLoading(false);
    }, 2000);
  }, [location]);

  const generateAIAnalysis = (data) => {
    // Mock AI analysis based on symptoms
    const hasChestPain = data?.symptoms?.includes('Chest Pain');
    const hasFever = data?.symptoms?.includes('Fever');
    const hasHeadache = data?.symptoms?.includes('Headache');
    const hasCough = data?.symptoms?.includes('Cough');
    const hasBodyPain = data?.symptoms?.includes('Body Pain');
    const hasDiarrhea = data?.symptoms?.includes('Diarrhea');
    const hasNausea = data?.symptoms?.includes('Nausea');
    const hasSkinRash = data?.symptoms?.includes('Skin Rash');

    let condition = 'General Health Assessment';
    let riskLevel = 'Low';
    let recommendations = [];
    let medicines = [];
    let detailedAdvice = [];
    let urgency = 'Non-Urgent';

    if (hasChestPain) {
      condition = 'Possible Cardiac Concern';
      riskLevel = 'High';
      urgency = 'Urgent - Consult Immediately';
      recommendations = [
        'Seek immediate medical attention',
        'Avoid physical exertion',
        'Monitor blood pressure regularly',
        'Get ECG and cardiac enzyme tests',
        'Consider emergency room visit if symptoms worsen'
      ];
      medicines = [
        {
          name: 'Aspirin',
          dosage: '75-100mg once daily (only if prescribed)',
          timing: 'After meals',
          duration: 'As directed by doctor',
          warning: '⚠️ Do not self-medicate. Consult doctor immediately for chest pain.'
        }
      ];
      detailedAdvice = [
        {
          title: 'Immediate Actions',
          points: [
            'Sit down and rest immediately',
            'Loosen tight clothing',
            'If prescribed, take nitroglycerin as directed',
            'Call emergency services if pain persists beyond 5 minutes'
          ]
        },
        {
          title: 'When to Call 108/Emergency',
          points: [
            'Chest pain lasting more than 5 minutes',
            'Pain spreading to arm, jaw, or back',
            'Difficulty breathing or shortness of breath',
            'Sweating, nausea, or dizziness with chest pain'
          ]
        }
      ];
    } else if (hasFever && hasCough) {
      condition = 'Respiratory Infection';
      riskLevel = 'Medium';
      urgency = 'Moderate - Consult within 24 hours';
      recommendations = [
        'Rest and stay hydrated',
        'Monitor temperature regularly',
        'Take prescribed fever medication',
        'Get chest X-ray if symptoms persist',
        'Avoid close contact with others'
      ];
      medicines = [
        {
          name: 'Paracetamol (Dolo/Crocin)',
          dosage: '500-650mg every 4-6 hours',
          timing: 'After meals',
          duration: 'Maximum 3-4 days',
          warning: 'Do not exceed 4000mg per day'
        },
        {
          name: 'Cetirizine',
          dosage: '10mg once daily',
          timing: 'At bedtime',
          duration: '3-5 days',
          warning: 'May cause drowsiness'
        },
        {
          name: 'Cough Syrup (Benadryl/Ascoril)',
          dosage: '10ml three times a day',
          timing: 'After meals',
          duration: '5-7 days',
          warning: 'Avoid driving after taking'
        }
      ];
      detailedAdvice = [
        {
          title: 'Home Care Tips',
          points: [
            'Drink warm water with honey and lemon',
            'Gargle with warm salt water 3-4 times daily',
            'Use steam inhalation for congestion relief',
            'Keep room well-ventilated',
            'Avoid cold foods and drinks'
          ]
        },
        {
          title: 'Hydration & Diet',
          points: [
            'Drink at least 8-10 glasses of water daily',
            'Consume warm soups and broths',
            'Eat light, easily digestible foods',
            'Include vitamin C rich fruits (oranges, guava)',
            'Avoid spicy and oily foods'
          ]
        },
        {
          title: 'Monitor These Symptoms',
          points: [
            'Temperature above 102°F for more than 3 days',
            'Difficulty breathing or rapid breathing',
            'Chest pain or pressure',
            'Blood in cough or phlegm',
            'Severe weakness or dizziness'
          ]
        }
      ];
    } else if (hasFever && hasBodyPain) {
      condition = 'Viral Fever / Flu';
      riskLevel = 'Medium';
      urgency = 'Moderate - Consult within 24 hours';
      recommendations = [
        'Complete bed rest for 2-3 days',
        'Stay hydrated with fluids',
        'Monitor temperature every 4 hours',
        'Avoid going out in public places',
        'Maintain good hygiene'
      ];
      medicines = [
        {
          name: 'Paracetamol',
          dosage: '500mg every 6 hours',
          timing: 'After meals',
          duration: '3-5 days',
          warning: 'Take only when fever is above 100°F'
        },
        {
          name: 'Ibuprofen',
          dosage: '400mg twice daily',
          timing: 'After meals',
          duration: '2-3 days for body pain',
          warning: 'Do not take on empty stomach'
        }
      ];
      detailedAdvice = [
        {
          title: 'Rest & Recovery',
          points: [
            'Get 8-10 hours of sleep',
            'Avoid physical exertion',
            'Take lukewarm water baths to reduce fever',
            'Wear light, comfortable clothing',
            'Keep room temperature moderate'
          ]
        },
        {
          title: 'Nutrition',
          points: [
            'Eat small, frequent meals',
            'Include protein-rich foods for recovery',
            'Drink coconut water for electrolytes',
            'Consume fresh fruit juices',
            'Avoid processed and junk food'
          ]
        }
      ];
    } else if (hasHeadache) {
      condition = 'Headache/Migraine Assessment';
      riskLevel = 'Low';
      urgency = 'Non-Urgent - Schedule Consultation';
      recommendations = [
        'Stay hydrated and rest in a quiet room',
        'Avoid screen time and bright lights',
        'Monitor headache patterns',
        'Consider lifestyle factors (stress, sleep)',
        'Consult if headaches persist or worsen'
      ];
      medicines = [
        {
          name: 'Paracetamol',
          dosage: '500-650mg when needed',
          timing: 'After meals',
          duration: 'As needed, not more than 3 consecutive days',
          warning: 'Avoid overuse to prevent rebound headaches'
        },
        {
          name: 'Ibuprofen',
          dosage: '400mg when needed',
          timing: 'After meals',
          duration: 'Occasional use only',
          warning: 'Not suitable if you have stomach issues'
        }
      ];
      detailedAdvice = [
        {
          title: 'Immediate Relief',
          points: [
            'Rest in a dark, quiet room',
            'Apply cold compress to forehead',
            'Practice deep breathing exercises',
            'Gently massage temples and neck',
            'Drink plenty of water'
          ]
        },
        {
          title: 'Prevention Tips',
          points: [
            'Maintain regular sleep schedule (7-8 hours)',
            'Avoid skipping meals',
            'Reduce screen time, especially before bed',
            'Manage stress with meditation or yoga',
            'Limit caffeine and alcohol intake',
            'Stay hydrated throughout the day'
          ]
        }
      ];
    } else if (hasDiarrhea || hasNausea) {
      condition = 'Gastroenteritis / Stomach Infection';
      riskLevel = 'Medium';
      urgency = 'Moderate - Consult if symptoms persist';
      recommendations = [
        'Stay hydrated with ORS solution',
        'Eat bland, easy-to-digest foods',
        'Avoid dairy products temporarily',
        'Maintain hand hygiene',
        'Monitor for dehydration signs'
      ];
      medicines = [
        {
          name: 'ORS (Oral Rehydration Solution)',
          dosage: '1 sachet in 1 liter water, sip frequently',
          timing: 'Throughout the day',
          duration: 'Until symptoms improve',
          warning: 'Essential to prevent dehydration'
        },
        {
          name: 'Loperamide (Imodium)',
          dosage: '2mg after each loose stool',
          timing: 'As needed',
          duration: 'Maximum 2 days',
          warning: 'Do not use if you have high fever or blood in stool'
        },
        {
          name: 'Probiotics (Econorm)',
          dosage: '1 sachet twice daily',
          timing: 'After meals',
          duration: '5-7 days',
          warning: 'Helps restore gut bacteria'
        }
      ];
      detailedAdvice = [
        {
          title: 'Diet Recommendations',
          points: [
            'BRAT diet: Bananas, Rice, Applesauce, Toast',
            'Drink clear broths and soups',
            'Avoid spicy, oily, and fried foods',
            'No dairy products for 24-48 hours',
            'Small, frequent meals instead of large meals'
          ]
        },
        {
          title: 'Hydration is Critical',
          points: [
            'Drink ORS after each episode',
            'Coconut water for natural electrolytes',
            'Avoid caffeinated and carbonated drinks',
            'Monitor urine color (should be light yellow)',
            'Seek immediate help if unable to keep fluids down'
          ]
        }
      ];
    } else if (hasSkinRash) {
      condition = 'Allergic Reaction / Dermatitis';
      riskLevel = 'Low';
      urgency = 'Non-Urgent - Consult if worsens';
      recommendations = [
        'Avoid scratching the affected area',
        'Keep skin clean and dry',
        'Identify and avoid allergens',
        'Wear loose, cotton clothing',
        'Consult dermatologist if persists'
      ];
      medicines = [
        {
          name: 'Cetirizine (Antihistamine)',
          dosage: '10mg once daily',
          timing: 'At bedtime',
          duration: '5-7 days',
          warning: 'May cause drowsiness'
        },
        {
          name: 'Calamine Lotion',
          dosage: 'Apply to affected area 2-3 times daily',
          timing: 'After cleaning the area',
          duration: 'Until rash subsides',
          warning: 'For external use only'
        },
        {
          name: 'Hydrocortisone Cream (1%)',
          dosage: 'Apply thin layer twice daily',
          timing: 'Morning and night',
          duration: 'Maximum 7 days',
          warning: 'Do not use on face without doctor advice'
        }
      ];
      detailedAdvice = [
        {
          title: 'Skin Care',
          points: [
            'Keep affected area clean with mild soap',
            'Pat dry, do not rub',
            'Apply moisturizer to prevent dryness',
            'Take cool showers, avoid hot water',
            'Trim nails to prevent scratching damage'
          ]
        },
        {
          title: 'Avoid Triggers',
          points: [
            'Identify new cosmetics, detergents, or foods',
            'Avoid synthetic fabrics',
            'Stay away from known allergens',
            'Reduce sun exposure',
            'Avoid harsh soaps and perfumes'
          ]
        }
      ];
    } else {
      recommendations = [
        'Maintain a healthy lifestyle',
        'Stay hydrated and get adequate rest',
        'Monitor your symptoms',
        'Consult a doctor if symptoms persist',
        'Follow preventive health measures'
      ];
      medicines = [
        {
          name: 'General Wellness',
          dosage: 'Multivitamin - 1 tablet daily',
          timing: 'After breakfast',
          duration: 'Ongoing',
          warning: 'Consult doctor before starting any supplements'
        }
      ];
      detailedAdvice = [
        {
          title: 'Healthy Lifestyle',
          points: [
            'Exercise 30 minutes daily',
            'Eat balanced, nutritious meals',
            'Sleep 7-8 hours per night',
            'Drink 8-10 glasses of water daily',
            'Regular health check-ups'
          ]
        }
      ];
    }

    return {
      condition,
      riskLevel,
      urgency,
      recommendations,
      medicines,
      detailedAdvice,
      confidenceScore: Math.floor(Math.random() * 15) + 85,
      estimatedConsultationFee: riskLevel === 'High' ? 800 : riskLevel === 'Medium' ? 500 : 300
    };
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      default: return 'success';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mb-6"></div>
          <h2 className="text-2xl font-bold mb-2">AI is Analyzing Your Symptoms...</h2>
          <p className="text-gray-600">Please wait while we process your information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Health Analysis</h1>
          <p className="text-gray-600">Based on your symptoms, here's what we found</p>
        </div>

        {/* Patient Info Summary */}
        <div className="card mb-6 bg-gradient-to-r from-primary-50 to-purple-50">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <p className="text-sm text-gray-600">Patient Name</p>
              <p className="font-semibold">{patientData?.name || 'N/A'}</p>
            </div>
            <div className="border-l pl-4">
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-semibold">{patientData?.age || 'N/A'} years</p>
            </div>
            <div className="border-l pl-4">
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-semibold">{patientData?.gender || 'N/A'}</p>
            </div>
            <div className="border-l pl-4">
              <p className="text-sm text-gray-600">Reference ID</p>
              <p className="font-semibold text-primary-600">HC{Math.floor(Math.random() * 100000)}</p>
            </div>
          </div>
        </div>

        {/* AI Analysis Results */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Condition Card */}
          <div className="card bg-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Brain className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-700">Detected Condition</h3>
            </div>
            <p className="text-xl font-bold text-gray-800">{aiAnalysis?.condition}</p>
            <p className="text-sm text-gray-500 mt-2">AI Confidence: {aiAnalysis?.confidenceScore}%</p>
          </div>

          {/* Risk Level Card */}
          <div className={`card bg-${getRiskColor(aiAnalysis?.riskLevel)}-50 border-${getRiskColor(aiAnalysis?.riskLevel)}-200`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 bg-${getRiskColor(aiAnalysis?.riskLevel)}-100 rounded-lg`}>
                <AlertTriangle className={`w-6 h-6 text-${getRiskColor(aiAnalysis?.riskLevel)}-600`} />
              </div>
              <h3 className="font-semibold text-gray-700">Risk Level</h3>
            </div>
            <p className={`text-xl font-bold text-${getRiskColor(aiAnalysis?.riskLevel)}-800`}>
              {aiAnalysis?.riskLevel} Risk
            </p>
            <p className="text-sm text-gray-600 mt-2">{aiAnalysis?.urgency}</p>
          </div>

          {/* Consultation Fee */}
          <div className="card bg-success-50 border-success-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-success-100 rounded-lg">
                <Stethoscope className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="font-semibold text-gray-700">Consultation Fee</h3>
            </div>
            <p className="text-xl font-bold text-success-800">
              ₹{aiAnalysis?.estimatedConsultationFee}
            </p>
            <p className="text-sm text-gray-600 mt-2">Estimated cost</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-bold">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {aiAnalysis?.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Medicines */}
        {aiAnalysis?.medicines && aiAnalysis.medicines.length > 0 && (
          <div className="card mb-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Pill className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Recommended Medicines</h3>
            </div>
            
            <div className="space-y-4">
              {aiAnalysis.medicines.map((medicine, idx) => (
                <div key={idx} className="bg-white border border-green-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-800">{medicine.name}</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Medicine #{idx + 1}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-start gap-2">
                      <Droplet className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Dosage</p>
                        <p className="font-semibold text-gray-800">{medicine.dosage}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Timing</p>
                        <p className="font-semibold text-gray-800">{medicine.timing}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Activity className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-gray-800">{medicine.duration}</p>
                      </div>
                    </div>
                  </div>
                  
                  {medicine.warning && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-yellow-800">
                        <span className="font-semibold">⚠️ Important: </span>
                        {medicine.warning}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-red-800">
                <strong>⚠️ Disclaimer:</strong> These are AI-suggested medicines for informational purposes only. 
                Please consult a qualified doctor before taking any medication. Do not self-medicate.
              </p>
            </div>
          </div>
        )}

        {/* Detailed Health Advice */}
        {aiAnalysis?.detailedAdvice && aiAnalysis.detailedAdvice.length > 0 && (
          <div className="card mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-primary-600" />
              <h3 className="text-xl font-bold">Detailed Health Advice</h3>
            </div>
            
            <div className="space-y-6">
              {aiAnalysis.detailedAdvice.map((advice, idx) => (
                <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-200">
                  <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">
                      {idx + 1}
                    </span>
                    {advice.title}
                  </h4>
                  <ul className="space-y-2">
                    {advice.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Notice */}
        <div className="card bg-blue-50 border-blue-200 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Important Notice</h4>
              <p className="text-sm text-blue-700">
                This AI analysis is for informational purposes only and should not replace professional medical advice. 
                Please consult with a qualified healthcare provider for accurate diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/mri-analysis', { state: { patientData, aiAnalysis } })}
            className="btn-secondary py-4 flex items-center justify-center gap-2 text-lg"
          >
            <Brain className="w-6 h-6" />
            AI Review (MRI Analysis)
          </button>
          
          <button
            onClick={() => navigate('/doctor-selection', { state: { patientData, aiAnalysis } })}
            className="btn-primary py-4 flex items-center justify-center gap-2 text-lg"
          >
            <Stethoscope className="w-6 h-6" />
            Consult with E-Doctor
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Symptoms Summary */}
        <div className="card">
          <h3 className="font-bold text-lg mb-3">Your Reported Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {patientData?.symptoms?.map((symptom, idx) => (
              <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                {symptom}
              </span>
            ))}
          </div>
          {patientData?.medicalHistory && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-1">Medical History</p>
              <p className="text-gray-800">{patientData.medicalHistory}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomResults;
