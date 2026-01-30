import { Link } from 'react-router-dom';
import { Activity, Users, Brain, TrendingUp, Heart, Shield, MessageCircle, Image, MapPin, Sparkles, AlertTriangle, Phone } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Diagnosis',
      description: 'Advanced machine learning algorithms analyze symptoms and medical images',
      link: '/patient/check-symptoms'
    },
    {
      icon: AlertTriangle,
      title: '🚨 Emergency Assessment',
      description: 'Critical care AI decision - City referral or E-Doctor assistance',
      badge: 'NEW',
      link: '/emergency'
    },
    {
      icon: MessageCircle,
      title: 'AI Health Chatbot',
      description: 'Get instant medical advice and guidance 24/7 from our intelligent assistant',
      link: '/patient/ai-chatbot'
    },
    {
      icon: Image,
      title: 'MRI & Scan Analysis',
      description: 'Upload X-rays, MRI, CT scans for instant AI-powered diagnosis',
      link: '/patient/mri-analysis'
    },
    {
      icon: MapPin,
      title: 'Hospital Finder',
      description: 'Find top-rated hospitals near you with ratings and specialties',
      link: '/hospital-finder'
    },
    {
      icon: TrendingUp,
      title: 'Early Detection',
      description: 'Catch diseases in early stages before they become severe',
      link: '/patient/check-symptoms'
    },
    {
      icon: Users,
      title: 'Smart Prioritization',
      description: 'Doctors see critical patients first based on AI risk assessment',
      link: '/doctor/login'
    },
    {
      icon: Shield,
      title: 'E-Doctor Consultation',
      description: 'Remote specialist at 20% cost for emergency stabilization',
      badge: 'NEW',
      link: '/e-doctor'
    }
  ];

  const stats = [
    { value: '40%', label: 'Faster Diagnosis' },
    { value: '30%', label: 'OPD Efficiency ↑' },
    { value: '50%', label: 'Cost Reduction' },
    { value: '24/7', label: 'Availability' }
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                AI HealthBridge
              </span>
            </div>
            <div className="flex space-x-4">
              <Link to="/patient" className="btn-primary">
                Patient Portal
              </Link>
              <Link to="/hospital/login" className="btn-primary">
                Hospital Portal
              </Link>
              <Link to="/doctor/login" className="btn-secondary">
                Doctor Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
                <Activity className="w-5 h-5 text-primary-600 animate-pulse" />
                <span className="text-primary-700 font-semibold">Revolutionizing Healthcare Access</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Smart Healthcare,<br />Early Detection
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl">
                AI-powered platform that helps detect diseases early, prioritizes critical patients,
                and bridges the healthcare gap between rural and urban India.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/patient/check-symptoms" className="btn-primary px-8 py-4 text-lg">
                  Check Your Symptoms
                </Link>
                <Link to="/doctor/login" className="btn-secondary px-8 py-4 text-lg">
                  Doctor Login
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://investin.org/cdn/shop/articles/jafar-ahmed-E285pJbC4uE-unsplash.jpg?v=1634293259" 
                alt="AI Healthcare Technology" 
                className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirational Quote Banner */}
      <section className="py-8 px-4 bg-gradient-to-r from-amber-50 to-orange-50 border-y-2 border-orange-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-bold text-orange-800">
            जाको राखे साईंया मार सके ना कोय
          </p>
          <p className="text-sm md:text-base text-orange-600 mt-1 italic">
            Whoever God protects, no one can harm
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Complete Healthcare Solution
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From AI chatbot to hospital finder - everything you need for better healthcare
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const FeatureContent = (
                <div className={`card hover:shadow-xl transition-shadow duration-300 ${feature.badge ? 'border-2 border-primary-300' : ''}`}>
                  {feature.badge && (
                    <div className="inline-block bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                      {feature.badge}
                    </div>
                  )}
                  <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );

              return feature.link ? (
                <Link key={index} to={feature.link}>
                  {FeatureContent}
                </Link>
              ) : (
                <div key={index}>{FeatureContent}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Patient/Village Hospital Assessment</h3>
              <p className="text-gray-600">
                Enter critical vitals (heart rate, blood loss, oxygen) for emergency AI analysis
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Decision Engine</h3>
              <p className="text-gray-600">
                AI calculates survival time, best route, hospital availability, and cost
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Referral or E-Doctor</h3>
              <p className="text-gray-600">
                City transfer with pre-registration OR E-Doctor assists locally at 20% cost
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Helpline Banner */}
      <section className="py-12 px-4 bg-danger-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <AlertTriangle className="w-12 h-12 animate-pulse" />
            <h2 className="text-4xl font-bold">Emergency? Call Now!</h2>
          </div>
          <p className="text-danger-100 mb-6 text-lg">
            24/7 Toll-Free Emergency Ambulance Service
          </p>
          <a href="tel:108" className="inline-flex items-center gap-3 bg-white text-danger-600 px-12 py-5 rounded-xl text-3xl font-bold hover:bg-gray-100 transition-colors shadow-xl">
            <Phone className="w-10 h-10" />
            108
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients getting better healthcare access
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/emergency" className="bg-danger-600 hover:bg-danger-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Emergency Assessment
            </Link>
            <Link to="/patient/check-symptoms" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block">
              Start Your Health Check
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-6 h-6" />
            <span className="text-xl font-bold">AI HealthBridge</span>
          </div>
          <p className="text-gray-400">
            Making quality healthcare accessible to everyone, everywhere.
          </p>
          <p className="text-gray-500 mt-4 text-sm">
            © 2026 AI HealthBridge. Empowering Rural India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
