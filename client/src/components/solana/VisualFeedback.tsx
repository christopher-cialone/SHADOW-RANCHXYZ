import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface VisualFeedbackProps {
  effect: string;
  isVisible: boolean;
  onComplete?: () => void;
}

export function VisualFeedback({ effect, isVisible, onComplete }: VisualFeedbackProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setAnimationPhase(0);
      const timer = setTimeout(() => {
        setAnimationPhase(1);
        setTimeout(() => {
          onComplete?.();
        }, 2000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  const renderEffect = () => {
    switch (effect) {
      case 'blueprint':
        return <BlueprintEffect phase={animationPhase} />;
      case 'initialize_button':
        return <InitializeButtonEffect phase={animationPhase} />;
      case 'data_flow':
        return <DataFlowEffect phase={animationPhase} />;
      case 'chain_write':
        return <ChainWriteEffect phase={animationPhase} />;
      case 'update_button':
        return <UpdateButtonEffect phase={animationPhase} />;
      case 'access_control':
        return <AccessControlEffect phase={animationPhase} />;
      case 'pda_creation':
        return <PDACreationEffect phase={animationPhase} />;
      case 'cpi_call':
        return <CPICallEffect phase={animationPhase} />;
      case 'sol_transfer':
        return <SOLTransferEffect phase={animationPhase} />;
      case 'error_handling':
        return <ErrorHandlingEffect phase={animationPhase} />;
      default:
        return <DefaultEffect />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-lg border border-cyan-400/30"
        >
          {renderEffect()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Individual effect components
function BlueprintEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="300" height="300" fill="url(#grid)" />
        
        {/* Blueprint structure being drawn */}
        <motion.rect
          x="50" y="50" width="200" height="150"
          fill="none" stroke="#00ffff" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        <motion.rect
          x="75" y="75" width="150" height="100"
          fill="none" stroke="#00ffff" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        
        <motion.text
          x="150" y="130" textAnchor="middle"
          fill="#00ffff" fontSize="12" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
          MY_CHYRON
        </motion.text>
      </svg>
    </div>
  );
}

function InitializeButtonEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Existing blueprint */}
        <rect x="50" y="50" width="200" height="150" fill="none" stroke="#00ffff" strokeWidth="2" />
        <rect x="75" y="75" width="150" height="100" fill="none" stroke="#00ffff" strokeWidth="1.5" />
        
        {/* Initialize button being added */}
        <motion.rect
          x="100" y="220" width="100" height="30"
          fill="#00ffff" stroke="#00ffff" strokeWidth="1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        <motion.text
          x="150" y="240" textAnchor="middle"
          fill="#000000" fontSize="10" fontFamily="monospace" fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          INITIALIZE
        </motion.text>
      </svg>
    </div>
  );
}

function DataFlowEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Program box */}
        <rect x="50" y="100" width="80" height="60" fill="none" stroke="#00ffff" strokeWidth="2" />
        <text x="90" y="135" textAnchor="middle" fill="#00ffff" fontSize="10" fontFamily="monospace">PROGRAM</text>
        
        {/* Data flow arrow */}
        <motion.path
          d="M 130 130 L 170 130"
          stroke="#ff00ff" strokeWidth="3" fill="none"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
        
        {/* Account box */}
        <motion.rect
          x="170" y="100" width="80" height="60"
          fill="none" stroke="#ff00ff" strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        
        <motion.text
          x="210" y="135" textAnchor="middle"
          fill="#ff00ff" fontSize="10" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
          ACCOUNT
        </motion.text>
        
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#ff00ff" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ChainWriteEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Account box */}
        <rect x="100" y="100" width="100" height="80" fill="none" stroke="#00ffff" strokeWidth="2" />
        
        {/* Glow effect when writing */}
        <motion.rect
          x="100" y="100" width="100" height="80"
          fill="none" stroke="#00ffff" strokeWidth="4"
          opacity="0.5"
          initial={{ scale: 1 }}
          animate={{ scale: phase >= 1 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 1, repeat: phase >= 1 ? Infinity : 0, repeatType: "loop" }}
        />
        
        <motion.text
          x="150" y="125" textAnchor="middle"
          fill="#00ffff" fontSize="8" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ACCOUNT
        </motion.text>
        
        <motion.text
          x="150" y="145" textAnchor="middle"
          fill="#00ff00" fontSize="10" fontFamily="monospace"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          "Hello, World!"
        </motion.text>
        
        <motion.text
          x="150" y="165" textAnchor="middle"
          fill="#ffff00" fontSize="8" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
          PERSISTED ON CHAIN
        </motion.text>
      </svg>
    </div>
  );
}

function UpdateButtonEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Control panel */}
        <rect x="75" y="50" width="150" height="200" fill="none" stroke="#00ffff" strokeWidth="2" />
        <text x="150" y="75" textAnchor="middle" fill="#00ffff" fontSize="12" fontFamily="monospace">CONTROL PANEL</text>
        
        {/* Existing initialize button */}
        <rect x="100" y="100" width="100" height="25" fill="#00ffff" stroke="none" />
        <text x="150" y="117" textAnchor="middle" fill="#000000" fontSize="8" fontFamily="monospace">INITIALIZE</text>
        
        {/* New update button appearing */}
        <motion.rect
          x="100" y="140" width="100" height="25"
          fill="#ff00ff" stroke="none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        />
        
        <motion.text
          x="150" y="157" textAnchor="middle"
          fill="#000000" fontSize="8" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          UPDATE_MESSAGE
        </motion.text>
      </svg>
    </div>
  );
}

function AccessControlEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Update button with keyhole */}
        <rect x="100" y="140" width="100" height="25" fill="#ff00ff" stroke="none" />
        
        {/* Keyhole appearing */}
        <motion.circle
          cx="190" cy="152" r="8"
          fill="#000000" stroke="#ffff00" strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Key animating to unlock */}
        <motion.g
          initial={{ x: -50, y: 0 }}
          animate={{ x: phase >= 1 ? 0 : -50, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <rect x="160" y="148" width="25" height="8" fill="#ffff00" stroke="none" />
          <circle cx="155" cy="152" r="6" fill="none" stroke="#ffff00" strokeWidth="2" />
        </motion.g>
        
        <motion.text
          x="150" y="190" textAnchor="middle"
          fill="#00ff00" fontSize="10" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 1.5 }}
        >
          ACCESS GRANTED
        </motion.text>
      </svg>
    </div>
  );
}

function PDACreationEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Program with robotic arm */}
        <rect x="50" y="100" width="80" height="60" fill="none" stroke="#00ffff" strokeWidth="2" />
        <text x="90" y="135" textAnchor="middle" fill="#00ffff" fontSize="10" fontFamily="monospace">PROGRAM</text>
        
        {/* Robotic arm extending */}
        <motion.line
          x1="130" y1="130" x2="170" y2="130"
          stroke="#00ffff" strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
        
        {/* Arm joints */}
        <motion.circle
          cx="150" cy="130" r="4"
          fill="#00ffff"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        />
        
        {/* PDA account being created */}
        <motion.rect
          x="170" y="100" width="80" height="60"
          fill="none" stroke="#ff00ff" strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        
        <motion.text
          x="210" y="135" textAnchor="middle"
          fill="#ff00ff" fontSize="10" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 1.5 }}
        >
          PDA
        </motion.text>
      </svg>
    </div>
  );
}

function CPICallEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Your program */}
        <rect x="30" y="100" width="80" height="60" fill="none" stroke="#00ffff" strokeWidth="2" />
        <text x="70" y="135" textAnchor="middle" fill="#00ffff" fontSize="8" fontFamily="monospace">YOUR PROGRAM</text>
        
        {/* Data packet traveling */}
        <motion.circle
          cx="140" cy="130" r="8"
          fill="#ff00ff"
          initial={{ x: -30 }}
          animate={{ x: phase >= 1 ? 80 : -30 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Arrow */}
        <motion.path
          d="M 110 130 L 190 130"
          stroke="#ff00ff" strokeWidth="2" fill="none"
          markerEnd="url(#cpiArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
        
        {/* SPL Memo program */}
        <motion.rect
          x="190" y="100" width="80" height="60"
          fill="none" stroke="#ff00ff" strokeWidth="2"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: phase >= 1 ? 1 : 0.3 }}
          transition={{ delay: 1 }}
        />
        
        <motion.text
          x="230" y="135" textAnchor="middle"
          fill="#ff00ff" fontSize="8" fontFamily="monospace"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: phase >= 1 ? 1 : 0.3 }}
          transition={{ delay: 1 }}
        >
          SPL MEMO
        </motion.text>
        
        <defs>
          <marker id="cpiArrow" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#ff00ff" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function SOLTransferEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* User wallet */}
        <rect x="30" y="100" width="80" height="60" fill="none" stroke="#00ffff" strokeWidth="2" />
        <text x="70" y="125" textAnchor="middle" fill="#00ffff" fontSize="8" fontFamily="monospace">USER</text>
        <text x="70" y="140" textAnchor="middle" fill="#00ffff" fontSize="8" fontFamily="monospace">WALLET</text>
        
        {/* SOL coin traveling */}
        <motion.g
          initial={{ x: 0 }}
          animate={{ x: phase >= 1 ? 160 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <circle cx="70" cy="160" r="12" fill="#ffff00" stroke="#ff8800" strokeWidth="2" />
          <text x="70" y="167" textAnchor="middle" fill="#000000" fontSize="8" fontFamily="monospace" fontWeight="bold">◎</text>
        </motion.g>
        
        {/* Authority wallet */}
        <rect x="190" y="100" width="80" height="60" fill="none" stroke="#00ff00" strokeWidth="2" />
        <text x="230" y="125" textAnchor="middle" fill="#00ff00" fontSize="8" fontFamily="monospace">AUTHORITY</text>
        <text x="230" y="140" textAnchor="middle" fill="#00ff00" fontSize="8" fontFamily="monospace">WALLET</text>
        
        <motion.text
          x="150" y="200" textAnchor="middle"
          fill="#ffff00" fontSize="10" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
          0.001 SOL TRANSFERRED
        </motion.text>
      </svg>
    </div>
  );
}

function ErrorHandlingEffect({ phase }: { phase: number }) {
  return (
    <div className="relative w-80 h-80">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Program box */}
        <motion.rect
          x="100" y="100" width="100" height="80"
          fill="none" stroke="#00ffff" strokeWidth="2"
          animate={{ 
            stroke: phase >= 1 ? "#ff0000" : "#00ffff",
            strokeWidth: phase >= 1 ? 3 : 2
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Long text being rejected */}
        <motion.text
          x="150" y="125" textAnchor="middle"
          fill="#ff0000" fontSize="6" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? [0, 1, 0] : 0 }}
          transition={{ duration: 2, repeat: 2 }}
        >
          This message is way too long and will be rejected!
        </motion.text>
        
        {/* Error message */}
        <motion.rect
          x="75" y="200" width="150" height="40"
          fill="#ff0000" stroke="none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
          transition={{ delay: 1 }}
        />
        
        <motion.text
          x="150" y="215" textAnchor="middle"
          fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 1.2 }}
        >
          ERROR: MESSAGE TOO LONG
        </motion.text>
        
        <motion.text
          x="150" y="230" textAnchor="middle"
          fill="#ffffff" fontSize="6" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ delay: 1.5 }}
        >
          Custom Error Code: 6000
        </motion.text>
      </svg>
    </div>
  );
}

function DefaultEffect() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-cyan-400 text-2xl animate-pulse">
        ⚡ Success! ⚡
      </div>
    </div>
  );
}