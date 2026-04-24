import { motion } from 'framer-motion';
import { Instagram, Linkedin, Phone, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-white/5">
      <div className="absolute inset-0 gradient-bg opacity-20" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card rounded-xl p-8 inline-block w-full max-w-lg">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span className="text-white/60 font-light tracking-wide">Crafted by</span>
            </div>
            
            <h3 className="text-2xl font-extralight text-white/90 mb-2 tracking-wider">
              Sarthak Pankar
            </h3>
            
            <div className="flex items-center justify-center gap-2 text-white/40 mb-8">
              <Phone className="w-4 h-4" />
              <span className="font-light">9766816081</span>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <motion.a
                href="https://instagram.com/isarthakpankar"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-rose-400 hover:bg-rose-500/10 hover:border-rose-400/30 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/sarthak-pankar-b446b4318"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
          
          <div className="mt-8 text-white/20 text-sm font-light tracking-wide">
            Luminous.life — Reflect. Visualize. Live.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
