import { Zap, Info } from "lucide-react";

export function PerformanceNotice() {
  return (
    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-cyan-400/20 rounded-lg flex items-center justify-center">
          <Zap size={16} className="text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-cyan-400 mb-1">Firebase Connectivity Restored</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Profile system now uses optimized Firebase configuration with long-polling for reliable connectivity. 
            All data persists to <strong className="text-cyan-400">Firebase Cloud</strong> and syncs across devices.
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <Info size={12} />
            <span>Cross-device sync enabled - your progress follows you everywhere</span>
          </div>
        </div>
      </div>
    </div>
  );
}