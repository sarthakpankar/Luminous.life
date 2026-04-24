import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, RotateCcw, Moon, Users, Globe, Sparkles } from 'lucide-react';

interface StatsData {
  weeksLived: number;
  totalWeeks: number;
  weeksRemaining: number;
  percentageLived: number;
  daysLived: number;
  hoursSlept: number;
  heartbeats: number;
  breaths: number;
  seasons: number;
  birthYear: number;
}

export default function WeeksOfLife() {
  const [step, setStep] = useState(1);
  const [birthdate, setBirthdate] = useState('');
  const [stats, setStats] = useState<StatsData | null>(null);
  const [showHoverData, setShowHoverData] = useState(false);
  const [hoverWeek, setHoverWeek] = useState<number | null>(null);
  
  const calculateStats = (date: string): StatsData => {
    const birthDate = new Date(date);
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    
    // Calculate weeks lived
    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / msInWeek);
    
    // Assuming average lifespan of ~80 years (4160 weeks)
    const totalWeeks = 4160;
    const weeksRemaining = totalWeeks - weeksLived;
    const percentageLived = Math.round((weeksLived / totalWeeks) * 100);
    
    // Calculate days lived
    const msInDay = 1000 * 60 * 60 * 24;
    const daysLived = Math.floor((today.getTime() - birthDate.getTime()) / msInDay);
    
    // Calculate hours slept (assuming 8 hours per day)
    const hoursSlept = Math.floor(daysLived * 8);
    
    // Calculate heartbeats (average 70 bpm)
    const heartbeats = Math.floor(daysLived * 24 * 60 * 70);
    
    // Calculate breaths (average 16 breaths per minute)
    const breaths = Math.floor(daysLived * 24 * 60 * 16);

    // Calculate seasons experienced
    const seasons = Math.floor(daysLived / 91.25);
    
    return {
      weeksLived,
      totalWeeks,
      weeksRemaining,
      percentageLived,
      daysLived,
      hoursSlept,
      heartbeats,
      breaths,
      seasons,
      birthYear
    };
  };
  
  // Helper functions for contextual statistics
  const getPopulationAtYear = (year: number): number => {
    // World population estimates by year (in billions)
    const populationData: Record<string, number> = {
      1950: 2.5,
      1960: 3.0,
      1970: 3.7,
      1980: 4.4,
      1990: 5.3,
      2000: 6.1,
      2010: 6.9,
      2020: 7.8,
      2025: 8.1
    };
    
    // Find the closest year in our data
    const years = Object.keys(populationData).map(Number);
    const closestYear = years.reduce((prev, curr) => 
      Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
    );
    
    return Math.round(populationData[String(closestYear)] * 1000000000);
  };
  
  const getAverageBirthsPerDay = () => {
    // Approximately 385,000 births per day globally (as of 2023)
    return 385000;
  };
  
  const getAverageDeathsPerDay = () => {
    // Approximately 166,000 deaths per day globally (as of 2023)
    return 166000;
  };

  const handleSubmit = () => {
    setStats(calculateStats(birthdate));
    setStep(2);
  };

  const getFormattedNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  const renderWeekGrid = () => {
    if (!stats) return null;
    
    const rows = [];
    const weeksPerRow = 52;
    const totalRows = Math.ceil(stats.totalWeeks / weeksPerRow);
    
    for (let row = 0; row < totalRows; row++) {
      const weekCells = [];
      for (let col = 0; col < weeksPerRow; col++) {
        const weekNumber = row * weeksPerRow + col;
        if (weekNumber < stats.totalWeeks) {
          const isPast = weekNumber < stats.weeksLived;
          const isCurrent = weekNumber === stats.weeksLived;
          
          let cellClass = "w-1.5 h-1.5 m-[1px] rounded-[1px] transition-all duration-300 cursor-pointer ";
          if (isPast) {
            cellClass += "bg-white/20 hover:bg-cyan-400/60 hover:shadow-[0_0_6px_rgba(34,211,238,0.6)] ";
          } else if (isCurrent) {
            cellClass += "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse ";
          } else {
            cellClass += "bg-white/5 hover:bg-purple-400/40 hover:shadow-[0_0_6px_rgba(192,132,252,0.5)] ";
          }
          
          weekCells.push(
            <div 
              key={weekNumber}
              className={cellClass}
              onMouseEnter={() => {
                setHoverWeek(weekNumber);
                setShowHoverData(true);
              }}
              onMouseLeave={() => setShowHoverData(false)}
            />
          );
        }
      }
      
      rows.push(
        <div key={row} className="flex">
          {weekCells}
        </div>
      );
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-8 bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-xl"
      >
        <h2 className="text-lg font-light mb-4 text-white/90 tracking-wide">Your life in weeks</h2>
        <div className="flex flex-col overflow-x-auto">
          {rows}
        </div>
        
        {showHoverData && hoverWeek !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-white/60"
          >
            Week {hoverWeek + 1}: 
            {hoverWeek < stats.weeksLived ? 
              " A week from your past" : 
              hoverWeek === stats.weeksLived ? 
              " Your current week" : 
              " A week in your potential future"}
          </motion.div>
        )}
        
        <div className="flex mt-6 text-sm gap-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white/20 mr-2 rounded-[1px]"></div>
            <span className="text-white/50">Past</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-cyan-400 mr-2 rounded-[1px] shadow-[0_0_6px_rgba(34,211,238,0.6)]"></div>
            <span className="text-white/50">Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white/5 mr-2 rounded-[1px]"></div>
            <span className="text-white/50">Future</span>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderStats = () => {
    if (!stats) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 space-y-6"
      >
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <h2 className="text-lg font-light mb-4 text-white/90 tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Life highlights
          </h2>
          <div className="space-y-4">
            <p className="text-white/60 leading-relaxed">
              You've lived <span className="text-cyan-300 font-medium">{getFormattedNumber(stats.weeksLived)}</span> weeks, which is <span className="text-cyan-300 font-medium">{stats.percentageLived}%</span> of a full life.
            </p>
            <p className="text-white/60 leading-relaxed">
              That's <span className="text-cyan-300 font-medium">{getFormattedNumber(stats.daysLived)}</span> days of experience and approximately <span className="text-cyan-300 font-medium">{getFormattedNumber(stats.seasons)}</span> seasons observed.
            </p>
            <p className="text-white/60 leading-relaxed">
              Your heart has beaten approximately <span className="text-cyan-300 font-medium">{getFormattedNumber(stats.heartbeats)}</span> times.
            </p>
            <p className="text-white/60 leading-relaxed">
              You've taken around <span className="text-cyan-300 font-medium">{getFormattedNumber(stats.breaths)}</span> breaths and slept about <span className="text-cyan-300 font-medium">{getFormattedNumber(stats.hoursSlept)}</span> hours.
            </p>
          </div>
        </div>
        
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <h2 className="text-lg font-light mb-4 text-white/90 tracking-wide flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            Societal context
          </h2>
          <div className="space-y-4">
            <p className="text-white/60 leading-relaxed">
              During your lifetime, humanity's population has grown from {stats.birthYear ? <span className="text-cyan-300 font-medium">{getFormattedNumber(getPopulationAtYear(stats.birthYear))}</span> : ""} to over <span className="text-cyan-300 font-medium">8 billion</span> people.
            </p>
            <p className="text-white/60 leading-relaxed">
              The average person will meet around <span className="text-cyan-300 font-medium">80,000</span> people in their lifetime. You've likely already met approximately <span className="text-cyan-300 font-medium">{getFormattedNumber(Math.round(80000 * (stats.percentageLived/100)))}</span> individuals.
            </p>
            <p className="text-white/60 leading-relaxed">
              Since your birth, humanity has collectively experienced approximately <span className="text-cyan-300 font-medium">{getFormattedNumber(Math.round(stats.daysLived * getAverageBirthsPerDay()))}</span> births and <span className="text-cyan-300 font-medium">{getFormattedNumber(Math.round(stats.daysLived * getAverageDeathsPerDay()))}</span> deaths.
            </p>
          </div>
        </div>
        
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <h2 className="text-lg font-light mb-4 text-white/90 tracking-wide flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Cosmic perspective
          </h2>
          <div className="space-y-4">
            <p className="text-white/60 leading-relaxed">
              Since your birth, Earth has traveled approximately <span className="text-cyan-300 font-medium">{getFormattedNumber(Math.round(stats.daysLived * 1.6 * 1000000))}</span> kilometers through space around the Sun.
            </p>
            <p className="text-white/60 leading-relaxed">
              The observable universe is about <span className="text-cyan-300 font-medium">93 billion</span> light-years across, meaning light takes <span className="text-cyan-300 font-medium">93 billion</span> years to cross it. Your entire lifespan is just <span className="text-cyan-300 font-medium">{(80/13800000000 * 100).toFixed(10)}%</span> of the universe's age.
            </p>
            <p className="text-white/60 leading-relaxed">
              During your lifetime, our solar system has moved about <span className="text-cyan-300 font-medium">{getFormattedNumber(Math.round(stats.daysLived * 24 * 828000))}</span> kilometers through the Milky Way galaxy.
            </p>
          </div>
        </div>
        
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <h2 className="text-lg font-light mb-4 text-white/90 tracking-wide flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400" />
            Natural world
          </h2>
          <div className="space-y-4">
            <p className="text-white/60 leading-relaxed">
              You've experienced approximately <span className="text-cyan-300 font-medium">{getFormattedNumber(Math.round(stats.daysLived / 29.53))}</span> lunar cycles and <span className="text-cyan-300 font-medium">{getFormattedNumber(Math.floor(stats.daysLived / 365.25))}</span> trips around the Sun.
            </p>
            <p className="text-white/60 leading-relaxed">
              A giant sequoia tree can live over 3,000 years. Your current age is <span className="text-cyan-300 font-medium">{((stats.daysLived / 365.25) / 3000 * 100).toFixed(2)}%</span> of its potential lifespan.
            </p>
            <p className="text-white/60 leading-relaxed">
              During your lifetime, your body has replaced most of its cells several times. You are not made of the same atoms you were born with.
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  const handleReset = () => {
    setBirthdate('');
    setStats(null);
    setStep(1);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-extralight text-white/90 mb-2 tracking-wider">Life in weeks</h1>
          <p className="text-white/40 mb-8 font-light">A simple visualization to reflect on the passage of time</p>
        </motion.div>
        
        {step === 1 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 rounded-xl"
          >
            <h2 className="text-xl font-light mb-6 text-white/90 tracking-wide flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyan-400" />
              When were you born?
            </h2>
            <div>
              <input
                type="date"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg mb-6 text-white/90 placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 py-3 rounded-lg hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 font-light tracking-wide"
                disabled={!birthdate}
              >
                Visualize your time
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {renderWeekGrid()}
            {renderStats()}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="mt-8 w-full bg-white/5 border border-white/10 text-white/60 py-3 rounded-lg hover:bg-white/10 hover:text-white/80 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 font-light"
            >
              <RotateCcw className="w-4 h-4" />
              Start over
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}
