/**
 * Calculate risk score based on patient data
 * This is a mock implementation - replace with actual AI model in production
 */
export const calculateRiskScore = (patientData) => {
  let score = 0;

  // Age factor (max 20 points)
  if (patientData.age > 60) score += 20;
  else if (patientData.age > 45) score += 15;
  else if (patientData.age > 30) score += 10;
  else score += 5;

  // Symptom severity (max 30 points)
  if (patientData.severity === 'severe') score += 30;
  else if (patientData.severity === 'moderate') score += 20;
  else score += 10;

  // Number of symptoms (max 25 points)
  const symptomCount = patientData.symptoms?.length || 0;
  if (symptomCount >= 5) score += 25;
  else if (symptomCount >= 3) score += 15;
  else score += 10;

  // Duration (max 15 points)
  if (patientData.duration === 'more than 2 weeks') score += 15;
  else if (patientData.duration === '1-2 weeks') score += 12;
  else if (patientData.duration === '3-7 days') score += 8;
  else score += 5;

  // Medical history (max 10 points)
  if (patientData.medicalHistory && patientData.medicalHistory.length > 0) {
    score += 10;
  }

  return Math.min(score, 100); // Cap at 100
};

/**
 * Determine severity level based on risk score
 */
export const getSeverityLevel = (riskScore) => {
  if (riskScore >= 75) return 'High';
  if (riskScore >= 50) return 'Medium';
  return 'Low';
};

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

/**
 * Validate image file
 */
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload JPG, PNG, or WEBP.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 5MB.' };
  }

  return { valid: true };
};

/**
 * Generate random case ID
 */
export const generateCaseId = () => {
  return `HC${Math.floor(10000 + Math.random() * 90000)}`;
};

/**
 * Get color class based on severity
 */
export const getSeverityColor = (severity) => {
  const colors = {
    High: 'danger',
    Medium: 'warning',
    Low: 'success'
  };
  return colors[severity] || 'primary';
};

/**
 * Sort patients by priority (risk score)
 */
export const sortPatientsByPriority = (patients) => {
  return [...patients].sort((a, b) => b.riskScore - a.riskScore);
};

/**
 * Get time ago string
 */
export const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};
