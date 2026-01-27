"use client"

import { useState, useEffect, useRef } from "react"
import {
  Leaf,
  Droplets,
  Wind,
  Thermometer,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  Wifi,
  Home,
  BarChart3,
  Settings,
  Bell,
  Database,
  ArrowRight,
  Sparkles,
  Plus,
  LayoutDashboard,
  FileText,
  ChevronLeft,
  ChevronRight,
  Power,
  Zap,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react"
// ModeToggle removed

const leafAnimationStyles = `
  @keyframes float1 {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
    50% { transform: translateY(-20px) rotate(10deg); opacity: 0.25; }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.12; }
    50% { transform: translateY(-25px) rotate(-15deg); opacity: 0.2; }
  }
  @keyframes float3 {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
    50% { transform: translateY(-18px) rotate(8deg); opacity: 0.18; }
  }
  @keyframes float4 {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.14; }
    50% { transform: translateY(-22px) rotate(-12deg); opacity: 0.22; }
  }
  .leaf-float-1 { animation: float1 4s ease-in-out infinite; }
  .leaf-float-2 { animation: float2 5s ease-in-out infinite; }
  .leaf-float-3 { animation: float3 4.5s ease-in-out infinite; }
  .leaf-float-4 { animation: float4 5.5s ease-in-out infinite; }
`

const SmartCropDemo = () => {
  const [activeView, setActiveView] = useState("home")
  const dashboardRef = useRef<HTMLDivElement>(null)
  const analyticsRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const alertsRef = useRef<HTMLDivElement>(null)
  const logsRef = useRef<HTMLDivElement>(null)
  const solutionsRef = useRef<HTMLDivElement>(null)
  const collaborateRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const [activeFarmType, setActiveFarmType] = useState("organic")
  const [sensorData, setSensorData] = useState({
    soilMoisture: 35,
    temperature: 21.5,
    humidity: 83.0,
    N: 90,
    P: 42,
    K: 43,
    rainfall: 203.2,
  })

  const [prediction, setPrediction] = useState({
    recommendedCrop: "rice",
    pumpCommand: "PUMP_ON",
    confidence: 0.92,
  })

  const [isPumpOn, setIsPumpOn] = useState(false)
  const [autoMode, setAutoMode] = useState(true)
  const [isSimulating, setIsSimulating] = useState(true)
  const [history, setHistory] = useState<Array<{
    timestamp: Date
    soilMoisture: number
    temperature: number
    humidity: number
    N: number
    P: number
    K: number
    rainfall: number
  }>>([])
  const [alerts, setAlerts] = useState([
    { id: 1, type: "info", message: "System started successfully", time: new Date() },
  ])

  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      setSensorData((prev) => {
        const newData = {
          soilMoisture: Math.max(10, Math.min(100, prev.soilMoisture + (Math.random() - 0.5) * 5)),
          temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
          humidity: Math.max(40, Math.min(95, prev.humidity + (Math.random() - 0.5) * 3)),
          N: Math.max(0, Math.min(140, prev.N + (Math.random() - 0.5) * 5)),
          P: Math.max(5, Math.min(145, prev.P + (Math.random() - 0.5) * 3)),
          K: Math.max(5, Math.min(205, prev.K + (Math.random() - 0.5) * 3)),
          rainfall: Math.max(20, Math.min(300, prev.rainfall + (Math.random() - 0.5) * 10)),
        }

        setHistory((h) => [...h.slice(-19), { ...newData, timestamp: new Date() }])

        if (autoMode) {
          const shouldPumpOn = newData.soilMoisture < 35
          if (shouldPumpOn !== isPumpOn) {
            setIsPumpOn(shouldPumpOn)
            setAlerts((a) => [
              {
                id: Date.now(),
                type: shouldPumpOn ? "warning" : "success",
                message: shouldPumpOn ? "Pump activated - Low soil moisture" : "Pump deactivated",
                time: new Date(),
              },
              ...a.slice(0, 9),
            ])
          }
        }

        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isSimulating, autoMode, isPumpOn])

  const togglePump = () => {
    setIsPumpOn(!isPumpOn)
    setAlerts((prev) => [
      {
        id: Date.now(),
        type: "info",
        message: `Pump manually ${!isPumpOn ? "activated" : "deactivated"}`,
        time: new Date(),
      },
      ...prev.slice(0, 9),
    ])
  }

  const getMoistureStatus = () => {
    if (sensorData.soilMoisture < 30)
      return { text: "Dry", color: "text-red-500", bg: "bg-red-50", border: "border-red-500" }
    if (sensorData.soilMoisture < 50)
      return { text: "Normal", color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-500" }
    return { text: "Wet", color: "text-green-500", bg: "bg-green-50", border: "border-green-500" }
  }

  const moistureStatus = getMoistureStatus()

  const scrollToDashboard = () => {
    setActiveView("dashboard")
    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const scrollToAnalytics = () => {
    setActiveView("analytics")
    setTimeout(() => {
      analyticsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const scrollToControls = () => {
    setActiveView("controls")
    setTimeout(() => {
      controlsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const scrollToAlerts = () => {
    setActiveView("alerts")
    setTimeout(() => {
      alertsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const scrollToLogs = () => {
    setActiveView("logs")
    setTimeout(() => {
      logsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const scrollToSolutions = () => {
    solutionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollToCollaborate = () => {
    collaborateRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollToHero = () => {
    setActiveView("home")
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = 340
      galleryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden font-sans text-gray-900">
      <style>{leafAnimationStyles}</style>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_70%)]" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Navbar (Annadata) - Moved to Top */}
      <div className="max-w-7xl mx-auto pt-6 px-4 relative z-50">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 flex items-center justify-between shadow-md transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
              <img src="/logo.png" alt="Annadata Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Annadata</h1>
              <p className="text-xs text-gray-600 font-medium">Smart Agriculture System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-sm font-medium bg-gray-50 rounded-full p-1 border border-gray-200">
              <button
                onClick={scrollToHero}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${activeView === 'home'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                  }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden xl:inline">Home</span>
              </button>
              <button
                onClick={scrollToDashboard}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${activeView === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                  }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden xl:inline">Dashboard</span>
              </button>
              <button
                onClick={scrollToAnalytics}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${activeView === 'analytics'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                  }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden xl:inline">Analytics</span>
              </button>
              <button
                onClick={scrollToControls}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${activeView === 'controls'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                  }`}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden xl:inline">Controls</span>
              </button>
              <button
                onClick={scrollToAlerts}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${activeView === 'alerts'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                  }`}
              >
                <Bell className="w-4 h-4" />
                <span className="hidden xl:inline">Alerts</span>
              </button>
              <button
                onClick={scrollToLogs}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${activeView === 'logs'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                  }`}
              >
                <FileText className="w-4 h-4" />
                <span className="hidden xl:inline">Logs</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-medium transition-all text-sm border ${isSimulating
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
              >
                {isSimulating ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                <span className="hidden sm:inline">{isSimulating ? "Pause" : "Resume"}</span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200">
                <Wifi className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOME VIEW - Landing Page Content */}
      {activeView === "home" && (
        <>
          {/* NEW HERO SECTION */}
          <div ref={heroRef} className="max-w-7xl mx-auto pt-16 pb-12 px-4 relative z-10">
            {/* Floating Stars/Sparkles */}
            <Sparkles className="absolute top-20 left-[10%] w-8 h-8 text-emerald-600 animate-pulse delay-700" strokeWidth={1.5} />
            <Sparkles className="absolute top-40 right-[15%] w-6 h-6 text-emerald-400 animate-pulse delay-300" strokeWidth={1.5} />
            <div className="absolute top-[30%] left-[20%] w-4 h-4 text-emerald-700 font-bold opacity-30">+</div>
            <div className="absolute top-[25%] right-[25%] w-4 h-4 text-emerald-700 font-bold opacity-30">+</div>


            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Top Notch Agriculture Platform
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
                Cultivating The Future <br />
                <span className="text-gray-900">Of Agriculture</span>
              </h1>

              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Empowering farmers with innovation, sustainability, and smart solutions to grow
                more efficiently and responsibly—for today and generations to come.
              </p>

              <div className="flex justify-center">
                <button
                  onClick={scrollToDashboard}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-xl shadow-gray-200"
                >
                  Get Started
                  <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Hero Image Section "The Journey to a Perfection" */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group">
              {/* Main Background Image */}
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src="/green-rice-crops-field-agriculture.jpg"
                  alt="Agricultural Landscape"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                      The Journey to a <br />Perfection.
                    </h2>
                  </div>
                  <div className="md:text-right">
                    <button className="text-white border-b border-white/50 pb-1 hover:border-white hover:text-emerald-100 transition-colors text-sm font-medium">
                      Book a Free Driving Experience
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-gray-100">
              <div className="text-center md:text-left md:pl-8 border-l-0 md:border-l-2 border-transparent hover:border-emerald-500 transition-colors pl-4">
                <div className="text-4xl font-bold text-gray-900 mb-2">35+</div>
                <div className="text-sm text-gray-500 font-medium">Year Of Experience</div>
              </div>
              <div className="text-center md:text-left md:pl-8 border-l-0 md:border-l-2 border-gray-100 hover:border-emerald-500 transition-colors pl-4">
                <div className="text-4xl font-bold text-gray-900 mb-2">260+</div>
                <div className="text-sm text-gray-500 font-medium">Field In Progress</div>
              </div>
              <div className="text-center md:text-left md:pl-8 border-l-0 md:border-l-2 border-gray-100 hover:border-emerald-500 transition-colors pl-4">
                <div className="text-4xl font-bold text-gray-900 mb-2">80,000+</div>
                <div className="text-sm text-gray-500 font-medium">Farmer Around World</div>
              </div>
              <div className="text-center md:text-left md:pl-8 border-l-0 md:border-l-2 border-gray-100 hover:border-emerald-500 transition-colors pl-4">
                <div className="text-4xl font-bold text-gray-900 mb-2">$16 Billion</div>
                <div className="text-sm text-gray-500 font-medium">Agricultural Product</div>
              </div>
            </div>
          </div>

          {/* Farm Type Gallery Section */}
          <div className="max-w-7xl mx-auto py-20 px-4 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Despite Agri-Tech Advances, Traditional Farming Highlights Ongoing Inefficiencies
                </h2>
              </div>
              <div className="text-right">
                <div className="text-4xl font-light text-gray-400 mb-4">2026</div>
                <div className="flex gap-4 text-sm font-medium">
                  {[
                    { id: 'organic', label: 'Organic farm' },
                    { id: 'automation', label: 'Automation farm' },
                    { id: 'biomedical', label: 'Bio-medical farm' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveFarmType(type.id)}
                      className={`pb-1 border-b-2 transition-colors ${activeFarmType === type.id ? 'text-gray-900 border-gray-900' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Farm Cards Carousel */}
            <div className="relative group">
              <div
                ref={galleryRef}
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Card 1 - Bio-Medical Farm */}
                <div className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
                  <div className="relative rounded-2xl overflow-hidden h-[340px] group/card cursor-pointer">
                    <img
                      src="/lush-green-leaves-plants-farm.jpg"
                      alt="Bio-Medical Farm"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="text-white text-lg font-bold mb-1">Bio-Medical Farm</div>
                      <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-emerald-500" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between px-2">
                    <span className="text-sm font-mono text-gray-400">01</span>
                    <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                      View Details <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Card 2 - Organic Fertilizer with Get Started */}
                <div className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-[340px] flex flex-col justify-between border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none group/card hover:-translate-y-1 transition-transform duration-300">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Get<br />Started Now</h3>
                      <button className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors shadow-lg">
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="relative rounded-xl overflow-hidden h-36 mt-4">
                      <img
                        src="/green-rice-crops-field-agriculture.jpg"
                        alt="Organic Fertilizer"
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between px-2">
                    <span className="text-sm font-mono text-gray-400">02</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Organic Fertilizer</span>
                  </div>
                </div>

                {/* Card 3 - Technology Irrigation */}
                <div className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
                  <div className="relative rounded-2xl overflow-hidden h-[340px] group/card cursor-pointer">
                    <img
                      src="/corn-field-stalks-agriculture.jpg"
                      alt="Technology Irrigation"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="text-white text-lg font-bold mb-1">Technology Irrigation</div>
                      <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-blue-500" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between px-2">
                    <span className="text-sm font-mono text-gray-400">03</span>
                    <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                      View Details <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Card 4 - Agricultural Monitoring */}
                <div className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
                  <div className="relative rounded-2xl overflow-hidden h-[340px] group/card cursor-pointer">
                    <img
                      src="/wheat-field-harvest-golden-crops.jpg"
                      alt="Agricultural Monitoring"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="text-white text-lg font-bold mb-1">Agri-Monitoring</div>
                      <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-amber-500" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between px-2">
                    <span className="text-sm font-mono text-gray-400">04</span>
                    <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                      View Details <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scroll Controls */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => scrollGallery('left')}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 hover:border-emerald-500 transition-all duration-200 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => scrollGallery('right')}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 hover:border-emerald-500 transition-all duration-200 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Carousel Navigation */}

          </div>

          {/* Collaborate & Learn Section */}
          <div ref={collaborateRef} className="max-w-7xl mx-auto px-4 mb-20 relative z-10">
            <div className="relative rounded-3xl overflow-hidden h-[500px] group">
              <img
                src="/green-rice-crops-field-agriculture.jpg"
                alt="Collaborate and Learn"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                <div className="max-w-md">
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight italic">
                    Collaborate And Learn From Industry Experts And Enthusiasts
                  </h2>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Manitoba, Canada</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <div className="bg-lime-400 text-gray-900 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      01/05
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next-Gen Solutions Section */}
          <div ref={solutionsRef} className="max-w-7xl mx-auto py-20 px-4 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-md">
                Next-Gen Solutions For Optimal Crop Growth
              </h2>
              <p className="text-gray-600 max-w-md leading-relaxed">
                We deliver advanced solutions to support farmers in boosting crop yields. Our smart farming, field analytics, and automation tools are transforming agriculture.
              </p>
            </div>

            {/* Solution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Farming Precision */}
              <div className="group">
                <div className="relative rounded-2xl overflow-hidden h-[280px] mb-4">
                  <img
                    src="/plant-leaves-green-agriculture.jpg"
                    alt="Farming Precision"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Farming Precision</h3>
                <p className="text-sm text-gray-600">Our precision farming employs state-of-the-art technology to optimize every aspect of farm operations.</p>
              </div>

              {/* Crop Surveillance */}
              <div className="group">
                <div className="relative rounded-2xl overflow-hidden h-[280px] mb-4">
                  <img
                    src="/wheat-field-harvest-golden-crops.jpg"
                    alt="Crop Surveillance"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Crop Surveillance</h3>
                <p className="text-sm text-gray-600">Track your crops' health and growth in real-time with our innovative solutions.</p>
              </div>

              {/* Automated Farming */}
              <div className="group">
                <div className="relative rounded-2xl overflow-hidden h-[280px] mb-4">
                  <img
                    src="/lush-green-leaves-plants-farm.jpg"
                    alt="Automated Farming"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Automated Farming</h3>
                <p className="text-sm text-gray-600">Enhance farm efficiency and productivity with our cutting-edge automation solutions.</p>
              </div>
            </div>
          </div>

          {/* Sustainability Section */}
          <div className="max-w-7xl mx-auto py-16 px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-28 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src="/green-rice-crops-field-agriculture.jpg"
                  alt="Solar Panels"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                We Combine Sustainable Methods With Smart Tech To Make Farming Efficient, Eco-Friendly, And Future-Ready.
              </h2>
            </div>
          </div>

          {/* Newsletter CTA Section */}
          <div className="max-w-7xl mx-auto px-4 mb-20 relative z-10">
            <div className="relative rounded-3xl overflow-hidden h-[400px]">
              <img
                src="/wheat-field-harvest-golden-crops.jpg"
                alt="Join the Revolution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />

              {/* CTA Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Join the Agricultural<br />Revolution Today!
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="flex-1 px-4 py-3 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tabs Navigation REMOVED to fix 'Double Dashboard' issue */}
      {/* The main navbar now handles all view switching */}
      {activeView !== "home" && (
        <>
          {/* Dashboard/Feature Content */}
          <div className="max-w-7xl mx-auto relative z-10 px-4 pt-8 pb-12" ref={dashboardRef}>
            {activeView === "dashboard" && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                    className={`${moistureStatus.bg} rounded-xl shadow-sm p-8 border border-emerald-200 relative overflow-hidden`}
                  >
                    <div className="absolute -top-8 -right-8 opacity-10">
                      <img
                        src="/plant-leaves-green-agriculture.jpg"
                        alt="Decorative leaves"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    <div className="text-center relative z-10">
                      <Droplets className={`w-14 h-14 mx-auto mb-3 ${moistureStatus.color}`} />
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Soil Moisture</h2>
                      <div className={`text-6xl font-bold ${moistureStatus.color} mb-3`}>
                        {sensorData.soilMoisture.toFixed(1)}%
                      </div>
                      <div
                        className={`inline-block px-5 py-2 rounded-full ${moistureStatus.color} bg-white font-semibold text-base shadow-xs border border-current border-opacity-20`}
                      >
                        {moistureStatus.text}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-200 relative overflow-hidden">
                    <div className="absolute -bottom-4 -right-4 opacity-8">
                      <Leaf className="w-20 h-20 text-amber-600" />
                    </div>
                    <Thermometer className="w-11 h-11 text-amber-700 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Temperature</h3>
                    <div className="text-5xl font-bold text-amber-700">{sensorData.temperature.toFixed(1)}°C</div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-200 relative overflow-hidden">
                    <div className="absolute -top-6 -left-6 opacity-8">
                      <Leaf className="w-24 h-24 text-blue-400 rotate-45" />
                    </div>
                    <Wind className="w-11 h-11 text-blue-700 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Humidity</h3>
                    <div className="text-5xl font-bold text-blue-700">{sensorData.humidity.toFixed(1)}%</div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl shadow-sm p-8 border border-emerald-500 text-white md:col-span-2 relative overflow-hidden">
                    <div className="absolute opacity-15 pointer-events-none" style={{ top: "10px", right: "10px" }}>
                      <img
                        src="/rice-crop-plant-recommendation-agriculture.jpg"
                        alt="Crop recommendations"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                    <Leaf className="w-11 h-11 mb-3" />
                    <h3 className="text-xl font-semibold mb-3">Recommended Crop</h3>
                    <div className="text-5xl font-bold uppercase mb-3">{prediction.recommendedCrop}</div>
                    <div className="bg-white/15 backdrop-blur rounded-lg px-4 py-2 inline-block">
                      <span className="text-base font-medium">Confidence: {(prediction.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div
                    className={`rounded-xl shadow-sm p-8 border relative overflow-hidden ${isPumpOn ? "bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-600 text-white" : "bg-white border-amber-200 text-gray-800"}`}
                  >
                    <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
                      <Leaf className="w-24 h-24" />
                    </div>
                    <Power className="w-11 h-11 mb-3" />
                    <h3 className="text-xl font-semibold mb-2">Irrigation Pump</h3>
                    <div className="text-4xl font-bold">{isPumpOn ? "ON" : "OFF"}</div>
                  </div>
                </div>
              </>
            )}

            {activeView === "analytics" && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h2>
                <div ref={analyticsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-200 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-8">
                      <img
                        src="/nutrients-soil-npk-fertilizer.jpg"
                        alt="Nutrients"
                        className="w-28 h-28 rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                      <Zap className="w-7 h-7 text-emerald-700" />
                      Soil Nutrients (NPK)
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-base font-medium text-gray-700">Nitrogen (N)</span>
                          <span className="text-xl font-bold text-emerald-700">{sensorData.N.toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-emerald-100 rounded-full h-3">
                          <div
                            className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(sensorData.N / 140) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-base font-medium text-gray-700">Phosphorus (P)</span>
                          <span className="text-xl font-bold text-amber-700">{sensorData.P.toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-3">
                          <div
                            className="bg-amber-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(sensorData.P / 145) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-base font-medium text-gray-700">Potassium (K)</span>
                          <span className="text-xl font-bold text-yellow-700">{sensorData.K.toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-yellow-100 rounded-full h-3">
                          <div
                            className="bg-yellow-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(sensorData.K / 205) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-200 relative overflow-hidden">
                    <div className="absolute -bottom-8 -left-8 opacity-10">
                      <Leaf className="w-32 h-32 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent History</h3>
                    <div className="space-y-3">
                      {history
                        .slice(-5)
                        .reverse()
                        .map((item, idx) => (
                          <div key={idx} className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                            <div className="text-xs text-emerald-700 font-medium mb-2">
                              {item.timestamp?.toLocaleTimeString()}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                              <div>
                                Moisture:{" "}
                                <span className="font-semibold text-emerald-700">{item.soilMoisture?.toFixed(1)}%</span>
                              </div>
                              <div>
                                Temp: <span className="font-semibold text-amber-700">{item.temperature?.toFixed(1)}°C</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeView === "controls" && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Controls</h2>
                <div ref={controlsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-8 border border-emerald-200 relative overflow-hidden">
                    <div className="absolute -top-8 -right-8 opacity-10">
                      <Leaf className="w-28 h-28 text-emerald-600 rotate-45" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Irrigation Control</h3>
                    <div className="space-y-6">
                      <label className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg cursor-pointer border border-emerald-100">
                        <span className="text-base font-medium text-emerald-800">Automatic Mode</span>
                        <input
                          type="checkbox"
                          checked={autoMode}
                          onChange={(e) => setAutoMode(e.target.checked)}
                          className="w-5 h-5 accent-emerald-600"
                        />
                      </label>

                      <button
                        onClick={togglePump}
                        disabled={autoMode}
                        className={`w-full py-8 rounded-lg font-bold text-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${isPumpOn ? "bg-emerald-600 text-white shadow-sm" : "bg-amber-100 text-amber-800 border border-amber-200"}`}
                      >
                        <Power className="w-12 h-12 mx-auto mb-2" />
                        {isPumpOn ? "PUMP ON" : "PUMP OFF"}
                      </button>

                      <div className="text-center text-gray-700 font-medium bg-amber-50 py-3 rounded-lg border border-amber-100 text-sm">
                        {autoMode ? "🌾 Automatic irrigation active" : "👨‍🌾 Manual control enabled"}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-8 border border-amber-200 relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 opacity-8">
                      <img
                        src="/farm-field-settings-configuration.jpg"
                        alt="Settings"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">System Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Moisture Threshold</label>
                        <input type="range" min="20" max="60" defaultValue="35" className="w-full accent-emerald-600" />
                        <div className="text-center text-sm text-emerald-700 font-medium mt-1 bg-emerald-50 py-1 rounded">
                          35%
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
                        <select className="w-full p-3 rounded-lg border border-amber-200 bg-white focus:border-emerald-500 focus:outline-none text-sm text-gray-700">
                          <option>Every 3 seconds</option>
                          <option>Every 5 seconds</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeView === "alerts" && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Alerts</h2>
                <div ref={alertsRef} className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border flex gap-3 ${alert.type === "warning"
                        ? "bg-red-50 border-red-200"
                        : alert.type === "success"
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-blue-50 border-blue-200"
                        }`}
                    >
                      <AlertCircle
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${alert.type === "warning"
                          ? "text-red-600"
                          : alert.type === "success"
                            ? "text-emerald-600"
                            : "text-blue-600"
                          }`}
                      />
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{alert.message}</p>
                        <p className="text-xs text-gray-600 mt-1">{alert.time?.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeView === "logs" && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">System Logs</h2>
                <div ref={logsRef} className="bg-white rounded-xl shadow-sm p-6 border border-emerald-200">
                  <div className="absolute -bottom-8 -right-8 opacity-8">
                    <Leaf className="w-28 h-28 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Database className="w-8 h-8 text-emerald-700" />
                    System Logs
                  </h3>
                  <div className="space-y-2 font-mono text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                    {history.slice(-10).map((entry, idx) => (
                      <div key={idx} className="text-gray-700">
                        <span className="text-emerald-700">[{entry.timestamp?.toLocaleTimeString()}]</span> Moisture:{" "}
                        <span className="text-amber-700">{entry.soilMoisture?.toFixed(1)}%</span> | Temp:{" "}
                        <span className="text-orange-700">{entry.temperature?.toFixed(1)}°C</span> | Humidity:{" "}
                        <span className="text-blue-700">{entry.humidity?.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Footer Section - Always visible */}
      <footer ref={footerRef} className="max-w-7xl mx-auto px-4 py-16 mt-20 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-600 p-2 rounded-lg text-white">
                <Leaf className="w-6 h-6" fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Annadata</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6 max-w-xs">
              Annadata is a smart agriculture platform based in India, proudly serving farmers with innovative solutions.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Facebook className="w-5 h-5 text-gray-600" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Twitter className="w-5 h-5 text-gray-600" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Instagram className="w-5 h-5 text-gray-600" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Linkedin className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Resource</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Customer Stories</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Information</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Legal</a></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Help</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
          © 2026 Annadata. All rights reserved.
        </div>
      </footer>
    </div >
  )
}

export default SmartCropDemo
