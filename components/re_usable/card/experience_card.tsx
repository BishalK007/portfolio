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
    width?: string;
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
    const hiddenRef = useRef<HTMLDivElement | null>(null);
    const frontRef = useRef<HTMLDivElement | null>(null);
    const [cardHeight, setcardHeight] = useState(height)
    const [cardWidth, setCardWidth] = useState(0)

    useEffect(() => {
        if (showAnimation && inview && backDropRef.current) {
            console.log('heloo')
            backDropRef.current.style.transform = `translate(${backdropTranslate[0]}px, ${backdropTranslate[1]}px)`;
        }
        if (showAnimation && !inview && backDropRef.current) {
            backDropRef.current.style.transform = `translate(0,0)`;
        }
        if (frontRef.current) {
            setcardHeight(frontRef.current.offsetHeight);
            setCardWidth(frontRef.current.offsetWidth)
            console.log('Height:', frontRef.current.offsetHeight);
        }
    }, [inview, backdropTranslate]);

    return (
        // dummy
        <div className=' bg-orange-700 relative'
            ref={cardRef}
            style={{
                height: cardHeight,
                width: `calc(${width} - ${backdropTranslate[0]}px)`
                // width: width
            }}>
            {isBackDropVisible && (
                <div
                    ref={backDropRef}
                    style={{
                        top: 0,
                        left: 0,
                        height: cardHeight,
                        width: cardWidth,
                        backgroundColor: dropColor,
                        transform: `translate(${backdropTranslate[0]}px, ${backdropTranslate[1]}px)`,
                        transition: `transform ${animationDuration}ms`,
                    }}
                    className="absolute "
                ></div>
            )}
            <div
                ref={frontRef}
                className="absolute w-full  items-center justify-center px-[5vw] py-6"
                style={{
                    backgroundColor: bgColor,
                }}>
                <div className="flex flex-col  space-y-4 w-full h-fit items-start justify-center ">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-col space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{data.companyName}</h2>
                            <p className="text-gray-600 text-xl sm:text-2xl">{data.designation}</p>
                            <p className="text-gray-600 text-lg sm:text-xl">{data.timeFrame}</p>
                        </div>
                        <div className="relative h-20 w-20">
                            <Image
                                src={data.companyLogoUrl}
                                alt={data.companyName}
                                fill={true}
                                style={{ objectFit: "cover" }}
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


