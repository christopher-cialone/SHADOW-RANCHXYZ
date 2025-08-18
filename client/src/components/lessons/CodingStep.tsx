import { useState, useEffect } from "react";
import { MonacoEditor } from "@/components/editor/MonacoEditor";
import { TechCard } from "@/components/ui/TechCard";
import { CheckCircle, XCircle } from "lucide-react";
import { codeTemplates } from "@/data/code-templates";

interface CodingStepProps {
  currentStepData: any;
  lessonId: number;
  currentStep: number;
  language: string;
  onStepComplete: () => void;
  onCodeRun: (data: any) => void;
}

export function CodingStep({ 
  currentStepData, 
  lessonId, 
  currentStep, 
  language,
  onStepComplete,
  onCodeRun
}: CodingStepProps) {
  const [code, setCode] = useState("");
  const [validationResults, setValidationResults] = useState<any>(null);

  // Initialize code when step changes
  useEffect(() => {
    if (currentStepData?.initialCodeTemplateKey) {
      const template = codeTemplates[currentStepData.initialCodeTemplateKey];
      if (template) {
        setCode(template[language as keyof typeof template] || '');
      }
    } else {
      setCode("");
    }
    setValidationResults(null);
  }, [currentStep, currentStepData, language]);

  const handleCodeValidate = (data: any) => {
    setValidationResults(data);
    if (data.success) {
      // Call the completion callback to update parent state
      onStepComplete();
    }
    // Also call the parent's onCodeRun for any additional effects
    onCodeRun(data);
  };

  if (!currentStepData?.isCodingChallenge) {
    return null;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Code Editor */}
      <div className="flex-1">
        <MonacoEditor
          value={code}
          onChange={setCode}
          language={language}
          lessonId={lessonId}
          stepId={currentStep}
          onValidate={handleCodeValidate}
          validationRules={currentStepData.validationRules}
        />
      </div>

      {/* Validation Results */}
      {validationResults && (
        <TechCard className="p-4">
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
                {validationResults.success ? 'Success!' : 'Try Again'}
              </span>
            </div>
            {validationResults.message && (
              <p className="mt-2 text-gray-300 text-sm">
                {validationResults.message}
              </p>
            )}
            {validationResults.errors && validationResults.errors.length > 0 && (
              <div className="mt-2">
                <p className="text-red-400 text-sm font-medium">Issues found:</p>
                <ul className="text-red-300 text-sm mt-1 space-y-1">
                  {validationResults.errors.map((error: string, index: number) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            {validationResults.hints && validationResults.hints.length > 0 && (
              <div className="mt-2">
                <p className="text-cyan-400 text-sm font-medium">Hints:</p>
                <ul className="text-cyan-300 text-sm mt-1 space-y-1">
                  {validationResults.hints.map((hint: string, index: number) => (
                    <li key={index}>• {hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TechCard>
      )}
    </div>
  );
}