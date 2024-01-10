'use client'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { CSSProperties } from 'react';
import IconLocal from '../icons/default_icon';
import Link from 'next/link';
import ExpandingText from '../text/expanding_text';

// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/thumbs';
import 'swiper/css/grid';
import 'swiper/css/free-mode';

// import required modules
import {
    Autoplay,
    Pagination,
    Navigation,
    EffectCoverflow,
    Thumbs,
    FreeMode,
    Grid,
    Keyboard,
    Mousewheel,
} from 'swiper/modules';
import { cn } from '@lib/utils';

// import SwiperClass from "swiper/types/swiper-class";

interface ProjectData {
    projectName: string;
    aboutProject: string;
    imgSrc: string;
    url: string;
    tech: string[];
}

interface ProjectCardProps {
    data: ProjectData[];
    gallerySlideWidth?: string,
    isViewGrid: boolean,
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    data,
    isViewGrid,
    gallerySlideWidth = '100%',
}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
    const gridRows = data.length / 4;

    const evenIndexedArray = data.filter((_, i) => i % 2 === 0);
    const oddIndexedArray = data.filter((_, i) => i % 2 !== 0);

    const [swiperIndex, setswiperIndex] = useState(0);
    const heightRef = useRef<HTMLDivElement>(null);
    const [divHeight, setDivHeight] = useState(0)

    useEffect(() => {
        if (heightRef.current)
            setDivHeight(heightRef.current.clientHeight);
    }, []);

    return (
        <div className='w-full'>
            {/* */
             /*__________________________ Grid View  ______________________ */
             /* */}

            {isViewGrid && <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
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
                                redirectOnClick={true}
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
                            redirectOnClick={true}
                        />}
                    </div>
                ))}
            </div>}
            {/* */
             /*__________________________ Gallery View  ______________________ */
             /* */}
            {!isViewGrid && <div
                className=' relative w-[calc(100%+2.5rem)] md:w-[calc(100%+5rem)] translate-x-[-1.25rem] md:translate-x-[-2.5rem]'
                style={{
                    height: divHeight
                }}>
                {/* ~ */}
                <div className=' w-[calc(100%+2.5rem)] md:w-[calc(100%+5rem)] translate-x-[-1.25rem] md:translate-x-[-2.5rem] absolute text-white' ref={heightRef}>
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
                            pauseOnMouseEnter: true,
                        }}
                        onSlideChange={(swiper: SwiperClass) => {
                            setswiperIndex(swiper.realIndex)
                            // console.log(swiper.realIndex + "real")
                        }}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        keyboard={{
                            enabled: true,
                            onlyInViewport: true,
                        }}
                        mousewheel={{
                            forceToAxis: true,
                        }}
                        // thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                        thumbs={{
                            swiper: thumbsSwiper && 
                                    !thumbsSwiper.destroyed ? thumbsSwiper : null
                        }}
                        modules={[Autoplay, Pagination, Navigation, EffectCoverflow, Thumbs, FreeMode, Keyboard, Mousewheel]}

                        className="mySwiper2"
                    >
                        {data.map((_, index) => (

                            <SwiperSlide
                                key={index}
                                style={{
                                    // width: 'calc(100% - 15rem + 4px)',
                                    width: gallerySlideWidth,
                                    marginRight: '10px',
                                    // backgroundColor: 'lightgrey',
                                    display: 'inline-block',

                                }}
                            >
                                <div className=''>
                                    <CardItem
                                        height={
                                            600
                                        }
                                        projectName={data[index].projectName}
                                        aboutProject={data[index].aboutProject}
                                        imgSrc={data[index].imgSrc}
                                        techStack={data[index].tech}
                                        url={data[index].url}
                                        redirectOnClick={true}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper

                        onSwiper={(swiper: SwiperClass) => {
                            setThumbsSwiper(swiper);
                        }}

                        grid={{
                            rows: gridRows,
                            fill: "row"
                        }}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        // freeMode={true}
                        watchSlidesProgress={true}
                        modules={[Grid, FreeMode, Navigation, Thumbs]}
                        className="mySwiper translate-y-10 w-[calc(100%-5rem)]"
                    // aria-colcount={}
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
                                <div className=''
                                    onClick={()=>{
                                        if(thumbsSwiper)
                                            thumbsSwiper.slideNext();
                                    }}
                                >
                                    <CardItem
                                        height={
                                            80
                                        }
                                        projectName={data[index].projectName}
                                        aboutProject={data[index].aboutProject}
                                        showAboutProject={false}
                                        imgSrc={data[index].imgSrc}
                                        techStack={data[index].tech}
                                        showTechStack={false}
                                        url={data[index].url}
                                        redirectOnClick={false}
                                        inactiveCard={swiperIndex == index ? false : true}

                                    // inactiveCard={true}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>}
        </div>

    );
};

export default ProjectCard;




interface cardItemProps {
    height?: number,
    projectName: string,
    showProjectName?: boolean,
    aboutProject: string,
    showAboutProject?: boolean,
    imgSrc: string,
    url: string,
    techStack: string[],
    showTechStack?: boolean,
    redirectOnClick: boolean,
    inactiveCard?: boolean,

}
export const CardItem: React.FC<cardItemProps> = ({
    height = 200,
    projectName,
    showProjectName = true,
    aboutProject,
    showAboutProject = true,
    imgSrc,
    techStack,
    showTechStack = true,
    url,
    redirectOnClick,
    inactiveCard = false,
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
                        <div className="absolute z-40 h-fit w-full bg-gradient-to-b from-transparent to-black bottom-0">
                            <div className="text-white flex flex-col  h-full justify-end pb-5 px-5">
                                <div className='text-2xl font-bold '>
                                    {showProjectName && projectName}
                                </div>
                                {showAboutProject && <ExpandingText
                                    expandedHeight={160}
                                    text={aboutProject}
                                />}
                                {showTechStack && <div className="flex flex-wrap ">
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
                                </div>}
                            </div>
                        </div>
                        {/* */
                     /*__________________________ Middle div  ______________________ */
                     /* */}
                        {redirectOnClick && <Link className="bg-black w-full h-full absolute z-30 opacity-40"
                            target="_blank"
                            href={url} />}

                        {/* Inactive Div */}
                        {inactiveCard && <div className='bg-black w-full h-full absolute z-20 opacity-70' />}

                        {/* */
                     /*__________________________ Background Image  ______________________ */
                     /* */}
                        <div className={
                            cn(
                                'h-full w-full  z-10',
                                inactiveCard ? 'blur-sm' : ''
                            )
                        } style={{ position: 'absolute' }}>
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
