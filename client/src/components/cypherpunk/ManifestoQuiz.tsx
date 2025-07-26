import { useState } from "react";
import { TechCard } from "@/components/ui/TechCard";
import { TechButton } from "@/components/ui/TechButton";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "According to the Cypherpunk Manifesto, what is the key difference between privacy and secrecy?",
    options: [
      "Privacy is about hiding illegal activities, secrecy is about protecting personal information",
      "Privacy is selective revelation to the world, secrecy is hiding from everyone",
      "Privacy is for individuals, secrecy is for governments",
      "There is no difference between privacy and secrecy"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What did cypherpunks believe was the primary tool for defending digital freedom?",
    options: [
      "Government legislation and regulation",
      "Corporate privacy policies",
      "Writing code and creating cryptographic tools",
      "Peaceful protests and demonstrations"
    ],
    correctAnswer: 2
  }
];

interface ManifestoQuizProps {
  onComplete: () => void;
}

export function ManifestoQuiz({ onComplete }: ManifestoQuizProps) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (!submitted) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
      }));
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setSubmitted(true);
      setShowResults(true);
      
      // Check if all answers are correct
      const allCorrect = questions.every(q => answers[q.id] === q.correctAnswer);
      
      if (allCorrect) {
        setTimeout(() => onComplete(), 2000);
      }
    }
  };

  const isAnswerCorrect = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    return question && answers[questionId] === question.correctAnswer;
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const allCorrect = submitted && questions.every(q => isAnswerCorrect(q.id));

  return (
    <div className="space-y-8">
      {questions.map((question) => (
        <TechCard key={question.id} variant="purple" className="relative">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <h3 className="font-tech text-lg text-white pr-4">{question.question}</h3>
              {submitted && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isAnswerCorrect(question.id) ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  <span className="text-white font-bold">
                    {isAnswerCorrect(question.id) ? '✓' : '✗'}
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = answers[question.id] === index;
                const isCorrect = index === question.correctAnswer;
                
                let buttonClass = "w-full text-left p-4 rounded border transition-all duration-200 ";
                
                if (submitted) {
                  if (isCorrect) {
                    buttonClass += "bg-green-900/50 border-green-400 text-green-300";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "bg-red-900/50 border-red-400 text-red-300";
                  } else {
                    buttonClass += "bg-gray-800 border-gray-600 text-gray-400";
                  }
                } else {
                  if (isSelected) {
                    buttonClass += "bg-tech-purple-900/50 border-tech-purple-400 text-tech-purple-300";
                  } else {
                    buttonClass += "bg-gray-800 border-gray-600 text-gray-300 hover:border-tech-purple-400 hover:bg-tech-purple-900/30";
                  }
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(question.id, index)}
                    className={buttonClass}
                    disabled={submitted}
                  >
                    <span className="font-code text-sm">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </TechCard>
      ))}
      
      <div className="text-center">
        {!submitted ? (
          <TechButton
            variant="accent"
            size="lg"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="min-w-48"
          >
            <span className="mr-2">📝</span>
            SUBMIT ANSWERS
          </TechButton>
        ) : allCorrect ? (
          <div className="space-y-4">
            <TechButton variant="accent" size="lg" className="min-w-48" disabled>
              <span className="mr-2">✓</span>
              PERFECT SCORE!
            </TechButton>
            <p className="text-green-400 font-code text-sm">
              Advancing to completion screen...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <TechButton variant="secondary" size="lg" className="min-w-48" disabled>
              <span className="mr-2">⚠️</span>
              REVIEW ANSWERS
            </TechButton>
            <p className="text-red-400 font-code text-sm">
              Study the manifesto again and retake the quiz
            </p>
          </div>
        )}
      </div>
      
      {showResults && (
        <div className="text-center mt-8">
          <TechCard variant="cyan" className="inline-block">
            <div className="p-4">
              <p className="font-code text-tech-cyan-400 text-sm">
                QUIZ RESULTS: {questions.filter(q => isAnswerCorrect(q.id)).length} / {questions.length} CORRECT
              </p>
            </div>
          </TechCard>
        </div>
      )}
    </div>
  );
}