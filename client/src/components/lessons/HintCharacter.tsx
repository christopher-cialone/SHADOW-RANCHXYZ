import { useState, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechCard } from "@/components/ui/TechCard";

interface HintCharacterProps {
  stepHints?: string[];
  currentStep?: number;
}

export interface HintCharacterRef {
  showHint: (message: string) => void;
  showContextualHint: (stepId: number) => void;
  showProgressiveHint: (attemptCount: number) => void;
}

const HintCharacter = forwardRef<HintCharacterRef, HintCharacterProps>((props, ref) => {
  const { stepHints = [], currentStep = 1 } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [hintType, setHintType] = useState<'default' | 'contextual' | 'progressive'>('default');

  const progressiveHints = [
    "Try checking the syntax carefully. Look for any missing characters.",
    "Remember to follow the exact pattern shown in the instructions.",
    "Take a closer look at the example code structure. What might be missing?",
    "Check for typos, spacing, and proper capitalization in your code.",
    "Still stuck? The solution requires following the exact pattern specified in the challenge."
  ];

  useImperativeHandle(ref, () => ({
    showHint: (hintMessage: string) => {
      setMessage(hintMessage);
      setHintType('default');
      setIsVisible(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 8000);
    },
    
    showContextualHint: (stepId: number) => {
      const stepHint = stepHints[stepId - 1] || "Keep working through the challenge step by step!";
      setMessage(stepHint);
      setHintType('contextual');
      setIsVisible(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    },
    
    showProgressiveHint: (attemptCount: number) => {
      const hintIndex = Math.min(attemptCount - 1, progressiveHints.length - 1);
      const progressiveHint = progressiveHints[hintIndex];
      setMessage(progressiveHint);
      setHintType('progressive');
      setIsVisible(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 12000);
    }
  }));

  const getBubbleColor = () => {
    switch (hintType) {
      case 'contextual':
        return 'bg-tech-purple-500 border-t-tech-purple-500';
      case 'progressive':
        return 'bg-amber-500 border-t-amber-500';
      default:
        return 'bg-tech-cyan-500 border-t-tech-cyan-500';
    }
  };

  const getCharacterEmoji = () => {
    switch (hintType) {
      case 'contextual':
        return '🎯';
      case 'progressive':
        return '💡';
      default:
        return '🤖';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Enhanced Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="absolute bottom-20 right-0 mb-2 mr-4 max-w-sm"
            >
              <div className={`relative ${getBubbleColor().split(' ')[0]} border-2 border-tech-cyan-600/50 shadow-2xl rounded-lg`}>
                <div className="p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-lg flex-shrink-0 mt-0.5">{getCharacterEmoji()}</span>
                    <div>
                      <div className="text-xs font-tech text-tech-cyan-300 uppercase tracking-wider mb-1">
                        {hintType === 'contextual' ? 'CONTEXTUAL HINT' : 
                         hintType === 'progressive' ? 'PROGRESSIVE HINT' : 'AI ASSISTANT'}
                      </div>
                      <p className="text-sm font-code leading-relaxed text-white">{message}</p>
                    </div>
                  </div>
                </div>
                {/* Enhanced Speech bubble tail */}
                <div className="absolute bottom-0 right-8 transform translate-y-full">
                  <div className={`w-0 h-0 border-x-8 border-t-8 border-solid border-transparent ${getBubbleColor().split(' ')[1]}`}></div>
                </div>
              </div>
            </motion.div>

            

            {/* Floating particles around character */}
            <motion.div
              animate={{
                y: [-2, 2, -2],
                x: [-1, 1, -1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-tech-cyan-400 rounded-full"
            />
            <motion.div
              animate={{
                y: [2, -2, 2],
                x: [1, -1, 1],
                opacity: [0.5, 0.9, 0.5]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-tech-purple-400 rounded-full"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

HintCharacter.displayName = "HintCharacter";

export { HintCharacter };