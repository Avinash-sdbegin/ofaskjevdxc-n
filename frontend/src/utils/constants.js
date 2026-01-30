export const SEVERITY_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
};

export const RISK_THRESHOLDS = {
  HIGH: 75,
  MEDIUM: 50,
  LOW: 0
};

export const PATIENT_STATUS = {
  PENDING: 'Pending Review',
  UNDER_REVIEW: 'Under Review',
  REVIEWED: 'Reviewed',
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed'
};

export const COMMON_SYMPTOMS = [
  'Fever',
  'Cough',
  'Headache',
  'Body Pain',
  'Fatigue',
  'Chest Pain',
  'Shortness of Breath',
  'Nausea',
  'Vomiting',
  'Diarrhea',
  'Skin Rash',
  'Dizziness',
  'Loss of Appetite',
  'Sore Throat',
  'Runny Nose',
  'Abdominal Pain',
  'Joint Pain',
  'Sweating',
  'Chills',
  'Weakness'
];

export const DURATION_OPTIONS = [
  { value: '1-2 days', label: '1-2 days' },
  { value: '3-7 days', label: '3-7 days' },
  { value: '1-2 weeks', label: '1-2 weeks' },
  { value: 'more than 2 weeks', label: 'More than 2 weeks' }
];

export const SEVERITY_OPTIONS = [
  { value: 'mild', label: 'Mild (manageable)' },
  { value: 'moderate', label: 'Moderate (affecting daily life)' },
  { value: 'severe', label: 'Severe (very painful/difficult)' }
];

export const IMAGE_TYPES = {
  XRAY: 'X-Ray',
  SKIN: 'Skin Photo',
  WOUND: 'Wound Image',
  ECG: 'ECG Report',
  LAB: 'Lab Report',
  OTHER: 'Other'
};
