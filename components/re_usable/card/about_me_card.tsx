import React, { useEffect } from 'react';

interface AboutMeCardProps {
    dataMap: Map<string, string>;
    cols?: number;
    width?: number | string;
    height?: number | string;
    isBackDropVisible?: boolean
    bgColor?: string
    dropColor?: string,
    classTW?: string,
}

const AboutMeCard: React.FC<AboutMeCardProps> = ({
    dataMap,
    cols = 1,
    width = 300,
    height = 500,
    isBackDropVisible = true,
    bgColor = 'black',
    dropColor = 'gray',
    classTW = '',
}) => {
    const gridWidth = 100 / cols
    useEffect(() => {
        // console.log(maxHeights)
    }, [])

    return (
        <div className={"relative flex justify-center items-center text-lg " + classTW}
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
                    style={{
                        backgroundColor: dropColor,
                        
                    }}
                    className=' translate-x-5 translate-y-5 h-full w-full absolute'
                ></div>}
            {/* */
             /*__________________________ Fromt  ______________________ */
             /* */}
            <div className='absolute w-full h-full flex items-center justify-center p-0' style={{
                backgroundColor: bgColor,
            }}>
                <div
                    className='flex-wrap'
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${cols}, calc(${gridWidth}% - 0.5rem))`, // Adjusted here
                        gap: '1rem',
                    }}>
                    {[...Array.from(dataMap)].map(([key, value]) => (
                        <div
                            key={key}
                            className=' w-full'
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
