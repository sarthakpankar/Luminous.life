import { motion } from 'framer-motion';
import WeeksOfLife from '../components/WeeksOfLife';

export default function ToolSection() {
  return (
    <section id="tool-section" className="relative py-20 px-4">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 gradient-bg opacity-50" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extralight text-white/90 mb-4 tracking-wider">
            Your <span className="text-cyan-400/80">Life</span> in Weeks
          </h2>
          <p className="text-white/40 font-light max-w-md mx-auto">
            A gentle reminder of time's passage. Enter your birthdate to begin.
          </p>
        </motion.div>

        {/* Glassmorphism card wrapping the tool */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="glass-card glow-border rounded-2xl overflow-hidden"
        >
          <WeeksOfLife />
        </motion.div>
      </div>
    </section>
  );
}
