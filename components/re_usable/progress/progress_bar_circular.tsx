import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CircularProgressProps {
    size?: number ;
    borderWidth?: number;
    borderColor?: string;
    bgColor?: string;
    progressColor?: string;
    progressValue?: number;
    showAnimation?: boolean;
    animationDuration?: number;
    insideText?: string | null;
    insideTextColor?: string;
    
    
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    size = 100,
    borderWidth = 2,
    bgColor = 'black',
    progressColor = 'white',
    borderColor = progressColor,
    progressValue = 0.5,
    showAnimation = true,
    animationDuration = 400,
    insideText= null,
    insideTextColor= progressColor
}) => {
    borderWidth /= 2

    const [ref, inView] = useInView();
    const circumference = Math.PI * (size as number);
    const offset = circumference * (1 - progressValue);

    // Calculate the center of the circle
    const centerX = size / 2;
    const centerY = size / 2;

    // Calculate the position for the insideTextelement
    const textX = centerX;
    const textY = centerY;

    return (
        <div
            ref={ref}
            style={{
                width: size,
                height: size,
                backgroundColor: bgColor,
                borderRadius: '50%',
                overflow: 'hidden',
            }}
        >
            <svg width={size} height={size}>
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={((size as number) - borderWidth * 4) / 2}
                    fill="var(--bg-color)"
                />
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={((size as number) - borderWidth * 2) / 2}
                    fill="transparent"
                    stroke={progressColor}
                    strokeWidth={borderWidth * 2}
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    strokeDashoffset={showAnimation && inView ? offset : circumference}
                    style={{
                        transition: showAnimation
                            ? `stroke-dashoffset ${animationDuration}ms`
                            : 'none',
                    }}
                />
                {insideText&& (
                    <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        fill={insideTextColor}
                        fontSize={18}
                    >
                        {insideText}
                    </text>
                )}
            </svg>
        </div>
    );
};

export default CircularProgress;
