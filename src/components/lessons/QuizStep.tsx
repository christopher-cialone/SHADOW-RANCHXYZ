import { useState, useEffect } from "react";
import { TechButton } from "@/components/ui/TechButton";
import { TechCard } from "@/components/ui/TechCard";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizStepProps {
  currentStepData: any;
  lessonId: number;
  currentStep: number;
  onStepComplete: () => void;
}

export function QuizStep({ 
  currentStepData, 
  lessonId, 
  currentStep, 
  onStepComplete 
}: QuizStepProps) {
  const [quizAnswer, setQuizAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [validationResults, setValidationResults] = useState<any>(null);
  const { toast } = useToast();

  // Reset state when step changes
  useEffect(() => {
    setQuizAnswer("");
    setSelectedOption("");
    setQuizSubmitted(false);
    setValidationResults(null);
  }, [currentStep]);

  const validateQuiz = (stepData: any) => {
    if (!stepData.quiz) return false;
    
    const { type, correctAnswer } = stepData.quiz;
    
    switch (type) {
      case 'text-input':
        return quizAnswer.toLowerCase().trim() === String(correctAnswer).toLowerCase().trim();
      case 'multiple-choice':
        return selectedOption === correctAnswer;
      case 'true-false':
        return selectedOption === String(correctAnswer);
      default:
        return false;
    }
  };

  const handleQuizValidate = () => {
    if (!currentStepData) return;
    
    const isCorrect = validateQuiz(currentStepData);
    
    if (isCorrect) {
      setValidationResults({
        success: true,
        message: currentStepData.successMessage
      });
      setQuizSubmitted(true);
      
      // Call the completion callback to update parent state
      onStepComplete();
      
      toast({
        title: "Knowledge Check Complete!",
        description: "Your understanding is growing stronger.",
      });
    } else {
      setValidationResults({
        success: false,
        message: currentStepData.failureMessage
      });
      
      toast({
        title: "Not Quite Right",
        description: "Take another moment to consider the answer.",
        variant: "destructive"
      });
    }
  };

  if (!currentStepData?.quiz) {
    return null;
  }

  const { quiz } = currentStepData;

  return (
    <TechCard className="p-6 space-y-4">
      <div className="space-y-4">
        {/* Quiz Content */}
        <div className="space-y-4">
          <h3 className="font-space-gothic text-lg text-cyan-400">
            {quiz.question}
          </h3>

          {/* Different quiz types */}
          {quiz.type === 'text-input' && (
            <div>
              <input
                type="text"
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-3 bg-black/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                disabled={quizSubmitted && validationResults?.success}
              />
            </div>
          )}

          {quiz.type === 'multiple-choice' && (
            <div className="space-y-2">
              {quiz.options.map((option: string, index: number) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name={`quiz-${currentStep}`}
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="text-cyan-400 bg-black/50 border-cyan-400/30 focus:ring-cyan-400"
                    disabled={quizSubmitted && validationResults?.success}
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}

          {quiz.type === 'true-false' && (
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`quiz-${currentStep}`}
                  value="true"
                  checked={selectedOption === 'true'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="text-cyan-400"
                  disabled={quizSubmitted && validationResults?.success}
                />
                <span className="text-gray-300">True</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`quiz-${currentStep}`}
                  value="false"
                  checked={selectedOption === 'false'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="text-cyan-400"
                  disabled={quizSubmitted && validationResults?.success}
                />
                <span className="text-gray-300">False</span>
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        {!quizSubmitted || !validationResults?.success ? (
          <TechButton
            onClick={handleQuizValidate}
            disabled={
              (quiz.type === 'text-input' && !quizAnswer.trim()) ||
              ((quiz.type === 'multiple-choice' || quiz.type === 'true-false') && !selectedOption)
            }
            className="w-full"
          >
            Submit Answer
          </TechButton>
        ) : null}

        {/* Validation Results */}
        {validationResults && (
          <div className={`p-4 rounded-lg border-2 ${
            validationResults.success 
              ? 'bg-green-900/20 border-green-400/30' 
              : 'bg-red-900/20 border-red-400/30'
          }`}>
            <div className="flex items-center space-x-2">
              {validationResults.success ? (
                <CheckCircle size={20} className="text-green-400" />
              ) : (
                <XCircle size={20} className="text-red-400" />
              )}
              <span className={`font-medium ${
                validationResults.success ? 'text-green-400' : 'text-red-400'
              }`}>
                {validationResults.success ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            {validationResults.message && (
              <p className="mt-2 text-gray-300 text-sm">
                {validationResults.message}
              </p>
            )}
          </div>
        )}
      </div>
    </TechCard>
  );
}