'use client'
import { useEffect, useState } from "react";
import NextImage from 'next/image'

interface AutoWidthImageProps {
    src: string;
    height: number;
    altTxt:string
    [key: string]: any;
    tailwindClasses:string
  }
  
  const AutoWidthImage: React.FC<AutoWidthImageProps> = ({ src, height, altTxt, tailwindClasses, ...props}) => {
    const [width, setWidth] = useState<number>(0);
  
    useEffect(() => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setWidth((img.naturalWidth / img.naturalHeight) * height);
      };
    }, [src, height]);
  
    return <NextImage className={tailwindClasses} src={src} width={width} height={height} {...props} alt={altTxt}/>;
  };

  export default AutoWidthImage