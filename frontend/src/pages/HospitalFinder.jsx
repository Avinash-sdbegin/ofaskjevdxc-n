import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Star, Phone, Navigation, Building2, Clock, Award, Loader, MapPinned } from 'lucide-react';
import Navbar from '../components/Navbar';

const HospitalFinder = () => {
  const [location, setLocation] = useState('');
  const [isRural, setIsRural] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Mock hospital data with coordinates
  const cityHospitals = {
    'Patna': [
      {
        id: 1,
        name: 'AIIMS Patna',
        rating: 4.8,
        specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Emergency'],
        address: 'Phulwari Sharif, Patna',
        distance: '3.2 km',
        phone: '+91 612 244 4001',
        emergency: true,
        timing: '24x7',
        lat: 25.5941,
        lon: 85.1376
      },
      {
        id: 2,
        name: 'Indira Gandhi Institute of Medical Sciences (IGIMS)',
        rating: 4.6,
        specialties: ['General Medicine', 'Surgery', 'Pediatrics'],
        address: 'Sheikhpura, Patna',
        distance: '5.8 km',
        phone: '+91 612 229 7000',
        emergency: true,
        timing: '24x7',
        lat: 25.6120,
        lon: 85.1288
      },
      {
        id: 3,
        name: 'Paras HMRI Hospital',
        rating: 4.7,
        specialties: ['Cardiology', 'Cancer Care', 'Neurosurgery'],
        address: 'Raja Bazar, Patna',
        distance: '2.1 km',
        phone: '+91 612 333 0000',
        emergency: true,
        timing: '24x7',
        lat: 25.6102,
        lon: 85.1414
      },
      {
        id: 4,
        name: 'Ford Hospital',
        rating: 4.5,
        specialties: ['Maternity', 'Surgery', 'ICU'],
        address: 'Kankarbagh, Patna',
        distance: '4.5 km',
        phone: '+91 612 235 0000',
        emergency: true,
        timing: '24x7',
        lat: 25.5831,
        lon: 85.1722
      },
      {
        id: 5,
        name: 'Ruban Memorial Hospital',
        rating: 4.4,
        specialties: ['General Medicine', 'Orthopedics', 'Gastroenterology'],
        address: 'Patliputra Colony, Patna',
        distance: '6.2 km',
        phone: '+91 612 226 0000',
        emergency: false,
        timing: '8 AM - 10 PM',
        lat: 25.5888,
        lon: 85.1025
      }
    ],
    'Delhi': [
      {
        id: 1,
        name: 'AIIMS Delhi',
        rating: 4.9,
        specialties: ['All Specialties', 'Advanced Surgery', 'Research'],
        address: 'Ansari Nagar, New Delhi',
        distance: '8.5 km',
        phone: '+91 11 2658 8500',
        emergency: true,
        timing: '24x7',
        lat: 28.5672,
        lon: 77.2100
      },
      {
        id: 2,
        name: 'Apollo Hospital',
        rating: 4.8,
        specialties: ['Cardiology', 'Oncology', 'Neurology'],
        address: 'Sarita Vihar, Delhi',
        distance: '12.3 km',
        phone: '+91 11 2692 5858',
        emergency: true,
        timing: '24x7',
        lat: 28.5244,
        lon: 77.2897
      }
    ],
    'Mumbai': [
      {
        id: 1,
        name: 'Tata Memorial Hospital',
        rating: 4.9,
        specialties: ['Cancer Treatment', 'Oncology', 'Radiation'],
        address: 'Parel, Mumbai',
        distance: '6.8 km',
        phone: '+91 22 2417 7000',
        emergency: true,
        timing: '24x7',
        lat: 19.0057,
        lon: 72.8431
      },
      {
        id: 2,
        name: 'Hinduja Hospital',
        rating: 4.7,
        specialties: ['Cardiology', 'Neurology', 'Gastroenterology'],
        address: 'Mahim, Mumbai',
        distance: '9.2 km',
        phone: '+91 22 4445 2222',
        emergency: true,
        timing: '24x7',
        lat: 19.0447,
        lon: 72.8397
      }
    ]
  };

  const nearestCities = {
    'rural-bihar': [
      {
        city: 'Patna',
        distance: '45 km',
        travelTime: '1.5 hours',
        hospitals: cityHospitals['Patna'].slice(0, 3)
      },
      {
        city: 'Gaya',
        distance: '98 km',
        travelTime: '3 hours',
        hospitals: [
          {
            id: 1,
            name: 'Anugrah Narayan Magadh Medical College',
            rating: 4.3,
            specialties: ['General Medicine', 'Surgery'],
            address: 'Gaya',
            phone: '+91 631 222 0000',
            emergency: true
          }
        ]
      },
      {
        city: 'Muzaffarpur',
        distance: '78 km',
        travelTime: '2.5 hours',
        hospitals: [
          {
            id: 1,
            name: 'Sri Krishna Medical College',
            rating: 4.4,
            specialties: ['Pediatrics', 'General Medicine'],
            address: 'Muzaffarpur',
            phone: '+91 621 222 0000',
            emergency: true
          }
        ]
      }
    ]
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(1);
  };

  // Get current location using Geolocation API
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        
        // Find nearest city based on coordinates
        // Mock: In production, use reverse geocoding API
        const nearestCity = findNearestCity(latitude, longitude);
        setSelectedCity(nearestCity);
        setIsRural(false);
        
        // Auto-search with current location
        const hospitals = cityHospitals[nearestCity] || cityHospitals['Patna'];
        
        // Calculate real distances based on coordinates
        const hospitalsWithDistance = hospitals.map(hospital => ({
          ...hospital,
          distance: `${calculateDistance(latitude, longitude, hospital.lat || 25.5941, hospital.lon || 85.1376)} km`,
          coordinates: { lat: hospital.lat || 25.5941, lon: hospital.lon || 85.1376 }
        }));

        // Sort by distance
        hospitalsWithDistance.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        setSearchResults({
          type: 'city',
          data: hospitalsWithDistance
        });
        
        setIsLoadingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please allow location access in browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Find nearest city based on coordinates (mock implementation)
  const findNearestCity = (lat, lon) => {
    const cityCoordinates = {
      'Patna': { lat: 25.5941, lon: 85.1376 },
      'Delhi': { lat: 28.7041, lon: 77.1025 },
      'Mumbai': { lat: 19.0760, lon: 72.8777 },
      'Kolkata': { lat: 22.5726, lon: 88.3639 },
      'Bangalore': { lat: 12.9716, lon: 77.5946 }
    };

    let nearestCity = 'Patna';
    let minDistance = Infinity;

    Object.entries(cityCoordinates).forEach(([city, coords]) => {
      const distance = calculateDistance(lat, lon, coords.lat, coords.lon);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    });

    return nearestCity;
  };

  const handleSearch = () => {
    if (isRural) {
      setSearchResults({
        type: 'rural',
        data: nearestCities['rural-bihar']
      });
    } else {
      const hospitals = cityHospitals[selectedCity] || cityHospitals['Patna'];
      setSearchResults({
        type: 'city',
        data: hospitals
      });
    }
  };

  const cities = ['Patna', 'Delhi', 'Mumbai', 'Kolkata', 'Bangalore'];

  return (
    <div className="min-h-screen">
      <Navbar userType="patient" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/patient" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Nearby Hospitals</h1>
          <p className="text-gray-600">Discover top-rated hospitals based on your location</p>
        </div>

        {/* Search Section */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Enter Your Location</h2>
          
          {/* Current Location Button */}
          <div className="mb-6">
            <button
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingLocation ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Getting your location...
                </>
              ) : (
                <>
                  <MapPinned className="w-5 h-5" />
                  Use My Current Location
                </>
              )}
            </button>
            
            {currentLocation && (
              <div className="mt-3 p-3 bg-success-50 border border-success-200 rounded-lg flex items-center gap-2">
                <MapPin className="w-4 h-4 text-success-600" />
                <span className="text-sm text-success-800">
                  Location detected: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                </span>
              </div>
            )}
            
            {locationError && (
              <div className="mt-3 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-start gap-2">
                <MapPin className="w-4 h-4 text-danger-600 mt-0.5" />
                <div className="text-sm text-danger-800">
                  <p className="font-semibold mb-1">Location Error</p>
                  <p>{locationError}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          
          <div className="space-y-4">
            {/* Location Type */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsRural(false)}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  !isRural
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">🏙️</div>
                <div className="font-semibold">I'm in a City</div>
              </button>
              <button
                onClick={() => setIsRural(true)}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  isRural
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">🏘️</div>
                <div className="font-semibold">I'm in Rural Area</div>
              </button>
            </div>

            {/* City Selection (for urban) */}
            {!isRural && (
              <div>
                <label className="block text-sm font-medium mb-2">Select Your City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="input-field"
                >
                  <option value="">Choose a city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Location Input (for rural) */}
            {isRural && (
              <div>
                <label className="block text-sm font-medium mb-2">Enter Your Village/Area</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Vaishali, Bihar"
                  className="input-field"
                />
              </div>
            )}

            <button
              onClick={handleSearch}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Find Hospitals
            </button>
          </div>
        </div>

        {/* Results Section */}
        {searchResults && (
          <div>
            {searchResults.type === 'city' ? (
              // City Hospitals
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Top Hospitals in {selectedCity || 'Patna'} ({searchResults.data.length})
                </h2>
                <div className="grid gap-6">
                  {searchResults.data.map((hospital) => (
                    <div key={hospital.id} className="card hover:shadow-xl transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {hospital.distance}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {hospital.timing}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm">{hospital.address}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 bg-warning-100 px-3 py-1 rounded-full mb-2">
                                <Star className="w-4 h-4 text-warning-600 fill-warning-600" />
                                <span className="font-bold text-warning-700">{hospital.rating}</span>
                              </div>
                              {hospital.emergency && (
                                <span className="inline-flex items-center text-xs bg-danger-100 text-danger-700 px-2 py-1 rounded-full">
                                  <Building2 className="w-3 h-3 mr-1" />
                                  24x7 Emergency
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                            <div className="flex flex-wrap gap-2">
                              {hospital.specialties.map((spec, index) => (
                                <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <a href={`tel:${hospital.phone}`} className="btn-primary flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Call Now
                            </a>
                            <button className="btn-secondary flex items-center gap-2">
                              <Navigation className="w-4 h-4" />
                              Get Directions
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Rural - Nearest Cities
              <div>
                <h2 className="text-2xl font-bold mb-4">Nearest Cities with Major Hospitals</h2>
                <p className="text-gray-600 mb-6">Here are the top 5 nearest cities from your location</p>
                
                <div className="space-y-8">
                  {searchResults.data.map((cityData, index) => (
                    <div key={index} className="card bg-gradient-to-br from-primary-50 to-purple-50">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-primary-200">
                        <div>
                          <h3 className="text-2xl font-bold text-primary-800">{cityData.city}</h3>
                          <div className="flex items-center gap-4 text-sm text-primary-700 mt-1">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {cityData.distance} away
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {cityData.travelTime}
                            </span>
                          </div>
                        </div>
                        <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          City #{index + 1}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {cityData.hospitals.map((hospital) => (
                          <div key={hospital.id} className="bg-white rounded-lg p-4 border border-primary-100">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-1">{hospital.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{hospital.address}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {hospital.specialties.map((spec, idx) => (
                                    <span key={idx} className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1 bg-warning-100 px-2 py-1 rounded-full">
                                  <Star className="w-3 h-3 text-warning-600 fill-warning-600" />
                                  <span className="font-bold text-warning-700 text-sm">{hospital.rating}</span>
                                </div>
                                {hospital.emergency && (
                                  <span className="text-xs bg-danger-100 text-danger-700 px-2 py-1 rounded-full">
                                    Emergency
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <a href={`tel:${hospital.phone}`} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 rounded-lg text-sm font-semibold transition-colors">
                                Call Hospital
                              </a>
                              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg text-sm font-semibold transition-colors">
                                Directions
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Travel Tips */}
                <div className="card bg-warning-50 border-2 border-warning-200 mt-6">
                  <h3 className="font-bold text-warning-800 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Travel Tips for Rural Patients
                  </h3>
                  <ul className="space-y-2 text-sm text-warning-900">
                    <li>• Call hospital before traveling to confirm doctor availability</li>
                    <li>• Carry all medical records and previous reports</li>
                    <li>• Consider staying near hospital if treatment is multi-day</li>
                    <li>• Ask about telemedicine options for follow-ups</li>
                    <li>• Emergency ambulance: Dial 108 (Free in Bihar)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!searchResults && (
          <div className="card text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select your location type and search to find hospitals</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalFinder;
