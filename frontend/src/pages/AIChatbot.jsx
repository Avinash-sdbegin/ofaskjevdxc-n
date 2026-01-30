import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User as UserIcon, Sparkles, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Namaste! 🙏 Main AI Health Assistant hu. Apne symptoms bataiye, main aapki help karunga. (Disclaimer: Yeh medical advice ka replacement nahi hai)',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses based on symptoms
  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Fever related
    if (msg.includes('fever') || msg.includes('bukhar')) {
      return {
        content: `🌡️ **Fever ke baare mein:**

**Possible Causes:**
- Viral infection (common cold, flu)
- Bacterial infection
- COVID-19 possibility

**Immediate Steps:**
1. Paracetamol 500mg le sakte hain
2. Zyada paani piyen (8-10 glass)
3. Aram karein
4. Temperature monitor karein

**Doctor se mile agar:**
- 102°F se upar fever ho
- 3 din se zyada rahe
- Saath mein breathing problem ho

**Risk Level:** ${msg.includes('high') || msg.includes('103') ? 'High 🔴' : 'Medium 🟡'}`,
        riskScore: msg.includes('high') ? 75 : 55
      };
    }
    
    // Chest pain
    if (msg.includes('chest pain') || msg.includes('seene') || msg.includes('dard')) {
      return {
        content: `⚠️ **Chest Pain - Urgent Attention Required**

**Possible Causes:**
- Cardiac issues (heart-related) ⚠️
- Acidity/Gas
- Muscle strain
- Anxiety

**IMMEDIATE ACTIONS:**
1. ⚡ Immediately sit down and rest
2. Call emergency (108) if severe
3. Chew aspirin 325mg (if available)
4. Don't exert yourself

**RED FLAGS (Emergency):**
- Pain radiating to arm/jaw
- Sweating profusely
- Shortness of breath
- Dizziness

**Risk Level:** High 🔴 - Visit doctor immediately!`,
        riskScore: 85
      };
    }
    
    // Headache
    if (msg.includes('headache') || msg.includes('sir dard')) {
      return {
        content: `🧠 **Headache Analysis:**

**Common Causes:**
- Tension headache (stress)
- Migraine
- Dehydration
- Eye strain (screen time)

**Relief Tips:**
1. Paracetamol 500mg
2. Dark room mein rest
3. Cold compress on forehead
4. Hydrate yourself

**Doctor Required if:**
- Sudden severe headache
- Vision changes
- Fever saath mein
- 1 week se zyada

**Risk Level:** Low 🟢`,
        riskScore: 35
      };
    }
    
    // Cough
    if (msg.includes('cough') || msg.includes('khansi')) {
      return {
        content: `🫁 **Cough Management:**

**Types:**
- Dry cough → Irritation
- Wet cough → Infection possible

**Home Remedies:**
1. Shahad + warm water
2. Steam inhalation
3. Garam paani gargle
4. Tulsi leaves

**Medicine:**
- Dry cough: Cough suppressant
- Wet cough: Expectorant

**Doctor consult if:**
- Blood in cough
- 2 weeks se zyada
- Breathing difficulty

**Risk Level:** ${msg.includes('blood') ? 'High 🔴' : 'Medium 🟡'}`,
        riskScore: msg.includes('blood') ? 80 : 45
      };
    }
    
    // Diabetes symptoms
    if (msg.includes('thirst') || msg.includes('urination') || msg.includes('diabetes') || msg.includes('sugar')) {
      return {
        content: `🩸 **Diabetes Ke Lakshan:**

**Common Symptoms:**
- Excessive thirst (zyada pyaas)
- Frequent urination
- Unexplained weight loss
- Fatigue/weakness
- Blurred vision

**Immediate Steps:**
1. Blood sugar test karwayen
2. HbA1c test
3. Diet control start karein
4. Regular exercise (30 min walk)

**Diet Tips:**
- ❌ Sugar, refined flour avoid
- ✅ Vegetables, whole grains
- ✅ Regular meal timings

**Risk Level:** Medium-High 🟡`,
        riskScore: 65
      };
    }
    
    // Skin problems
    if (msg.includes('rash') || msg.includes('skin') || msg.includes('itching') || msg.includes('khujli')) {
      return {
        content: `🧴 **Skin Problem Analysis:**

**Possible Causes:**
- Allergic reaction
- Fungal infection
- Heat rash
- Contact dermatitis

**Home Care:**
1. Keep area clean and dry
2. Apply calamine lotion
3. Avoid scratching
4. Wear loose cotton clothes

**Avoid:**
- Hot water bath
- Soap on affected area
- Tight synthetic clothes

**Doctor needed if:**
- Spreading rapidly
- Painful or oozing
- Fever saath mein

**Risk Level:** Low-Medium 🟡`,
        riskScore: 40
      };
    }

    // Default response
    return {
      content: `Main aapke symptoms samajh raha hu. Kripya zyada details dijiye:

**Batayiye:**
- Symptoms kab se hain?
- Kitna severe hai? (mild/moderate/severe)
- Koi aur symptoms?
- Medical history?

**Common Topics main help kar sakta hu:**
- Fever/Bukhar
- Chest Pain
- Headache/Sir dard
- Cough/Khansi
- Diabetes symptoms
- Skin problems
- Stomach issues

Detailed symptoms batayiye, main better advice dunga! 🩺`,
      riskScore: null
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const botMessage = {
        role: 'bot',
        content: aiResponse.content,
        riskScore: aiResponse.riskScore,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'bot',
        content: 'Namaste! 🙏 Main AI Health Assistant hu. Apne symptoms bataiye, main aapki help karunga.',
        timestamp: new Date()
      }
    ]);
  };

  const quickQuestions = [
    'Mujhe fever aur body pain hai',
    'Chest pain ho raha hai',
    'Headache bahut zyada hai',
    'Khansi 1 week se hai',
    'Skin rash aur itching'
  ];

  return (
    <div className="min-h-screen">
      <Navbar userType="patient" />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/patient" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="card">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Health Assistant</h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Powered by Advanced AI
                </p>
              </div>
            </div>
            <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset Chat
            </button>
          </div>

          {/* Quick Questions */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-sm px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4" style={{ height: '500px', overflowY: 'auto' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[70%] ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                  <div className={`rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.riskScore && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">AI Risk Score:</span>
                          <span className={`font-bold ${
                            message.riskScore >= 75 ? 'text-danger-600' :
                            message.riskScore >= 50 ? 'text-warning-600' :
                            'text-success-600'
                          }`}>
                            {message.riskScore}/100
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Apne symptoms yaha likhein..."
              className="input-field flex-1"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="btn-primary flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <p className="text-sm text-warning-800">
              ⚠️ <strong>Disclaimer:</strong> Yeh AI chatbot sirf guidance ke liye hai. Emergency mein turant doctor se mile ya 108 call karein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
