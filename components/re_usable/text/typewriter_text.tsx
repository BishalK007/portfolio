import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text1: string;
  text2: string;
  color1: string;
  color2: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text1,
  text2,
  color1,
  color2,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentText = currentTextIndex === 0 ? text1 : text2;
      let newDisplayedText = isDeleting
        ? currentText.substring(0, displayedText.length - 1)
        : currentText.substring(0, displayedText.length + 1);
      setDisplayedText(newDisplayedText);

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % 2);
      }

      setTypingSpeed(isDeleting ? 30 : 150);
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex, text1, text2, typingSpeed]);

  return (
    <span
      style={{
        WebkitTextFillColor: currentTextIndex === 0 ? color1 : color2,
      }}
    >
      {displayedText}
    </span>
  );
};

export default Typewriter;
