'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface WorkData {
    companyName: string;
    designation: string;
    timeFrame: string;
    companyLogoUrl: string;
    workDone: string[];
}

interface ExperienceCardProps {
    data: WorkData;
    cols?: number;
    width?: number | string;
    height?: number | string;
    gap?: number;
    isBackDropVisible?: boolean;
    bgColor?: string;
    dropColor?: string;
    backdropTranslate?: number[];
    showAnimation?: boolean;
    animationDuration?: number;
    classTW?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    data,
    cols = 1,
    width = '100%',
    height = 300,
    gap = 16,
    isBackDropVisible = true,
    bgColor = 'white',
    dropColor = 'gray',
    backdropTranslate = [5, 5],
    showAnimation = true,
    animationDuration = 200,
    classTW = '',
}) => {
    const gridWidth = 100 / cols;
    const [cardRef, inview] = useInView();
    const backDropRef = useRef<HTMLDivElement | null>(null);
    const frontRef = useRef<HTMLDivElement | null>(null);
    const [cardHeight, setcardHeight] = useState(height)

    useEffect(() => {
        if (showAnimation && inview && backDropRef.current) {
            backDropRef.current.style.transform = `translate(${backdropTranslate[0]}px, ${backdropTranslate[1]}px)`;
        }
        if (showAnimation && !inview && backDropRef.current) {
            backDropRef.current.style.transform = `translate(0,0)`;
        }
        if (frontRef.current && backDropRef.current) {
            setcardHeight(frontRef.current.offsetHeight);
            // console.log('Height:', frontRef.current.offsetHeight);
          }
    }, [inview, backdropTranslate]);

    return (
        <div
            ref={cardRef}
            className={`relative flex justify-center items-center text-black ${classTW}`}
            style={{
                height: cardHeight,
                width: width,
            }}
        >
            {isBackDropVisible && (
                <div
                    ref={backDropRef}
                    style={{
                        backgroundColor: dropColor,
                        transform: `translate(${backdropTranslate[0]}px, ${backdropTranslate[1]}px)`,
                        transition: `transform ${animationDuration}ms`,
                    }}
                    className="h-full w-full absolute"
                ></div>
            )}
            <div
                ref={frontRef}
                className="absolute w-full h-fill flex items-center justify-center px-[10vw] py-6"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                <div className="flex flex-col  space-y-4 w-full h-fit items-start justify-center">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-col space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-semibold">{data.companyName}</h2>
                            <p className="text-gray-600 text-xl sm:text-2xl">{data.designation}</p>
                            <p className="text-gray-600 text-lg sm:text-xl">{data.timeFrame}</p>
                        </div>
                        <div className="relative h-20 w-20">
                            <Image
                                src={data.companyLogoUrl}
                                alt={data.companyName}
                                fill={true}
                                style={{objectFit: "cover"}}
                            />
                        </div>
                    </div>
                    
                    <ul className="list-disc pl-6 space-y-1 text-lg">
                        {data.workDone.map((work, index) => (
                            <li key={index} className="text-gray-700">
                                {work}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ExperienceCard;


