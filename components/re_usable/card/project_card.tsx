'use client'
import { isNumber } from '@node_modules/tailwind-merge/dist/lib/validators';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { CSSProperties } from 'react';
import IconLocal from '../icons/default_icon';
import Link from 'next/link';
import ExpandingText from '../text/expanding_text';
interface ProjectData {
    projectName: string;
    aboutProject: string;
    imgSrc: string;
    url: string;
    tech: string[];
    // workDone: string[];
}

interface ProjectCardProps {
    cols?: number,
    gap?: number,
    largeHeight?: number,
    smallHeight?: number,
    data: ProjectData[],
}
const ProjectCard: React.FC<ProjectCardProps> = ({
    cols = 3,
    data,
    gap = 2,
    largeHeight = 300,
    smallHeight = 150,
}) => {

    // console.log(typeof data)
    const noOfElements = data.length;
    const rows = Math.ceil(noOfElements / cols);
    // console.log(rows)

    const isCardLarge = (row: number, col: number, noOfRows: number, noOfCols: number) => {
        var flag;
        if (row % 2 == 0)
            (noOfRows % 2 == 1 && row == noOfRows)
                ? flag = true
                : (col % 2 == 0) ? flag = true : flag = false;
        else
            (noOfRows % 2 == 1 && row == noOfRows)
                ? flag = true
                : (col % 2 == 0) ? flag = false : flag = true;


        return flag;
    }

    const gridIndex = (rowIndex: number, colIndex: number, colNum: number) => {
        // console.log((rowIndex) * (colNum) + (colIndex + 1))
        return ((rowIndex) * (colNum) + (colIndex + 1) - 1)
    }
    return (
        <div className="pt-20">
            <div className="flex flex-row ">
                {[...Array.from(Array(cols))].map((_, colIndex) => (
                    <div key={colIndex} className="px-2 w-full ">
                        <div className="h-fit w-full  " style={{
                            // width: "100%"
                        }}>
                            <div className="flex flex-col ">
                                {[...Array.from(Array(rows))].map((_, rowIndex) => (
                                    <div className="py-2" key={rowIndex}>
                                        <CardItem
                                             // Add a unique key for each CardItem
                                            rowIndex={rowIndex}
                                            colIndex={colIndex}
                                            colNum={cols}
                                            rowNum={rows}
                                            height={
                                                (isCardLarge(rowIndex + 1, colIndex + 1, rows, cols) ? largeHeight : smallHeight)
                                            }
                                            projectName={data[gridIndex(rowIndex, colIndex, cols)] == undefined ? "" : data[gridIndex(rowIndex, colIndex, cols)].projectName}
                                            aboutProject={data[gridIndex(rowIndex, colIndex, cols)] == undefined ? "" : data[gridIndex(rowIndex, colIndex, cols)].aboutProject}
                                            imgSrc={data[gridIndex(rowIndex, colIndex, cols)] == undefined ? "" : data[gridIndex(rowIndex, colIndex, cols)].imgSrc}
                                            techStack={data[gridIndex(rowIndex, colIndex, cols)] == undefined ? [""] : data[gridIndex(rowIndex, colIndex, cols)].tech}
                                            url={data[gridIndex(rowIndex, colIndex, cols)] == undefined ? "" : data[gridIndex(rowIndex, colIndex, cols)].url}
                                        />
                                    </div>
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
    colNum: number,
    rowNum: number,
    height?: number,
    projectName: string,
    aboutProject: string,
    imgSrc: string,
    url: string,
    techStack: string[],

}
export const CardItem: React.FC<cardItemProps> = ({
    rowIndex,
    colIndex,
    colNum,
    rowNum,
    height = 200,
    projectName,
    aboutProject,
    imgSrc,
    techStack,
    url,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const imageStyle: CSSProperties = {
        position: 'absolute',
        transition: 'transform 0.3s', // Add a smooth transition for better user experience
        transform: isHovered ? 'scale(1.5)' : 'scale(1)',
    };

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
    };
    if (projectName == "") {
        return <></>
    }
    return (
        <div className="border-2" >
            <div className=" "

                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                <div className=' bg-orange-500 overflow-hidden' style={{
                    height: height
                }}>
                    {/* {(rowIndex) * (colNum) + (colIndex + 1)} */}
                    {/* {"r=" + rowIndex}
                {"rNo=" + rowNum} */}
                    {/* {colIndex} */}
                    <div className="relative h-full w-full">
                        {/* */
                     /*__________________________ Foreground div  ______________________ */
                     /* */}
                        <div className="absolute z-30 h-fit w-full bg-gradient-to-b from-transparent to-black bottom-0">
                            <div className="text-white flex flex-col  h-full justify-end pb-5 px-5">
                                <div className='text-2xl font-bold '>
                                    {projectName}
                                </div>
                                {/* <div className='flex flex-row text-xl'>
                                    BishalK007 / Rhythm
                                    <IconLocal
                                        iconSrc='in_new_tab'
                                        bgColor='transparent'
                                        size={22}
                                        classTW='ml-2'
                                    />
                                </div> */}
                                <ExpandingText
                                    expandedHeight={160}
                                    text={aboutProject}
                                />
                                <div className="flex flex-wrap ">
                                    {[...techStack].map((_, techStackIndex) => (
                                        <div
                                            key={techStackIndex}
                                            className='px-1'
                                            >
                                            <IconLocal
                                                iconSrc={techStack[techStackIndex]}
                                                showIconText={true}
                                                classTW='mt-2'
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* */
                     /*__________________________ Middle div  ______________________ */
                     /* */}
                        <Link className="bg-black w-full h-full absolute z-20 opacity-40"
                            target="_blank"
                            href={url} />

                        {/* */
                     /*__________________________ Background Image  ______________________ */
                     /* */}
                        <div className='h-full w-full ' style={{ position: 'absolute' }}>
                            <Image
                                alt='alt'
                                src={imgSrc}
                                style={{
                                    ...imageStyle,
                                    objectFit: "cover"
                                }}
                                fill={true}

                            ></Image>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
