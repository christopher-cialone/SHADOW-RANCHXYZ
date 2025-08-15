import { useState, useEffect } from "react";
import { WesternButton } from "@/components/ui/WesternButton";
import { LanguageSelector } from "./LanguageSelector";
import { useToast } from "@/hooks/use-toast";
import { useGameStore } from "@/hooks/use-game-store";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  height?: string;
  onRun?: (data: any) => void;
  onValidate?: (data: any) => void;
  lessonId?: number;
  currentStep?: number;
}

export function MonacoEditor({
  value,
  onChange,
  language,
  onLanguageChange,
  height = "400px",
  onRun,
  onValidate,
  lessonId,
  currentStep
}: MonacoEditorProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [output, setOutput] = useState<string[]>([
    "$ cargo run",
    "Compiling lesson v0.1.0",
    "Ready for your code..."
  ]);
  const { toast } = useToast();
  const gameStore = useGameStore();

  const handleRun = async () => {
    if (!lessonId || !currentStep) {
      toast({
        title: "Error",
        description: "Missing lesson information",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    gameStore.triggerNetworkPing();
    
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: value,
          language,
          lessonId,
          currentStep
        })
      });

      const data = await response.json();
      
      // Update console output
      const newOutput = [
        "$ cargo run",
        "Compiling lesson v0.1.0",
        ...(data.success 
          ? [
              "   Finished dev [unoptimized + debuginfo] target(s) in 0.50s",
              `Running \`target/debug/lesson\``,
              data.output
            ]
          : [
              "error: compilation failed",
              data.output
            ]
        )
      ];
      setOutput(newOutput);

      if (data.success) {
        gameStore.triggerSparkleAnimation();
        gameStore.earnRanchCoin(data.coins || 10);
        gameStore.addExperience(data.experience || 25);
        toast({
          title: "Code Executed Successfully!",
          description: `+${data.experience || 25} XP, +${data.coins || 10} Ranch Coins`,
        });
      } else {
        toast({
          title: "Code Failed",
          description: data.message,
          variant: "destructive"
        });
      }

      if (onRun) {
        onRun(data);
      }
    } catch (error) {
      const errorOutput = [
        "$ cargo run",
        "error: failed to compile",
        "Connection error - please try again"
      ];
      setOutput(errorOutput);
      
      toast({
        title: "Execution Failed",
        description: "Failed to execute code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleValidate = async () => {
    if (!lessonId || !currentStep) return;

    setIsValidating(true);
    gameStore.triggerNetworkPing();
    
    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: value,
          lessonId,
          currentStep
        })
      });

      const data = await response.json();
      
      if (data.success) {
        gameStore.triggerTransactionAnimation();
        toast({
          title: "Validation Passed!",
          description: "All requirements met. Ready for next step!",
        });
      } else {
        toast({
          title: "Validation Failed",
          description: data.errors?.join(", ") || "Some requirements not met",
          variant: "destructive"
        });
      }

      if (onValidate) {
        onValidate(data);
      }
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Failed to validate code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-space-gothic text-xl text-sunset-400">Code Editor</h3>
        <div className="flex items-center space-x-3">
          <LanguageSelector 
            value={language} 
            onChange={onLanguageChange} 
          />
          <WesternButton
            variant="secondary"
            size="sm"
            onClick={handleValidate}
            disabled={isValidating}
          >
            {isValidating ? (
              <>
                <i className="fas fa-spinner fa-spin mr-1" />
                Validating...
              </>
            ) : (
              <>
                <i className="fas fa-check-double mr-1" />
                Validate
              </>
            )}
          </WesternButton>
          <WesternButton
            variant="primary"
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <i className="fas fa-spinner fa-spin mr-1" />
                Running...
              </>
            ) : (
              <>
                <i className="fas fa-play mr-1" />
                Run
              </>
            )}
          </WesternButton>
        </div>
      </div>

      {/* Mock Monaco Editor */}
      <div className="flex-1 code-editor rounded-lg overflow-hidden" style={{ height }}>
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-600 flex items-center justify-between">
          <span className="text-sm text-gray-400 font-mono">
            {language === 'rust' ? 'main.rs' : 'main.py'}
          </span>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>
        <textarea 
          className="w-full h-full bg-gray-900 text-gray-300 p-4 font-mono text-sm resize-none border-none outline-none"
          placeholder={language === 'rust' ? '// Start coding here...' : '# Start coding here...'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ minHeight: 'calc(100% - 48px)' }}
        />
      </div>

      {/* Console Output */}
      <div className="mt-4 bg-gray-900 border border-gray-700 rounded-lg">
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <span className="text-sm text-gray-400 font-mono">Console Output</span>
        </div>
        <div className="p-4 font-mono text-sm min-h-20 max-h-32 overflow-y-auto">
          {output.map((line, index) => (
            <div 
              key={index} 
              className={
                line.startsWith('$') ? 'text-green-400' :
                line.includes('Compiling') || line.includes('Finished') || line.includes('Running') ? 'text-gray-400' :
                line.includes('error') ? 'text-red-400' :
                line.includes('Ready') ? 'text-blue-400' :
                'text-white'
              }
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
