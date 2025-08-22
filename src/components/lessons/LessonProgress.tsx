interface LessonProgressProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export function LessonProgress({ currentStep, totalSteps, progress }: LessonProgressProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-mono text-gray-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-mono text-gray-400">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <div className="progress-trail h-3 rounded-full">
        <div 
          className="bg-gradient-to-r from-desert-500 to-sunset-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full border-2 ${
              step <= currentStep
                ? 'bg-desert-500 border-desert-500'
                : 'bg-transparent border-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
