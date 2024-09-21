import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface AboutMeCardProps {
    dataMap: Map<string, string>;
    cols?: number;
    width?: number | string;
    height?: number | string;
    gap?: number,
    isBackDropVisible?: boolean
    bgColor?: string
    dropColor?: string,
    backdropTranslate?: number[],
    showAnimation?: boolean
    animationDuration?: number,
    classTW?: string,
}

const AboutMeCard: React.FC<AboutMeCardProps> = ({
    dataMap,
    cols = 1,
    width = 300,
    height = 500,
    gap = 16,
    isBackDropVisible = true,
    bgColor = 'white',
    dropColor = 'gray',
    backdropTranslate = [5,5],
    showAnimation = true,
    animationDuration = 200,
    classTW = '',
}) => {
    const gridWidth = 100 / cols
    const [cardRef, inview] = useInView()
    const backDropRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(showAnimation && inview && backDropRef.current){
            backDropRef.current.style.transform = `translate(${backdropTranslate[0]}px, ${backdropTranslate[1]}px)`
        }
        if(showAnimation && !inview && backDropRef.current ){
            backDropRef.current.style.transform = `translate(0,0)`     
        }
    }, [inview, backdropTranslate, showAnimation])

    return (
        <div
            ref={cardRef}
            className={"relative flex justify-center items-center text-black " + classTW}
            style={{
                height: height,
                width: width,
                // backgroundColor: 'blue',
            }}>
            {/* */
             /*__________________________ Back  ______________________ */
             /* */}
            {isBackDropVisible &&
                <div
                    ref={backDropRef}
                    style={{
                        backgroundColor: dropColor,
                        transform: `translate(${backdropTranslate[0]}px, ${backdropTranslate[1]}px)`,
                        transition: `transform ${animationDuration}ms`
                    }}
                    className=' h-full w-full absolute'
                ></div>}
            {/* */
             /*__________________________ Fromt  ______________________ */
             /* */}
            <div className='absolute w-full h-full flex items-center justify-center p-0' style={{
                backgroundColor: bgColor,
            }}>
                <div
                    className='w-full px-[10%]'
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${cols}, calc(${gridWidth}% - ${gap / 2}px))`, // Adjusted here
                        gap: `${gap}px`,
                    }}>
                    {[...Array.from(dataMap)].map(([key, value]) => (
                        <div
                            key={key}
                            className=' w-full '
                            style={{
                                overflowWrap: 'break-word'
                            }}>
                            <div className="flex flex-col">
                                <strong>{key}:</strong>
                                {value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AboutMeCard;
