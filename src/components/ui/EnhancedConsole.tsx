import { TechCard } from "./TechCard";

interface EnhancedConsoleProps {
  output: string[];
  title?: string;
  height?: string;
  isLive?: boolean;
}

export function EnhancedConsole({ 
  output, 
  title = "SYSTEM OUTPUT", 
  height = "h-72",
  isLive = true 
}: EnhancedConsoleProps) {
  return (
    <TechCard variant="neutral" className="h-fit">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-space-gothic text-sm text-gray-300 uppercase tracking-wider">{title}</h3>
          {isLive && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-tech-cyan-400 animate-pulse"></div>
              <span className="font-code text-xs text-gray-500">LIVE</span>
            </div>
          )}
        </div>
        <div className={`bg-black/60 rounded-lg p-4 font-code text-sm ${height} overflow-y-auto border border-tech-cyan-600/50 backdrop-blur-sm`}>
          <div className="mb-2 text-tech-cyan-400 text-xs opacity-75">
            === BLOCKCHAIN DEVELOPMENT CONSOLE ===
          </div>
          {output.map((line, index) => (
            <div 
              key={index} 
              className={`mb-1 leading-relaxed ${
                line.startsWith('$') || line.startsWith('>')
                  ? 'text-tech-cyan-400 font-semibold' 
                  : line.includes('Error') || line.includes('error') || line.includes('ERROR')
                  ? 'text-red-400 bg-red-400/10 px-2 py-1 rounded border-l-2 border-red-400' 
                  : line.includes('Success') || line.includes('✓') || line.includes('OK')
                  ? 'text-green-400 bg-green-400/10 px-2 py-1 rounded border-l-2 border-green-400'
                  : line.includes('Warning') || line.includes('⚠') || line.includes('WARN')
                  ? 'text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded border-l-2 border-yellow-400'
                  : line.includes('Info') || line.includes('INFO')
                  ? 'text-blue-400 bg-blue-400/10 px-2 py-1 rounded border-l-2 border-blue-400'
                  : 'text-gray-300'
              }`}
            >
              <span className="text-gray-500 text-xs mr-2 select-none">{String(index + 1).padStart(3, '0')}</span>
              {line}
            </div>
          ))}
          {output.length === 0 && (
            <div className="text-gray-500 italic text-center py-8">
              <div className="text-tech-cyan-400/50 mb-2">⚡</div>
              Console ready for output...
            </div>
          )}
        </div>
      </div>
    </TechCard>
  );
}