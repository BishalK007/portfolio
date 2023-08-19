import React from 'react';
import styled from 'styled-components';

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

const StyledButton = styled.button<ButtonProps>
  `
  color: ${(props: ButtonProps) => props.textColor};
  background-color: ${(props: ButtonProps) => props.bgColor};
  height: ${(props: ButtonProps) => props.height}px;
  width: ${(props: ButtonProps) => props.width}px;
  border-radius: ${(props: ButtonProps) =>
    props.cornerRadius?.length === 4
      ? `${props.cornerRadius[0]}px ${props.cornerRadius[1]}px ${props.cornerRadius[2]}px ${props.cornerRadius[3]}px`
      : undefined};
  border: ${(props: ButtonProps) => `${props.borderWidth}px solid ${props.borderColor}`};
  
  &:hover { 
    background-color: ${(props: ButtonProps) => props.hoverColor};
    color: ${(props: ButtonProps) => props.hoverTextColor};
  }
`;

const Button: React.FC<ButtonProps> = (ButtonProps) => {
  return (
    <StyledButton
      className={ButtonProps.tailwindClass}
      onClick={ButtonProps.onClick}
      {...ButtonProps}
    >
      {ButtonProps.text}
    </StyledButton>
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
  onClick: () => { },
};

export default Button;
