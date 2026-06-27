import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ExpandableCardProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  content?: React.ReactNode;
}

export default function ExpandableEventCard({
  imageSrc = "https://assets.watermelon.sh/event.avif",
  title = "Neon Nights Festival",
  description = "Experience the ultimate electronic music festival with top DJs and immersive visual arts.",
  content
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = `expandable-event-card-${title}`;

  return (
    <>
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group shadow-sm"
      >
        <motion.div layoutId={`image-container-${layoutId}`} className="relative h-48 w-full overflow-hidden">
          <motion.img 
            layoutId={`image-${layoutId}`} 
            src={imageSrc} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </motion.div>
        <div className="p-4 sm:p-5">
          <motion.h3 layoutId={`title-${layoutId}`} className="text-base font-medium tracking-tight text-foreground mb-1">{title}</motion.h3>
          <motion.p layoutId={`desc-${layoutId}`} className="text-muted-foreground text-xs tracking-wide line-clamp-2">{description}</motion.p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-2xl bg-card rounded-2xl overflow-hidden border border-border z-10 flex flex-col shadow-xl"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center bg-background/50 hover:bg-accent rounded-full border border-border text-foreground transition-colors backdrop-blur-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              
              <motion.div layoutId={`image-container-${layoutId}`} className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
                <motion.img 
                  layoutId={`image-${layoutId}`} 
                  src={imageSrc} 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
              
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                <motion.h3 layoutId={`title-${layoutId}`} className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-2">{title}</motion.h3>
                <motion.p layoutId={`desc-${layoutId}`} className="text-primary text-xs font-medium tracking-wide uppercase mb-6">{description}</motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0, delay: 0.1 }}
                  className="text-foreground/80 text-sm leading-relaxed"
                >
                  {content || (
                    <div className="space-y-4">
                      <p>Join us for three unforgettable nights of pulsating beats and breathtaking light shows. The Neon Nights Festival brings together the best electronic music artists from around the globe.</p>
                      <h4 className="text-foreground font-semibold mt-6 mb-2 tracking-tight">Event Details:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Dates: August 15-17, 2026</li>
                        <li>Location: Downtown Arena</li>
                        <li>Age Restriction: 18+ only</li>
                      </ul>
                      <button className="mt-6 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto shadow-sm">
                        Get Tickets
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
