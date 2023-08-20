import { fstat } from 'fs';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
  showBackDrop?: boolean;
  backDropTranslate?: number[]
  backDropColor?: string
  hoverAnimation?: 'scale105' | 'backdrop-animation'
  animationDuration?: number;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text = 'Click me!',
  textColor = 'black',
  hoverTextColor = textColor,
  bgColor = 'white',
  hoverColor = bgColor,
  height = 40,
  width = 100,
  cornerRadius = [0, 0, 0, 0],
  borderColor = 'black',
  borderWidth = 0,
  showBackDrop = false,
  backDropTranslate = [10, 10],
  backDropColor = 'black',
  hoverAnimation = '',
  animationDuration = 200,
  tailwindClass,
  onClick = () => { },

}) => {
  const backDropRef = useRef<HTMLDivElement | null>(null)
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && backDropRef.current) {
      backDropRef.current.style.transform = `translate(${backDropTranslate[0]}px, ${backDropTranslate[1]}px)`
    } else if(backDropRef.current) {
      backDropRef.current.style.transform = `translate(0,0)`
      // setBackDropTranslateCSS(`translate(0,0)`);
    }
  }, [inView]);

  return (
    <div className={tailwindClass + " relative"}
      ref={ref}
      style={{
        height: height,
        width: width,
        scale: 1,
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        if (hoverAnimation == 'scale105') {
          target.style.scale = '1.05';
        }
        if (hoverAnimation == 'backdrop-animation' && backDropRef.current) {
          backDropRef.current.style.transform = `translate(0,0)`
        }
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        if (hoverAnimation == 'scale105') {
          target.style.scale = '1.00';
        }
        if (hoverAnimation == 'backdrop-animation' && backDropRef.current) {
          backDropRef.current.style.transform = `translate(${backDropTranslate[0]}px, ${backDropTranslate[1]}px)`
        }
      }}
    >
      {/* */
       /*__________________________ BackDrop  ______________________ */
       /* */}
      {showBackDrop &&
        <div
          ref={backDropRef}
          className={"absolute h-full w-full  "}
          style={{
            transform: `translate(${backDropTranslate[0]}px, ${backDropTranslate[1]}px)`,
            backgroundColor: `${backDropColor}`,
            transition: `transform ${animationDuration}ms`
          }}
        />}
      {/* */
       /*__________________________ Button  ______________________ */
       /* */}
      <button
        className={' absolute'}
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
    </div>


  );
};

export default Button;
