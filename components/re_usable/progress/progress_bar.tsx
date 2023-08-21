'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface ProgressBarProps {
  height?: number | string,
  width?: number | string,
  cornerRadius?: number,
  borderWidth?: number,
  borderColor?: string,
  bgColor?: string,
  progressColor?: string,
  progressValue?: number,
  showAnimation?:boolean,
  animationDuration?:number,
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  height = '100%',
  width = '100%',
  cornerRadius = 0,
  borderWidth = 0,
  bgColor = 'black',
  progressColor = 'white',
  borderColor = progressColor,
  progressValue = 0.5,
  showAnimation=true,
  animationDuration=400,
}) => {
  const [progress, setProgress] = useState('0%')
  if (typeof height == 'number') {
    height = `${height}px`
  }
  if (typeof width == 'number') {
    width = `${width}px`
  }
  const [ref, inView] = useInView()
  const progressRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    setProgress(`calc(${width} * ${progressValue})`)
    if (showAnimation && inView && progressRef.current) {
      progressRef.current.style.width = `calc(${width} * ${progressValue})`
      // console.log('hi')
    } else if (showAnimation &&  progressRef.current) {
      progressRef.current.style.width = `0%`
      // console.log('bye')
    }

  }, [inView])



  return (
    <div
    ref={ref}
      style={{
        height: height,
        width: width,
        backgroundColor: bgColor,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: `${cornerRadius}px`,
        overflow: 'hidden',
      }}
      >
      <div
        ref={progressRef}
        style={{
          height: '100%',
          width: `${progress}`,
          background: progressColor,
          borderRadius: `${cornerRadius}px`,
          transition: `all ${animationDuration}ms`,
        }}
      ></div>
    </div>
  )
}

export default ProgressBar
