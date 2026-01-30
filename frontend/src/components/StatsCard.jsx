const StatsCard = ({ title, value, icon: Icon, color = 'primary', pulse = false }) => {
  const colorConfig = {
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-600',
      border: 'border-primary-200'
    },
    danger: {
      bg: 'bg-danger-50',
      text: 'text-danger-600',
      border: 'border-danger-200'
    },
    warning: {
      bg: 'bg-warning-50',
      text: 'text-warning-600',
      border: 'border-warning-200'
    },
    success: {
      bg: 'bg-success-50',
      text: 'text-success-600',
      border: 'border-success-200'
    }
  };

  const config = colorConfig[color];

  return (
    <div className={`card border-2 ${config.border} ${pulse ? 'animate-pulse-slow' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 font-medium">{title}</span>
        <div className={`${config.bg} p-2 rounded-lg`}>
          <Icon className={`w-5 h-5 ${config.text}`} />
        </div>
      </div>
      <div className={`text-3xl font-bold ${config.text}`}>{value}</div>
    </div>
  );
};

export default StatsCard;
