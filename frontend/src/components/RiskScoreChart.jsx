import { AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

const RiskScoreChart = ({ score }) => {
  const getScoreLevel = (score) => {
    if (score >= 75) return { level: 'High Risk', color: 'danger', Icon: AlertTriangle };
    if (score >= 50) return { level: 'Medium Risk', color: 'warning', Icon: TrendingUp };
    return { level: 'Low Risk', color: 'success', Icon: CheckCircle };
  };

  const { level, color, Icon } = getScoreLevel(score);

  const colorClasses = {
    danger: {
      bg: 'bg-danger-600',
      text: 'text-danger-600',
      light: 'bg-danger-100',
      border: 'border-danger-300'
    },
    warning: {
      bg: 'bg-warning-600',
      text: 'text-warning-600',
      light: 'bg-warning-100',
      border: 'border-warning-300'
    },
    success: {
      bg: 'bg-success-600',
      text: 'text-success-600',
      light: 'bg-success-100',
      border: 'border-success-300'
    }
  };

  const classes = colorClasses[color];

  return (
    <div>
      {/* Score Display */}
      <div className={`${classes.light} border-2 ${classes.border} rounded-xl p-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-6 h-6 ${classes.text}`} />
              <h3 className="text-2xl font-bold">{level}</h3>
            </div>
            <p className="text-gray-600">Based on AI analysis</p>
          </div>
          <div className="text-center">
            <div className={`text-6xl font-bold ${classes.text}`}>{score}</div>
            <div className="text-sm text-gray-600">out of 100</div>
          </div>
        </div>
      </div>

      {/* Visual Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Risk Level Breakdown</span>
          <span>{score}%</span>
        </div>
        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${classes.bg} transition-all duration-1000 ease-out flex items-center justify-end pr-3`}
            style={{ width: `${score}%` }}
          >
            {score > 20 && <span className="text-white text-xs font-semibold">{score}%</span>}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Low (0-49)</span>
          <span>Medium (50-74)</span>
          <span>High (75-100)</span>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Symptom Severity</div>
          <div className={`text-2xl font-bold ${classes.text}`}>
            {score >= 75 ? 'High' : score >= 50 ? 'Medium' : 'Low'}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Medical History</div>
          <div className={`text-2xl font-bold ${classes.text}`}>
            {score >= 75 ? 'Concerning' : score >= 50 ? 'Relevant' : 'Normal'}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Urgency Level</div>
          <div className={`text-2xl font-bold ${classes.text}`}>
            {score >= 75 ? 'Immediate' : score >= 50 ? 'Soon' : 'Routine'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskScoreChart;
