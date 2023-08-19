import React from 'react';

interface ButtonProps {
  text?: string;
  textColor?: string;
  hoverTextColor?: string;
  bgColor?: string;
  hoverColor?: string;
  height?: number;
  width?: number;
  cornerRadius?: number[];
  tailwindClass?: string;
  borderColor?: string;
  borderWidth?: number;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text = 'Click me!',
  textColor = 'black',
  hoverTextColor = 'black',
  bgColor = 'white',
  hoverColor = bgColor,
  height = 40,
  width = 100,
  cornerRadius = [0, 0, 0, 0],
  borderColor = 'black',
  borderWidth = 0,
  tailwindClass,
  onClick = () => { },

}) => {
  return (
    <button
      className={tailwindClass}
      onClick={onClick}
      style={{
        color: textColor,
        backgroundColor: bgColor,
        height: height,
        width: width,
        borderRadius: cornerRadius
          ? cornerRadius.map((value) => `${value}px`).join(" ")
          : "0",
        borderWidth: borderWidth,
        borderColor: borderColor,
        transition: "background-color 0.3s, color 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.style.backgroundColor = hoverColor;
        target.style.color = hoverTextColor;
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.style.backgroundColor = bgColor;
        target.style.color = textColor;
      }}
    >
      {text}
    </button>

  );
};

export default Button;
