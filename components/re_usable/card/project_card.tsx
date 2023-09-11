'use client'
import React, { useEffect, useState } from 'react'
interface ProjectCardProps {
    cols?: number,
    gap?: number,
}
const ProjectCard: React.FC<ProjectCardProps> = ({
    cols = 3,
    gap = 2,
}) => {
    const dummyArray = Array.from({ length: 10 }, (_, index) => index + 1);

    return (
        <div className="pt-20">
            {/* <div className='bg-gray-400 w-[100%] h-fit ' style={{
            display: 'grid',
            // gridTemplateColumns: `repeat(${cols}, calc(${100/cols}% - ${gap * (cols - 1) / cols}px))`,
            gridTemplateColumns: `${Array(cols).fill('1fr').join(' ')}`,
            gap: `${gap}px`
        }}>
            {[...Array.from(dummyArray)].map((_, index) => (
                <div className="h-96 w-full bg-red-500"
                style={{
                    // height: (index % 2 == 0) ? 100 : 80
                }}></div>
            ))} */}
            {/* </div> */}
            <div className="flex flex-row bg-green-300">
                {[...Array.from(Array(cols))].map((_, colIndex) => (
                    <div className="p-5 w-full bg-purple-400">
                        <div className="h-fit w-full bg-red-500 " style={{
                            // width: "100%"
                        }}>
                            <div className="flex flex-col bg-gray-700">
                                {[...Array.from(Array(3))].map((_, rowIndex) => (
                                    <CardItem 
                                        rowIndex={rowIndex}
                                        colIndex={colIndex}
                                        height={(((rowIndex + 1) * (colIndex + 1)) % 2 == 0) ? 200 : 180}
                                    />
                                ))}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectCard

interface cardItemProps {
    rowIndex: number,
    colIndex: number,
    height?: number,
}
export const CardItem:React.FC<cardItemProps> = ({
    rowIndex,
    colIndex,
    height=200,
}) => {
    return (
        <div className="p-2">
            <div className=' bg-orange-500'style={{
            height:height
        }}>
            {(rowIndex + 1) * (colIndex + 1)}
        </div>
        </div>
    )
}
