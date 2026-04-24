import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Clock, Moon, Zap } from 'lucide-react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function CountUp({ end, duration = 2, suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  {
    icon: Heart,
    label: 'Heartbeats Today',
    value: 100800,
    suffix: '',
    color: 'text-rose-400',
    glowColor: 'shadow-rose-500/20',
    borderColor: 'border-rose-500/20',
  },
  {
    icon: Clock,
    label: 'Hours in a Week',
    value: 168,
    suffix: '',
    color: 'text-cyan-400',
    glowColor: 'shadow-cyan-500/20',
    borderColor: 'border-cyan-500/20',
  },
  {
    icon: Moon,
    label: 'Lunar Cycles / Year',
    value: 13,
    suffix: '',
    color: 'text-purple-400',
    glowColor: 'shadow-purple-500/20',
    borderColor: 'border-purple-500/20',
  },
  {
    icon: Zap,
    label: 'Weeks in 80 Years',
    value: 4160,
    suffix: '',
    color: 'text-amber-400',
    glowColor: 'shadow-amber-500/20',
    borderColor: 'border-amber-500/20',
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="absolute inset-0 gradient-bg opacity-30" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extralight text-white/90 mb-4 tracking-wider">
            Time in <span className="text-purple-400/80">Numbers</span>
          </h2>
          <p className="text-white/40 font-light">
            Small reminders of the scale of our existence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card glass-card-hover rounded-xl p-6 text-center transition-all duration-300 ${stat.borderColor}`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 mb-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extralight text-white/90 mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/40 font-light tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
