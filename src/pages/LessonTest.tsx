import { useState, useEffect } from 'react';
import { TechCard } from '@/components/ui/TechCard';
import { TechButton } from '@/components/ui/TechButton';
import { LessonLayout } from '@/components/lessons/LessonLayout';

// Simplified Quiz Component for Testing
interface SimpleQuizProps {
  onStepComplete: () => void;
  currentStep: number;
}

function SimpleQuiz({ onStepComplete, currentStep }: SimpleQuizProps) {
  console.log('🔍 SimpleQuiz rendered - currentStep:', currentStep);
  
  return (
    <TechCard variant="cyan" className="p-6">
      <h3 className="text-xl font-bold text-cyan-300 mb-4">
        Test Quiz - Step {currentStep}
      </h3>
      <p className="text-gray-300 mb-6">
        This is a simplified quiz component for testing step progression.
      </p>
      
      <TechButton 
        onClick={() => {
          console.log('🎯 Quiz Complete Button Clicked - calling onStepComplete');
          onStepComplete();
        }}
        variant="primary"
        className="w-full"
      >
        Complete This Step
      </TechButton>
    </TechCard>
  );
}

export default function LessonTest() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Log state changes on every render
  useEffect(() => {
    console.log('📊 LessonTest State Update:', {
      currentStep,
      isCompleted,
      timestamp: new Date().toISOString()
    });
  }, [currentStep, isCompleted]);

  // Step completion handler
  const handleStepComplete = () => {
    console.log('🚀 handleStepComplete called - setting isCompleted to true');
    setIsCompleted(true);
  };

  // Next step handler
  const handleNext = () => {
    console.log('➡️ handleNext called - moving to next step');
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setIsCompleted(false); // Reset completion for new step
    console.log('📈 Moved to step:', nextStep);
  };

  // Previous step handler  
  const handlePrevious = () => {
    console.log('⬅️ handlePrevious called');
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setIsCompleted(false); // Reset completion for previous step
      console.log('📉 Moved to step:', prevStep);
    }
  };

  // Hardcoded lesson data for testing
  const testLesson = {
    title: "Test Lesson - Solana Progression Debug",
    content: {
      steps: [
        { id: 1, title: "Step 1 - Quiz Test" },
        { id: 2, title: "Step 2 - Second Quiz" },
        { id: 3, title: "Step 3 - Final Step" }
      ]
    }
  };

  const totalSteps = testLesson.content.steps.length;
  const progressPercentage = (currentStep / totalSteps) * 100;
  const canGoNext = isCompleted;
  const hasPrevious = currentStep > 1;
  const hasNext = currentStep < totalSteps;

  console.log('🎮 Render State:', {
    currentStep,
    isCompleted,
    canGoNext,
    hasNext,
    hasPrevious
  });

  return (
    <div className="min-h-screen bg-black">
      <LessonLayout
        title={testLesson.title}
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progressPercentage}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onComplete={() => console.log('🏁 Lesson completed!')}
        canGoNext={canGoNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        nextButtonText={hasNext ? "Next Step" : "Complete Lesson"}
        isCompleted={currentStep === totalSteps && isCompleted}
      >
        <div className="max-w-4xl mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quiz Component */}
            <div>
              <SimpleQuiz 
                onStepComplete={handleStepComplete}
                currentStep={currentStep}
              />
            </div>

            {/* Debug Info Panel */}
            <div>
              <TechCard variant="purple" className="p-6">
                <h3 className="text-xl font-bold text-purple-300 mb-4">
                  Debug Information
                </h3>
                <div className="space-y-3 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Step:</span>
                    <span className="text-cyan-300">{currentStep}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Is Completed:</span>
                    <span className={isCompleted ? 'text-green-300' : 'text-red-300'}>
                      {isCompleted ? 'true' : 'false'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Can Go Next:</span>
                    <span className={canGoNext ? 'text-green-300' : 'text-red-300'}>
                      {canGoNext ? 'true' : 'false'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Has Next:</span>
                    <span className={hasNext ? 'text-green-300' : 'text-red-300'}>
                      {hasNext ? 'true' : 'false'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-cyan-300">{progressPercentage.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Manual Test Buttons */}
                <div className="mt-6 space-y-2">
                  <TechButton 
                    onClick={() => setIsCompleted(!isCompleted)}
                    variant="secondary"
                    className="w-full text-xs"
                  >
                    Toggle Completion: {isCompleted ? 'Complete' : 'Incomplete'}
                  </TechButton>
                  
                  <TechButton 
                    onClick={() => {
                      console.log('🔄 Reset Test - Going back to step 1');
                      setCurrentStep(1);
                      setIsCompleted(false);
                    }}
                    variant="secondary" 
                    className="w-full text-xs"
                  >
                    Reset to Step 1
                  </TechButton>
                </div>
              </TechCard>
            </div>
          </div>

          {/* Console Log Display */}
          <div className="mt-8">
            <TechCard variant="neutral" className="p-4">
              <h4 className="text-lg font-bold text-gray-300 mb-2">
                Console Monitoring
              </h4>
              <p className="text-sm text-gray-400">
                Open browser console (F12) to see detailed logging of state changes and interactions.
                All debug info is being logged with timestamps.
              </p>
            </TechCard>
          </div>
        </div>
      </LessonLayout>
    </div>
  );
}