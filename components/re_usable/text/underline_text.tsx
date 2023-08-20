import React from 'react';

interface UnderlineTextProps {
  underLineHeight: number;
  spacing: number;
  children: React.ReactNode;
  color: string;
  classTW: string
}

const UnderlineText: React.FC<UnderlineTextProps> = ({ underLineHeight, spacing, color, classTW, children }) => {
  return (
    <div
      className={' w-fit '+ classTW }
      style={{
        borderBottom: `${underLineHeight}px solid ${color}`,
        margin: `0 ${spacing}px`, // Add spacing on the left and right sides
      }}
    >
      {children}
    </div>
  );
};

export default UnderlineText;
