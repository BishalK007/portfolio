'use client'
import { useEffect, useState } from "react";
import NextImage from 'next/image'

interface AutoHeightImageProps {
    src: string;
    width: number;
    altTxt:string
    [key: string]: any;
    tailwindClasses:string
  }
  
  const AutoHeightImage: React.FC<AutoHeightImageProps> = ({ src, width, altTxt, tailwindClasses, ...props}) => {
    const [height, setHeight] = useState<number>(0);
  
    useEffect(() => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setHeight((img.naturalHeight / img.naturalWidth) * width);
      };
    }, [src, width]);
  
    return <NextImage className={tailwindClasses} src={src} width={width} height={height} {...props} alt={altTxt}/>;
  };

  export default AutoHeightImage