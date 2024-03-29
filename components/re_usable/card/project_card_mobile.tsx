'use client'
import { isNumber } from '@node_modules/tailwind-merge/dist/lib/validators';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { CSSProperties } from 'react';
import IconLocal from '../icons/default_icon';
import Link from 'next/link';
import ExpandingText from '../text/expanding_text';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

// import required modules
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';



interface ProjectData {
    projectName: string;
    aboutProject: string;
    imgSrc: string;
    url: string;
    tech: string[];
}

interface ProjectCardMobileProps {
    data: ProjectData[];
}

const ProjectCardMobile: React.FC<ProjectCardMobileProps> = ({
    data,
}) => {
    return (
        <div className='w-full relative h-[560px] '>
            {/* ~ */}
            <div className=' w-[calc(100%+5rem)] translate-x-[-2.5rem] absolute text-white h-[550px]'>
                <Swiper
                    effect={'coverflow'}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    spaceBetween={5}
                    loop={true}
                    navigation={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                      }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                      }}
                    modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                    className="mySwiper"
                >
                    {data.map((_, index) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                width: 'calc(100% - 5rem + 4px)',
                                marginRight: '10px',
                                // backgroundColor: 'lightgrey',
                                display: 'inline-block',


                            }}
                            // className='w-[calc(100%-5rem)] translate-x-[2.5rem]'
                        >
                            <div className=''>
                                <CardItem
                                    height={
                                        550
                                    }
                                    projectName={data[index].projectName}
                                    aboutProject={data[index].aboutProject}
                                    imgSrc={data[index].imgSrc}
                                    techStack={data[index].tech}
                                    url={data[index].url}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>

    );
};

export default ProjectCardMobile;




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
