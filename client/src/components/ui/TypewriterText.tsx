import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function TypewriterText({ text, speed = 50, delay = 0, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isTyping]);

  return (
    <span className="text-[#34dce9]">
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}