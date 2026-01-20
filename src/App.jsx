import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plane, 
  Globe, 
  Briefcase, 
  Star, 
  Coffee, 
  Map, 
  Ticket, 
  Cloud, 
  Wind,
  Award,
  PartyPopper,
  ChevronRight,
  MessageCircle,
  User
} from 'lucide-react';

// --- Simple Confetti Component (Unchanged) ---
const ConfettiParticle = ({ color, style }) => (
  <div
    className="absolute w-3 h-3 rounded-sm opacity-80 animate-fall"
    style={{
      backgroundColor: color,
      ...style,
    }}
  />
);

const Confetti = ({ active }) => {
  const [particles, setParticles] = useState([]);

  const spawnConfetti = useCallback(() => {
    const colors = ['#FFD700', '#60A5FA', '#FFFFFF', '#EAB308', '#1E40AF'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      style: {
        left: `${Math.random() * 100}vw`,
        top: -20,
        transform: `rotate(${Math.random() * 360}deg)`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        animationDelay: `${Math.random() * 0.5}s`,
      },
    }));
    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.slice(50));
    }, 4000);
  }, []);

  useEffect(() => {
    if (active) {
      const interval = setInterval(spawnConfetti, 2000);
      spawnConfetti();
      return () => clearInterval(interval);
    }
  }, [active, spawnConfetti]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map(p => (
        <ConfettiParticle key={p.id} color={p.color} style={p.style} />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
        }
        @keyframes flyRight {
          0% { transform: translateX(-100%) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(-20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- Main App Component ---
export default function BirthdayApp() {
  const [flightStatus, setFlightStatus] = useState('grounded'); // grounded, taxiing, airborne
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');

  const handleTakeoff = () => {
    setFlightStatus('taxiing');
    setTimeout(() => {
      setFlightStatus('airborne');
      setShowConfetti(true);
    }, 3000);
  };

  const toggleConfetti = () => {
    setShowConfetti(!showConfetti);
  };

  // --- Pre-Flight / Loading Screen ---
  if (flightStatus === 'grounded' || flightStatus === 'taxiing') {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center font-sans relative overflow-hidden">
        {/* Background Clouds */}
        <div className="absolute inset-0 opacity-10">
           <Cloud className="absolute top-20 left-20 w-32 h-32" />
           <Cloud className="absolute bottom-40 right-20 w-48 h-48" />
           <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950"></div>
        </div>
        
        <div className="z-10 text-center space-y-8 max-w-md w-full px-6">
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 bg-blue-600/30 border border-blue-500 rounded-full text-blue-300 text-sm font-mono tracking-widest mb-4">
              FLIGHT BGA-044
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg">
              PREPARING FOR TAKEOFF
            </h1>
            <p className="text-slate-400 text-lg">Captain Daniel, please report to the flight deck.</p>
          </div>

          {/* Runway Loading Bar */}
          <div className="relative h-16 bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden shadow-2xl">
            {/* Runway markings */}
            <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-slate-600/50 transform -translate-y-1/2"></div>
            
            <div 
              className={`absolute top-0 left-0 h-full bg-blue-600/20 transition-all duration-[3000ms] ease-in-out flex items-center justify-end px-2 ${flightStatus === 'taxiing' ? 'w-full' : 'w-[5%]'}`}
            >
              <Plane className={`text-white w-8 h-8 transform rotate-90 ${flightStatus === 'taxiing' ? 'animate-pulse' : ''}`} />
            </div>
          </div>

          {flightStatus === 'grounded' ? (
            <button 
              onClick={handleTakeoff}
              className="group w-full relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none ring-offset-2 focus:ring-2 ring-blue-400 shadow-lg shadow-blue-900/50"
            >
              <span className="mr-3">INITIATE FLIGHT 44</span>
              <Plane className="w-6 h-6 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="space-y-2">
              <div className="text-blue-400 font-mono text-xl animate-pulse">
                Engines Spooling Up...
              </div>
              <p className="text-xs text-slate-500 font-mono">Checking Flaps... Loading Cargo... Closing Deals...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Main Dashboard (Flight 44) ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      <Confetti active={showConfetti} />
      
      {/* CEO Dashboard Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-900 p-2 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900 leading-tight">Best Group Airfares</h1>
              <div className="flex items-center text-xs text-slate-500 font-medium">
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded mr-2">CEO ACCESS</span>
                <span>Flight 44</span>
              </div>
            </div>
          </div>
          <button 
            onClick={toggleConfetti}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-blue-600"
            title="Celebration Mode"
          >
            <PartyPopper className={`w-6 h-6 ${showConfetti ? 'animate-bounce' : ''}`} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        
        {/* Hero Section: Boarding Pass Style */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Plane className="w-64 h-64 text-blue-900" />
          </div>
          
          <div className="bg-blue-900 text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
            <div>
              <p className="text-blue-200 font-mono text-sm tracking-wider mb-2">PASSENGER NAME</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">DANIEL</h2>
              <p className="text-blue-200 mt-2 font-medium flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" /> 
                PLATINUM STATUS MEMBER
              </p>
            </div>
            <div className="mt-6 md:mt-0 text-right">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-xs text-blue-200 font-mono mb-1">DESTINATION</div>
                <div className="text-3xl font-bold">YEAR 44</div>
                <div className="text-xs text-blue-200 mt-1">NON-STOP SERVICE</div>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 bg-gradient-to-b from-blue-50 to-white">
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
              Welcome aboard, Captain. You have successfully navigated 43 years of turbulence, clear skies, and long-haul flights. 
              <span className="font-semibold text-blue-700"> Flight 44 is now cleared for takeoff.</span>
            </p>
          </div>
        </div>

        {/* Dashboard Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'metrics', label: 'Flight Metrics', icon: Map },
              { id: 'perks', label: 'First Class Perks', icon: Ticket },
              { id: 'comms', label: 'Crew Comms', icon: MessageCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold transition-all duration-200 border-2 ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-white border-white text-slate-500 hover:border-blue-100 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.id && <ChevronRight className="w-5 h-5" />}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 min-h-[400px]">
              
              {activeTab === 'metrics' && (
                <div className="animate-fadeIn space-y-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                      <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                      CEO Performance Data
                    </h3>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">LIVE FEED</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <StatBar label="Group Booking Mastery" value={100} color="bg-blue-600" icon={<Globe className="w-4 h-4" />} />
                    <StatBar label="Deal Closing Velocity" value={98} color="bg-emerald-500" icon={<Wind className="w-4 h-4" />} />
                    <StatBar label="Turbulence Resistance" value={95} color="bg-indigo-500" icon={<Cloud className="w-4 h-4" />} />
                    <StatBar label="Jet Fuel (Coffee) Capacity" value={90} color="bg-amber-700" icon={<Coffee className="w-4 h-4" />} />
                    <StatBar label="Dad Joke Altitude" value={100} color="bg-yellow-500" icon={<Award className="w-4 h-4" />} warning />
                  </div>

                  <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100 flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Career Milestone</h4>
                      <p className="text-blue-700/80 text-sm mt-1">
                        Daniel has logged over 376,000 hours of life experience. Expert rating in navigating "Family Logistics" and "Business Strategy."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'perks' && (
                <div className="animate-fadeIn">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                    <Ticket className="w-6 h-6 mr-3 text-blue-600" />
                    Upgrade Status: CONFIRMED
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PerkCard 
                      title="Chief Executive Aura"
                      desc="Enter any room like it's a first-class lounge. Authority +50."
                      color="blue"
                    />
                    <PerkCard 
                      title="Auto-Pilot Mode"
                      desc="Ability to sleep anywhere, anytime, including during movies."
                      color="indigo"
                    />
                    <PerkCard 
                      title="Global Network"
                      desc="Knows a guy who knows a guy in almost every time zone."
                      color="emerald"
                    />
                     <PerkCard 
                      title="Priority Boarding"
                      desc="Skip the line at the fridge. Reserved access to the best snacks."
                      color="amber"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'comms' && (
                <div className="animate-fadeIn space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                      <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
                      Incoming Transmissions
                    </h3>
                    <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">2 NEW</span>
                  </div>

                  <div className="grid gap-6">
                    {/* Cris's Message */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 flex flex-col items-center space-y-2">
                          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-200 overflow-hidden">
                              <User className="w-10 h-10 text-emerald-600" />
                          </div>
                          <div className="text-center">
                              <div className="font-bold text-slate-900">Cris</div>
                              <div className="text-xs text-slate-500 font-mono">Crew Member</div>
                          </div>
                      </div>
                      <div className="flex-grow relative bg-slate-50 rounded-lg p-6">
                          {/* Speech bubble triangle */}
                          <div className="absolute top-6 -left-3 w-6 h-6 bg-slate-50 transform rotate-45 hidden md:block"></div>

                          <p className="text-slate-700 leading-relaxed italic relative z-10">
                            "Happy Birthday, boss! Wishing you a fantastic day filled with laughter, good company, and of course some cake. May this year bring you continued success, good health (time to train hard!), new adventures, and plenty of reasons to smile. Thanks for everything you do—especially all those ‘approved by Daniel’ days off. We truly appreciate you"
                          </p>
                      </div>
                    </div>

                    {/* Control Tower Message */}
                    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                              <Wind className="w-8 h-8 text-blue-600" />
                          </div>
                      </div>
                      <div className="text-center md:text-left">
                          <h4 className="font-bold text-blue-900">Control Tower</h4>
                          <p className="text-blue-800/80 italic">
                              "We're forecasting clear skies, smooth sailing, and record-breaking profits in happiness for the year ahead. Keep soaring, Captain!"
                          </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                      <button 
                        onClick={() => setShowConfetti(true)}
                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-xl hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
                      >
                        <PartyPopper className="w-5 h-5 mr-2" />
                        Acknowledge & Celebrate
                      </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 mt-12 bg-white">
        <p>© 2024 Best Group Airfares Birthday Corp. All Rights Reserved.</p>
        <p className="text-xs mt-1">Flight BGA-044 • Terminal 4 • Gate 4</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// --- Subcomponents ---

const StatBar = ({ label, value, color, icon, warning }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-bold text-slate-700 items-center">
      <div className="flex items-center">
        <div className={`mr-2 p-1 rounded-full ${color} bg-opacity-20 text-slate-600`}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      <span className={warning ? "text-amber-500" : "text-blue-600"}>
        {warning ? "MAX CAPACITY" : `${value}%`}
      </span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const PerkCard = ({ title, desc, color }) => {
  const colorClasses = {
    blue: "border-l-blue-500 bg-blue-50/50",
    indigo: "border-l-indigo-500 bg-indigo-50/50",
    emerald: "border-l-emerald-500 bg-emerald-50/50",
    amber: "border-l-amber-500 bg-amber-50/50",
  };

  return (
    <div className={`p-5 rounded-r-xl border border-slate-200 border-l-4 ${colorClasses[color]} hover:shadow-md transition-shadow`}>
      <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};
