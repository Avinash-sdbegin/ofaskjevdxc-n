import { Link } from 'react-router-dom';
import { User, MapPin, Clock, Image, ChevronRight, AlertTriangle, Calendar, Sparkles } from 'lucide-react';

const PatientCard = ({ patient }) => {
  const severityConfig = {
    High: {
      badge: 'badge-high',
      border: 'border-danger-300',
      bg: 'bg-danger-50',
      glow: 'shadow-danger-200'
    },
    Medium: {
      badge: 'badge-medium',
      border: 'border-warning-300',
      bg: 'bg-warning-50',
      glow: 'shadow-warning-200'
    },
    Low: {
      badge: 'badge-low',
      border: 'border-success-300',
      bg: 'bg-success-50',
      glow: 'shadow-success-200'
    }
  };

  const config = severityConfig[patient.severity];

  return (
    <Link to={`/doctor/patient/${patient.id}`}>
      <div className={`card hover:shadow-xl transition-all duration-300 border-2 ${config.border} ${patient.severity === 'High' ? 'animate-pulse-slow' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Patient Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 ${config.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <User className={`w-6 h-6 text-${patient.severity === 'High' ? 'danger' : patient.severity === 'Medium' ? 'warning' : 'success'}-600`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{patient.name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span>{patient.age} yrs • {patient.gender}</span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {patient.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={config.badge}>
                  {patient.severity} Priority
                </span>
                {patient.severity === 'High' && (
                  <span className="flex items-center text-danger-600 text-sm font-semibold">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Urgent
                  </span>
                )}
              </div>
            </div>

            {/* Symptoms */}
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2 font-medium">Symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {patient.symptoms.slice(0, 4).map((symptom, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {symptom}
                  </span>
                ))}
                {patient.symptoms.length > 4 && (
                  <span className="text-primary-600 text-sm font-medium">
                    +{patient.symptoms.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* AI Insight */}
            <div className={`${config.bg} border ${config.border} rounded-lg p-3 mb-3`}>
              <p className="text-sm font-semibold mb-1">AI Insight:</p>
              <p className="text-sm text-gray-700">{patient.aiInsight}</p>
            </div>

            {/* Appointment Details (if booked) */}
            {patient.isBooked && patient.appointmentTime && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-800">
                      Appointment: {patient.appointmentTime}
                    </span>
                  </div>
                  {patient.isAIAllotted && (
                    <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      AI Recommended
                    </div>
                  )}
                  {!patient.isAIAllotted && patient.selectionMethod && (
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Manual Selection
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {patient.submittedAt}
              </span>
              {patient.hasImages && (
                <span className="flex items-center text-primary-600 font-medium">
                  <Image className="w-4 h-4 mr-1" />
                  {patient.imageCount} images
                </span>
              )}
              <span className="font-semibold">Case ID: {patient.id}</span>
            </div>
          </div>

          {/* Risk Score */}
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Risk Score</div>
              <div className={`text-4xl font-bold ${
                patient.riskScore >= 75 ? 'text-danger-600' : 
                patient.riskScore >= 50 ? 'text-warning-600' : 
                'text-success-600'
              }`}>
                {patient.riskScore}
              </div>
              <div className="text-xs text-gray-500">out of 100</div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PatientCard;
