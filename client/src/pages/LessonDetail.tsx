import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";
import { NarrativeBox } from "@/components/lessons/NarrativeBox";
import { LessonLayout } from "@/components/lessons/LessonLayout";
import { MonacoEditor } from "@/components/editor/MonacoEditor";
import { HintCharacter, type HintCharacterRef } from "@/components/lessons/HintCharacter";
import { ChallengeReward } from "@/components/game/ChallengeReward";
import { GameCanvas } from "@/components/game/GameCanvas";
import { useLessonStore } from "@/hooks/use-lesson-store";
import { useGameStore } from "@/hooks/use-enhanced-game-store";
import { useToast } from "@/hooks/use-toast";
import { formatRanchCoin } from "@/lib/utils";
import { lessons, type LessonData } from "@/data/lessons";
import { codeTemplates } from "@/data/code-templates";
import nftRobotUrl from "@assets/brb-nft-ai-robot.png";

export default function LessonDetail() {
  const [, params] = useRoute("/lessons/:id");
  const lessonId = parseInt(params?.id || "0");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState("rust");
  const [code, setCode] = useState("");
  const [hintVisible, setHintVisible] = useState(false);
  const [validationResults, setValidationResults] = useState<any>(null);
  
  const hintCharacterRef = useRef<HintCharacterRef>(null);

  // Get lesson from client-side data
  const lesson = lessons.find(l => l.id === lessonId);

  const { getLessonProgress, updateLessonAttempt, completeLesson, completeStep, isStepCompleted, setCurrentLesson } = useLessonStore();
  const { 
    triggerSparkleAnimation, 
    triggerCoinFall, 
    triggerDataStreamAnimation,
    triggerChallengeReward,
    showChallengeReward,
    currentRewardNftUrl,
    dataStreamActive,
    earnRanchCoin,
    addExperience,
    ranchData,
    buildings,
    characters
  } = useGameStore();
  const { toast } = useToast();

  const progress = getLessonProgress(lessonId);
  const currentStepData = lesson?.steps.find((step: any) => step.id === currentStep);

  useEffect(() => {
    if (lesson) {
      setCurrentLesson(lessonId);
      const savedProgress = getLessonProgress(lessonId);
      if (savedProgress && savedProgress.currentStep > 0) {
        setCurrentStep(savedProgress.currentStep);
      }
      
      // Set starter code from templates if available
      const step = lesson.steps.find((s: any) => s.id === currentStep);
      if (step?.initialCodeTemplateKey) {
        const template = codeTemplates[step.initialCodeTemplateKey];
        if (template) {
          setCode(template[language as keyof typeof template] || template.rust);
        }
      }
    }
  }, [lesson, lessonId, currentStep, language]);

  // Preload the NFT reward image for instant display
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/images/brb-nft-ai-robot.png';
  }, []);

  const progressPercentage = lesson ? (currentStep / lesson.steps.length) * 100 : 0;
  const currentStepCompleted = isStepCompleted(lessonId, currentStep);
  
  // Calculate navigation logic
  const totalStepsInCurrentLesson = lesson?.steps.length || 0;
  const isLastStepOfCurrentLesson = currentStep === totalStepsInCurrentLesson;
  const canGoToNextStep = currentStep < totalStepsInCurrentLesson && currentStepCompleted;
  const canGoToNextLesson = isLastStepOfCurrentLesson && currentStepCompleted;
  
  const hasPrevious = currentStep > 1;
  const hasNext = canGoToNextStep || canGoToNextLesson;
  const nextButtonText = canGoToNextStep ? "Next Step" : (canGoToNextLesson ? "Next Lesson" : "Next");
  const canGoNext = currentStepCompleted || validationResults?.success || false;
  const isCompleted = isLastStepOfCurrentLesson && currentStepCompleted;

  const handleCodeRun = (data: any) => {
    if (data.success) {
      triggerSparkleAnimation();
      triggerCoinFall();
    }
    setValidationResults(data);
  };

  const handleCodeValidate = (data: any) => {
    setValidationResults(data);
    if (data.success) {
      updateLessonAttempt(lessonId, currentStep);
      completeStep(lessonId, currentStep); // Mark this step as completed
      
      // Trigger challenge reward animation for successful completion
      const rewardNftUrl = lessonId === 2 && currentStep === 3 
        ? "/assets/images/purple-box-nft.png" 
        : nftRobotUrl;
      
      // Trigger special data stream animation for PDA lesson
      if (lessonId === 2 && currentStep === 3) {
        triggerDataStreamAnimation();
      }
      
      triggerChallengeReward(
        rewardNftUrl,
        lessonId,
        `${lesson?.title} - Step ${currentStep} Completion Badge`
      );
      
      // Enhanced success feedback with hint character
      hintCharacterRef.current?.showHint(
        `Excellent work! You've completed ${lesson?.title} - Step ${currentStep}. Moving to the next challenge!`
      );
      
      toast({
        title: "Challenge Completed!",
        description: "Step validated successfully. NFT reward unlocked!",
      });
    } else {
      // Progressive hint system for failed attempts
      const attemptCount = (progress?.attempts || 0) + 1;
      if (attemptCount >= 2) {
        hintCharacterRef.current?.showProgressiveHint(attemptCount);
      }
    }
  };

  const handleNext = () => {
    if (canGoToNextStep) {
      // Move to next step within current lesson
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setValidationResults(null);
      setHintVisible(false);
      
      // Load starter code for next step
      const stepData = lesson?.steps.find((s: any) => s.id === nextStep);
      if (stepData?.initialCodeTemplateKey) {
        const template = codeTemplates[stepData.initialCodeTemplateKey];
        if (template) {
          setCode(template[language as keyof typeof template] || template.rust);
        }
      } else {
        setCode("");
      }
    } else if (canGoToNextLesson) {
      // Navigate to next lesson
      window.location.href = `/lessons/${lessonId + 1}`;
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setValidationResults(null);
      setHintVisible(false);
      
      // Load starter code for previous step
      const stepData = lesson?.steps.find(s => s.id === prevStep);
      if (stepData?.starterCode) {
        setCode(stepData.starterCode);
      }
    }
  };

  const handleComplete = () => {
    completeLesson(lessonId);
    earnRanchCoin(lesson?.reward || 100);
    addExperience(50);
    triggerCoinFall();
    
    toast({
      title: "Lesson Completed!",
      description: `You earned ${formatRanchCoin(lesson?.reward || 100)} Ranch Coins and 50 XP!`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-desert-400 mb-4" />
          <p className="font-deputy text-xl text-gray-300">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <TechCard className="p-8 text-center">
          <span className="text-4xl mb-4 block">⚠️</span>
          <h2 className="font-tech text-2xl text-gray-300 mb-4">LESSON NOT FOUND</h2>
          <p className="font-code text-gray-400">The requested lesson could not be found.</p>
        </TechCard>
      </div>
    );
  }

  return (
    <LessonLayout
      title={lesson.title}
      currentStep={currentStep}
      totalSteps={lesson.steps.length}
      progress={progressPercentage}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onComplete={handleComplete}
      canGoNext={canGoNext}
      hasPrevious={hasPrevious}
      hasNext={hasNext}
      nextButtonText={nextButtonText}
      isCompleted={isCompleted}
    >
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 h-[calc(100vh-300px)]">
        {/* Primary Content: Code Editor */}
        <div className="xl:col-span-3 space-y-8">
          <TechCard variant="cyan" className="h-full">
            <div className="p-6 h-full">
              <MonacoEditor
                value={code}
                onChange={setCode}
                language={language}
                onLanguageChange={setLanguage}
                height="700px"
                onRun={handleCodeRun}
                onValidate={handleCodeValidate}
                lessonId={lessonId}
                currentStep={currentStep}
              />
            </div>
          </TechCard>

          {/* Validation Results */}
          {validationResults && (
            <TechCard variant={validationResults.success ? "neutral" : "pink"} className="p-4">
              <div className={`text-sm font-code ${
                validationResults.success 
                  ? 'text-green-300'
                  : 'text-red-300'
              }`}>
                <div className="flex items-center mb-2">
                  <span className="mr-2">{validationResults.success ? '✅' : '❌'}</span>
                  {validationResults.message}
                </div>
                {validationResults.errors && validationResults.errors.length > 0 && (
                  <ul className="text-xs space-y-1 ml-6">
                    {validationResults.errors.map((error: string, index: number) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                )}
              </div>
            </TechCard>
          )}
        </div>

        {/* Side Panel: Instructions & Status */}
        <div className="xl:col-span-2 space-y-6">
          <TechCard variant="purple" className="overflow-hidden">
            <div className="p-6 overflow-y-auto max-h-96">
              {currentStepData && (
                <>
                  <NarrativeBox variant="story" icon="📋" title="Mission Brief">
                    {currentStepData.narrative}
                  </NarrativeBox>

                  <NarrativeBox variant="challenge" icon="🎯" title="System Requirements">
                    <ul className="space-y-2">
                      {currentStepData.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`mr-2 mt-1 ${
                            validationResults?.results?.[index]?.passed ? 'text-tech-cyan-400' : 'text-gray-500'
                          }`}>
                            {validationResults?.results?.[index]?.passed ? '✓' : '○'}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </NarrativeBox>

                  {currentStepData.hints.length > 0 && (
                    <div className="bg-gradient-to-r from-tech-pink-800/30 to-tech-pink-700/30 border border-tech-pink-600 p-4 rounded-lg">
                      <TechButton 
                        variant="accent"
                        className="w-full"
                        onClick={() => {
                          hintCharacterRef.current?.showContextualHint(currentStep);
                        }}
                      >
                        <span className="mr-2">🤖</span>
                        REQUEST AI ASSISTANCE
                      </TechButton>
                    </div>
                  )}
                </>
              )}
            </div>
          </TechCard>

          {/* Lab Status */}
          <TechCard variant="cyan" className="p-6">
            <h3 className="font-tech text-xl text-tech-cyan-400 mb-4 flex items-center uppercase tracking-wider">
              <span className="mr-2">🔬</span>
              SOLANA LAB
            </h3>
            
            {/* Mock lab scene */}
            <div className="bg-gradient-to-b from-tech-purple-800 to-tech-purple-900 rounded-lg h-64 relative overflow-hidden border-2 border-tech-cyan-600 mb-6">
              <div className="absolute inset-0 bg-gradient-to-b from-tech-cyan-400/20 to-transparent" />
              
              {/* Lab equipment */}
              <div className="absolute bottom-4 left-4 w-16 h-12 bg-tech-purple-700 rounded border border-tech-purple-600">
                <div className="w-full h-3 bg-tech-cyan-600 rounded-t" />
              </div>
              <div className="absolute bottom-4 right-4 w-20 h-16 bg-tech-cyan-700 rounded border border-tech-cyan-600">
                <div className="w-full h-4 bg-tech-cyan-500 rounded-t" />
              </div>
              
              {/* Character */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-tech-purple-600 rounded-full">
                <div className="w-4 h-4 bg-tech-cyan-600 rounded-full mx-auto mt-1" />
              </div>
              
              {/* Status overlay */}
              <div className="absolute top-4 left-4 bg-black/70 rounded px-2 py-1">
                <div className="text-xs text-tech-cyan-400 font-code">SOL Tokens: {formatRanchCoin(ranchData.coins)}</div>
                <div className="text-xs text-tech-purple-400 font-code">XP: {ranchData.experience}</div>
              </div>
              
              {/* Success animation area */}
              {validationResults?.success && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-green-500/90 text-white px-4 py-2 rounded-lg font-tech animate-bounce">
                    <span className="mr-2">✅</span>
                    CODE VALIDATED SUCCESSFULLY!
                  </div>
                </div>
              )}
            </div>

            {/* Lab Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-tech-purple-800/50 to-tech-purple-700/50 p-3 rounded border border-tech-purple-600">
                <div className="text-xs text-tech-purple-400 font-code mb-1">MODULES</div>
                <div className="text-lg font-tech text-white">{buildings.length}</div>
              </div>
              <div className="bg-gradient-to-r from-tech-cyan-800/50 to-tech-cyan-700/50 p-3 rounded border border-tech-cyan-600">
                <div className="text-xs text-tech-cyan-400 font-code mb-1">AGENTS</div>
                <div className="text-lg font-tech text-white">{characters.length}</div>
              </div>
            </div>
          </TechCard>
        </div>
      </div>

      {/* Hint Character */}
      <HintCharacter 
        ref={hintCharacterRef} 
        stepHints={currentStepData?.hints || []}
        currentStep={currentStep}
      />
      
      {/* Challenge Reward Overlay */}
      <ChallengeReward
        isVisible={showChallengeReward}
        nftImageUrl={currentRewardNftUrl}
      />

      {/* Game Canvas for Visual Effects */}
      <GameCanvas
        dataStreamActive={dataStreamActive}
      />
    </LessonLayout>
  );
}
