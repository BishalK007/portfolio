import React from 'react';

interface ButtonProps {
  text: string;
  textColor: string;
  bgColor: string;
  height: number;
  width: number;
  cornerRadius: number[];
  tailwindClass: string;
  borderColor: string;
  borderWidth: number;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (ButtonProps) => {
  return (
    <button
      className={ButtonProps.tailwindClass}
      style={{
        color: ButtonProps.textColor,
        backgroundColor: ButtonProps.bgColor,
        height: ButtonProps.height,
        width: ButtonProps.width,
        borderRadius:
          ButtonProps.cornerRadius.length === 4
            ? `${ButtonProps.cornerRadius[0]}px ${ButtonProps.cornerRadius[1]}px ${ButtonProps.cornerRadius[2]}px ${ButtonProps.cornerRadius[3]}px`
            : undefined,
        border: `${ButtonProps.borderWidth}px solid ${ButtonProps.borderColor}`,
      }}
      onClick={ButtonProps.onClick}
    >
      {ButtonProps.text}
    </button>
  );
};

Button.defaultProps = {
  text: 'Click me!',
  textColor: 'black',
  bgColor: 'white',
  height: 40,
  width: 100,
  cornerRadius: [0, 0, 0, 0],
  tailwindClass: '',
  borderColor: 'black',
  borderWidth: 0,
  onClick: () => {},
};

export default Button;
