import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  className?: string;
  placeholder?: string;
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = "rust", 
  className,
  placeholder = "Enter your code here..." 
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full h-full min-h-[400px] p-4",
          "bg-gray-900 text-gray-100 border border-gray-700",
          "font-mono text-sm leading-relaxed",
          "resize-none outline-none",
          "focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500",
          "scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600",
          "placeholder-gray-500"
        )}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        style={{ 
          tabSize: 2,
          fontFamily: 'JetBrains Mono, Consolas, "Liberation Mono", Menlo, Courier, monospace'
        }}
      />
      
      {/* Language indicator */}
      <div className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded border border-gray-600">
        {language.toUpperCase()}
      </div>
    </div>
  );
}