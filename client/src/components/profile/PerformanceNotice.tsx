import { Zap, Info } from "lucide-react";

export function PerformanceNotice() {
  return (
    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-cyan-400/20 rounded-lg flex items-center justify-center">
          <Zap size={16} className="text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-cyan-400 mb-1">Lightning Fast Performance</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Profile system now uses instant local storage for maximum speed. 
            All operations (profile editing, image uploads, badge unlocks) happen in <strong className="text-cyan-400">milliseconds</strong> instead of seconds.
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <Info size={12} />
            <span>Data persists locally - connect wallet to sync across devices</span>
          </div>
        </div>
      </div>
    </div>
  );
}