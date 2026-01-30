import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Brain, Image as ImageIcon, CheckCircle, AlertTriangle, Stethoscope, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';

const MRIAnalysis = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [scanType, setScanType] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Mock AI results based on scan type
      const mockResults = {
        'brain-mri': {
          diagnosis: 'Normal Brain MRI',
          confidence: 92,
          findings: [
            'No signs of hemorrhage or mass effect',
            'Normal ventricle size and position',
            'No abnormal signal intensity detected',
            'White matter appears healthy'
          ],
          recommendations: [
            'No immediate medical intervention required',
            'Continue routine health checkups',
            'Maintain healthy lifestyle'
          ],
          riskLevel: 'Low',
          detailedAnalysis: 'AI analysis shows normal brain structure with no concerning abnormalities. All major brain regions appear healthy and properly formed.'
        },
        'chest-xray': {
          diagnosis: 'Possible Pneumonia - Left Lower Lobe',
          confidence: 85,
          findings: [
            'Opacity detected in left lower lobe',
            'Increased density suggesting infiltration',
            'No pleural effusion visible',
            'Heart size within normal limits'
          ],
          recommendations: [
            'Immediate consultation with pulmonologist',
            'Sputum culture test recommended',
            'Complete blood count (CBC) needed',
            'Start antibiotic therapy as per doctor'
          ],
          riskLevel: 'Medium-High',
          detailedAnalysis: 'AI detected abnormal opacity in the left lower lung region consistent with possible pneumonia. Medical attention recommended within 24-48 hours.'
        },
        'bone-xray': {
          diagnosis: 'Hairline Fracture Detected',
          confidence: 88,
          findings: [
            'Thin fracture line visible in distal radius',
            'No significant displacement',
            'Surrounding soft tissue swelling',
            'Joint alignment maintained'
          ],
          recommendations: [
            'Immobilization with cast/splint',
            'Pain management (as per doctor)',
            'Follow-up X-ray in 2 weeks',
            'Avoid weight-bearing activities'
          ],
          riskLevel: 'Medium',
          detailedAnalysis: 'AI detected a non-displaced hairline fracture. With proper immobilization and care, healing expected in 4-6 weeks.'
        },
        'ct-scan': {
          diagnosis: 'Normal Abdominal CT Scan',
          confidence: 94,
          findings: [
            'Liver, spleen, and kidneys normal size',
            'No masses or lesions detected',
            'No signs of inflammation',
            'Normal bowel gas pattern'
          ],
          recommendations: [
            'No treatment required',
            'Maintain regular diet',
            'Continue healthy lifestyle'
          ],
          riskLevel: 'Low',
          detailedAnalysis: 'Comprehensive AI analysis of abdominal organs shows no abnormalities. All structures appear healthy and functioning normally.'
        }
      };

      setResult(mockResults[scanType] || mockResults['brain-mri']);
      setAnalyzing(false);
    }, 3000);
  };

  const scanTypes = [
    { value: 'brain-mri', label: 'Brain MRI', icon: '🧠' },
    { value: 'chest-xray', label: 'Chest X-Ray', icon: '🫁' },
    { value: 'bone-xray', label: 'Bone X-Ray', icon: '🦴' },
    { value: 'ct-scan', label: 'CT Scan', icon: '⚕️' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar userType="patient" />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/patient" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Medical Image Analysis</h1>
          <p className="text-gray-600">Upload MRI, X-Ray, or CT scan for instant AI-powered analysis</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Upload Medical Image</h2>
              
              {/* Scan Type Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Scan Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  {scanTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setScanType(type.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        scanType === type.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <div className="text-sm font-semibold">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                {!preview ? (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload your medical scan image</p>
                    <p className="text-sm text-gray-500 mb-4">Supports: JPG, PNG, DICOM (Max 10MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="mri-upload"
                    />
                    <label htmlFor="mri-upload" className="btn-primary cursor-pointer">
                      Choose File
                    </label>
                  </>
                ) : (
                  <div>
                    <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg mb-4" />
                    <p className="text-sm text-gray-600 mb-4">{selectedFile.name}</p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={analyzeImage}
                        disabled={!scanType || analyzing}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Brain className="w-5 h-5" />
                        {analyzing ? 'Analyzing...' : 'Analyze with AI'}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreview(null);
                          setResult(null);
                        }}
                        className="btn-secondary"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Analyzing Animation */}
              {analyzing && (
                <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold text-primary-800 mb-2">AI Analysis in Progress...</p>
                  <p className="text-sm text-primary-600">Processing medical image with deep learning models</p>
                  <div className="mt-4 w-full bg-primary-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Info Card */}
            <div className="card bg-gradient-to-br from-purple-50 to-primary-50">
              <h3 className="text-lg font-bold mb-3">How It Works</h3>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs">1</span>
                  <span>Select scan type (MRI, X-Ray, CT Scan)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs">2</span>
                  <span>Upload medical image</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs">3</span>
                  <span>AI analyzes image using deep learning</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs">4</span>
                  <span>Get instant diagnosis and recommendations</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {result ? (
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    result.riskLevel === 'Low' ? 'bg-success-100' :
                    result.riskLevel.includes('High') ? 'bg-danger-100' :
                    'bg-warning-100'
                  }`}>
                    {result.riskLevel === 'Low' ? (
                      <CheckCircle className="w-6 h-6 text-success-600" />
                    ) : (
                      <AlertTriangle className={`w-6 h-6 ${
                        result.riskLevel.includes('High') ? 'text-danger-600' : 'text-warning-600'
                      }`} />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">AI Analysis Results</h2>
                    <p className="text-sm text-gray-600">Confidence: {result.confidence}%</p>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className={`p-4 rounded-lg mb-6 ${
                  result.riskLevel === 'Low' ? 'bg-success-50 border border-success-200' :
                  result.riskLevel.includes('High') ? 'bg-danger-50 border border-danger-200' :
                  'bg-warning-50 border border-warning-200'
                }`}>
                  <h3 className="font-bold mb-2">Diagnosis:</h3>
                  <p className={`text-lg font-semibold ${
                    result.riskLevel === 'Low' ? 'text-success-800' :
                    result.riskLevel.includes('High') ? 'text-danger-800' :
                    'text-warning-800'
                  }`}>
                    {result.diagnosis}
                  </p>
                </div>

                {/* Detailed Analysis */}
                <div className="mb-6">
                  <h3 className="font-bold mb-2">AI Analysis:</h3>
                  <p className="text-gray-700">{result.detailedAnalysis}</p>
                </div>

                {/* Findings */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Key Findings:</h3>
                  <ul className="space-y-2">
                    {result.findings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                  <h3 className="font-bold mb-3">Recommendations:</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary-600 font-bold">→</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk Level */}
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-600 mb-2">Risk Level</div>
                  <div className={`inline-flex px-6 py-3 rounded-full text-lg font-bold ${
                    result.riskLevel === 'Low' ? 'bg-success-100 text-success-700' :
                    result.riskLevel.includes('High') ? 'bg-danger-100 text-danger-700' :
                    'bg-warning-100 text-warning-700'
                  }`}>
                    {result.riskLevel}
                  </div>
                </div>

                {/* E-Doctor Consultation */}
                <div className="bg-gradient-to-br from-primary-50 to-purple-50 border-2 border-primary-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Stethoscope className="w-6 h-6 text-primary-600" />
                    <h3 className="text-lg font-bold text-gray-800">Consult with E-Doctor</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Get expert medical opinion on your MRI report. Choose AI-recommended specialist or select your preferred doctor.
                  </p>
                  <button
                    onClick={() => {
                      const mriData = {
                        name: 'MRI Patient',
                        reportType: scanType,
                        diagnosis: result.diagnosis,
                        riskLevel: result.riskLevel,
                        confidence: result.confidence,
                        findings: result.findings,
                        scanImage: preview
                      };
                      localStorage.setItem('lastSymptomCheck', JSON.stringify(mriData));
                      navigate('/doctor-selection', {
                        state: {
                          patientData: mriData,
                          aiAnalysis: {
                            condition: result.diagnosis,
                            riskLevel: result.riskLevel.includes('High') ? 'High' : result.riskLevel.includes('Low') ? 'Low' : 'Medium',
                            urgency: result.detailedAnalysis,
                            medicines: []
                          },
                          fromMRI: true
                        }
                      });
                    }}
                    className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-purple-700 transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Consult E-Doctor Now
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link to="/hospital-finder" className="btn-primary flex-1">
                    Find Nearby Hospitals
                  </Link>
                  <button className="btn-secondary flex-1">
                    Download Report
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                  <p className="text-sm text-warning-800">
                    ⚠️ <strong>Medical Disclaimer:</strong> AI results are for reference only. Always consult a qualified doctor for final diagnosis and treatment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="card text-center py-16">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Upload an image to see AI analysis results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MRIAnalysis;
