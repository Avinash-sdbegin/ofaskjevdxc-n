import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Heart, Users, UserPlus, LogOut, Trash2, Edit, Save, X, Phone, Mail, Stethoscope } from 'lucide-react';

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [hospitalAuth, setHospitalAuth] = useState(null);
  const [hospitalData, setHospitalData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingHospitalInfo, setEditingHospitalInfo] = useState(false);
  const [hospitalInfoEdit, setHospitalInfoEdit] = useState({
    totalBeds: '',
    icuBeds: '',
    emergencyBeds: ''
  });
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    qualification: '',
    consultationFee: '',
    availability: 'Available'
  });

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('hospitalAuth'));
    if (!auth) {
      navigate('/hospital/login');
      return;
    }
    setHospitalAuth(auth);

    // Load hospital data
    const hospitals = JSON.parse(localStorage.getItem('hospitals') || '[]');
    const hospital = hospitals.find(h => h.id === auth.id);
    if (hospital) {
      setHospitalData(hospital);
      setDoctors(hospital.doctors || []);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('hospitalAuth');
    navigate('/hospital/login');
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    
    const doctorToAdd = {
      id: `DOC-${Date.now()}`,
      ...newDoctor,
      hospitalId: hospitalAuth.id,
      hospitalName: hospitalAuth.name,
      addedAt: new Date().toISOString()
    };

    const updatedDoctors = [...doctors, doctorToAdd];
    
    // Update localStorage
    const hospitals = JSON.parse(localStorage.getItem('hospitals') || '[]');
    const hospitalIndex = hospitals.findIndex(h => h.id === hospitalAuth.id);
    if (hospitalIndex !== -1) {
      hospitals[hospitalIndex].doctors = updatedDoctors;
      localStorage.setItem('hospitals', JSON.stringify(hospitals));
    }

    setDoctors(updatedDoctors);
    setShowAddDoctor(false);
    setNewDoctor({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      qualification: '',
      consultationFee: '',
      availability: 'Available'
    });
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor({ ...doctor });
  };

  const handleSaveEdit = () => {
    const updatedDoctors = doctors.map(d => 
      d.id === editingDoctor.id ? editingDoctor : d
    );

    // Update localStorage
    const hospitals = JSON.parse(localStorage.getItem('hospitals') || '[]');
    const hospitalIndex = hospitals.findIndex(h => h.id === hospitalAuth.id);
    if (hospitalIndex !== -1) {
      hospitals[hospitalIndex].doctors = updatedDoctors;
      localStorage.setItem('hospitals', JSON.stringify(hospitals));
    }

    setDoctors(updatedDoctors);
    setEditingDoctor(null);
  };

  const handleDeleteDoctor = (doctorId) => {
    if (confirm('Are you sure you want to remove this doctor?')) {
      const updatedDoctors = doctors.filter(d => d.id !== doctorId);
      
      // Update localStorage
      const hospitals = JSON.parse(localStorage.getItem('hospitals') || '[]');
      const hospitalIndex = hospitals.findIndex(h => h.id === hospitalAuth.id);
      if (hospitalIndex !== -1) {
        hospitals[hospitalIndex].doctors = updatedDoctors;
        localStorage.setItem('hospitals', JSON.stringify(hospitals));
      }

      setDoctors(updatedDoctors);
    }
  };

  const handleEditHospitalInfo = () => {
    setHospitalInfoEdit({
      totalBeds: hospitalData.totalBeds,
      icuBeds: hospitalData.icuBeds,
      emergencyBeds: hospitalData.emergencyBeds
    });
    setEditingHospitalInfo(true);
  };

  const handleSaveHospitalInfo = () => {
    const updatedHospitalData = {
      ...hospitalData,
      totalBeds: hospitalInfoEdit.totalBeds,
      icuBeds: hospitalInfoEdit.icuBeds,
      emergencyBeds: hospitalInfoEdit.emergencyBeds
    };

    // Update localStorage
    const hospitals = JSON.parse(localStorage.getItem('hospitals') || '[]');
    const hospitalIndex = hospitals.findIndex(h => h.id === hospitalAuth.id);
    if (hospitalIndex !== -1) {
      hospitals[hospitalIndex] = updatedHospitalData;
      localStorage.setItem('hospitals', JSON.stringify(hospitals));
    }

    setHospitalData(updatedHospitalData);
    setEditingHospitalInfo(false);
  };

  const handleCancelHospitalEdit = () => {
    setEditingHospitalInfo(false);
    setHospitalInfoEdit({
      totalBeds: '',
      icuBeds: '',
      emergencyBeds: ''
    });
  };

  if (!hospitalAuth || !hospitalData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                AI HealthBridge
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Logged in as</p>
                <p className="font-bold text-gray-900">{hospitalAuth.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hospital Info Card */}
        <div className="bg-primary-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-12 h-12" />
                <div>
                  <h1 className="text-3xl font-bold">{hospitalData.hospitalName}</h1>
                  <p className="text-primary-100">{hospitalData.city}</p>
                </div>
              </div>
              {editingHospitalInfo ? (
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm text-primary-100 mb-2">Total Beds</p>
                    <input
                      type="number"
                      value={hospitalInfoEdit.totalBeds}
                      onChange={(e) => setHospitalInfoEdit({...hospitalInfoEdit, totalBeds: e.target.value})}
                      className="w-full text-3xl font-bold bg-white/30 border-2 border-white/50 rounded-lg px-3 py-2 text-white placeholder-white/70"
                      placeholder="Total"
                    />
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm text-primary-100 mb-2">ICU Beds</p>
                    <input
                      type="number"
                      value={hospitalInfoEdit.icuBeds}
                      onChange={(e) => setHospitalInfoEdit({...hospitalInfoEdit, icuBeds: e.target.value})}
                      className="w-full text-3xl font-bold bg-white/30 border-2 border-white/50 rounded-lg px-3 py-2 text-white placeholder-white/70"
                      placeholder="ICU"
                    />
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm text-primary-100 mb-2">Emergency Beds</p>
                    <input
                      type="number"
                      value={hospitalInfoEdit.emergencyBeds}
                      onChange={(e) => setHospitalInfoEdit({...hospitalInfoEdit, emergencyBeds: e.target.value})}
                      className="w-full text-3xl font-bold bg-white/30 border-2 border-white/50 rounded-lg px-3 py-2 text-white placeholder-white/70"
                      placeholder="Emergency"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm text-primary-100 mb-1">Total Beds</p>
                    <p className="text-3xl font-bold">{hospitalData.totalBeds}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm text-primary-100 mb-1">ICU Beds</p>
                    <p className="text-3xl font-bold">{hospitalData.icuBeds}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm text-primary-100 mb-1">Emergency Beds</p>
                    <p className="text-3xl font-bold">{hospitalData.emergencyBeds}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-6">
              {editingHospitalInfo ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleSaveHospitalInfo}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-lg"
                  >
                    <Save className="w-5 h-5" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelHospitalEdit}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditHospitalInfo}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  <Edit className="w-5 h-5" />
                  Edit Info
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold mb-1">Total Doctors</p>
                <p className="text-4xl font-bold text-primary-600">{doctors.length}</p>
              </div>
              <Users className="w-12 h-12 text-primary-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold mb-1">Available Doctors</p>
                <p className="text-4xl font-bold text-green-600">
                  {doctors.filter(d => d.availability === 'Available').length}
                </p>
              </div>
              <Stethoscope className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold mb-1">Specializations</p>
                <p className="text-4xl font-bold text-primary-600">
                  {new Set(doctors.map(d => d.specialization)).size}
                </p>
              </div>
              <Heart className="w-12 h-12 text-primary-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Doctors Management */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-8 h-8 text-primary-600" />
              Doctors Management
            </h2>
            <button
              onClick={() => setShowAddDoctor(!showAddDoctor)}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              Add New Doctor
            </button>
          </div>

          {/* Add Doctor Form */}
          {showAddDoctor && (
            <div className="bg-primary-50 rounded-xl p-6 mb-6 border-2 border-primary-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Doctor</h3>
              <form onSubmit={handleAddDoctor} className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor Name *</label>
                  <input
                    type="text"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={newDoctor.email}
                    onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="doctor@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={newDoctor.phone}
                    onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization *</label>
                  <input
                    type="text"
                    value={newDoctor.specialization}
                    onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Cardiologist"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Experience (years) *</label>
                  <input
                    type="number"
                    value={newDoctor.experience}
                    onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Qualification *</label>
                  <input
                    type="text"
                    value={newDoctor.qualification}
                    onChange={(e) => setNewDoctor({...newDoctor, qualification: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="MBBS, MD"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Consultation Fee (₹) *</label>
                  <input
                    type="number"
                    value={newDoctor.consultationFee}
                    onChange={(e) => setNewDoctor({...newDoctor, consultationFee: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Availability *</label>
                  <select
                    value={newDoctor.availability}
                    onChange={(e) => setNewDoctor({...newDoctor, availability: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                  >
                    Add Doctor
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddDoctor(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Doctors List */}
          <div className="space-y-4">
            {doctors.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-xl font-semibold">No doctors added yet</p>
                <p className="text-sm">Click "Add New Doctor" to get started</p>
              </div>
            ) : (
              doctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                  {editingDoctor?.id === doctor.id ? (
                    // Edit Mode
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        value={editingDoctor.name}
                        onChange={(e) => setEditingDoctor({...editingDoctor, name: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        value={editingDoctor.email}
                        onChange={(e) => setEditingDoctor({...editingDoctor, email: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={editingDoctor.phone}
                        onChange={(e) => setEditingDoctor({...editingDoctor, phone: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Phone"
                      />
                      <input
                        type="text"
                        value={editingDoctor.specialization}
                        onChange={(e) => setEditingDoctor({...editingDoctor, specialization: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Specialization"
                      />
                      <input
                        type="number"
                        value={editingDoctor.experience}
                        onChange={(e) => setEditingDoctor({...editingDoctor, experience: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Experience"
                      />
                      <input
                        type="text"
                        value={editingDoctor.qualification}
                        onChange={(e) => setEditingDoctor({...editingDoctor, qualification: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Qualification"
                      />
                      <input
                        type="number"
                        value={editingDoctor.consultationFee}
                        onChange={(e) => setEditingDoctor({...editingDoctor, consultationFee: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Fee"
                      />
                      <select
                        value={editingDoctor.availability}
                        onChange={(e) => setEditingDoctor({...editingDoctor, availability: e.target.value})}
                        className="px-3 py-2 border rounded-lg"
                      >
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                          <Save className="w-4 h-4" /> Save
                        </button>
                        <button
                          onClick={() => setEditingDoctor(null)}
                          className="flex items-center gap-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                          <X className="w-4 h-4" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {doctor.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                            <p className="text-primary-600 font-semibold">{doctor.specialization}</p>
                            <div className="grid md:grid-cols-3 gap-4 mt-3">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="w-4 h-4" />
                                {doctor.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                {doctor.phone}
                              </div>
                              <div className="text-sm text-gray-600">
                                <strong>Experience:</strong> {doctor.experience} years
                              </div>
                              <div className="text-sm text-gray-600">
                                <strong>Qualification:</strong> {doctor.qualification}
                              </div>
                              <div className="text-sm text-gray-600">
                                <strong>Fee:</strong> ₹{doctor.consultationFee}
                              </div>
                              <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                  doctor.availability === 'Available' ? 'bg-green-100 text-green-700' :
                                  doctor.availability === 'Busy' ? 'bg-orange-100 text-orange-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {doctor.availability}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditDoctor(doctor)}
                          className="bg-primary-100 hover:bg-primary-200 text-primary-700 p-2 rounded-lg transition-all"
                          title="Edit Doctor"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDoctor(doctor.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-all"
                          title="Delete Doctor"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
