'use client'
import Image from 'next/image';
import React, { useState } from 'react'
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
}

interface ProjectCardProps {
    data: ProjectData[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    data,
}) => {
    // const dummyArray = Array.from({ length: data.length }, (_, i) => i + 1);

    const evenIndexedArray = data.filter((_, i) => i % 2 === 0);
    const oddIndexedArray = data.filter((_, i) => i % 2 !== 0);

    return (
        <div>
            <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
                {evenIndexedArray.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            width: '500px',
                            marginRight: '10px',
                            // backgroundColor: 'lightgrey',
                            display: 'inline-block',

                        }}
                    >
                        <div className='py-[10px]'>
                            <CardItem
                                height={
                                    300
                                }
                                projectName={evenIndexedArray[index].projectName}
                                aboutProject={evenIndexedArray[index].aboutProject}
                                imgSrc={evenIndexedArray[index].imgSrc}
                                techStack={evenIndexedArray[index].tech}
                                url={evenIndexedArray[index].url}
                            />
                        </div>
                        {oddIndexedArray[index] && <CardItem
                            height={
                                300
                            }
                            projectName={oddIndexedArray[index].projectName}
                            aboutProject={oddIndexedArray[index].aboutProject}
                            imgSrc={oddIndexedArray[index].imgSrc}
                            techStack={oddIndexedArray[index].tech}
                            url={oddIndexedArray[index].url}
                        />}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ProjectCard;




interface cardItemProps {
    height?: number,
    projectName: string,
    aboutProject: string,
    imgSrc: string,
    url: string,
    techStack: string[],

}
export const CardItem: React.FC<cardItemProps> = ({
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
    // console.log('abt' + aboutProject)
    return (
        <div className="border-2" >
            <div className=" "

                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                <div className=' bg-orange-500 overflow-hidden' style={{
                    height: height,
                }}>
                    <div className="relative h-full w-full">
                        {/* */
                     /*__________________________ Foreground div  ______________________ */
                     /* */}
                        <div className="absolute z-30 h-fit w-full bg-gradient-to-b from-transparent to-black bottom-0">
                            <div className="text-white flex flex-col  h-full justify-end pb-5 px-5">
                                <div className='text-2xl font-bold '>
                                    {projectName}
                                </div>
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
