'use client'
import React, { useEffect, useRef, useState } from 'react'
import ExperienceCard from './re_usable/card/experience_card'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from './re_usable/button/button';
interface WorkData {
    companyName: string;
    designation: string;
    timeFrame: string;
    companyLogoUrl: string;
    workDone: string[];
}
const Experience: React.FC<{ data: Data }> = ({ data }) => {
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const [showAllExperience, setshowAllExperience] = useState(false)
    const [experienceCardHeight, setExperienceCardHeight] = useState(0)

    const experienceCardRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (experienceCardRef.current) {
            setExperienceCardHeight(experienceCardRef.current.offsetHeight )
            console.log(experienceCardHeight)
        }
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
            if (experienceCardRef.current) {
                setExperienceCardHeight(experienceCardRef.current.offsetHeight )
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth, windowHeight]);

    let workDataArray: WorkData[] = [];
    data.experience.forEach((element) => {
        workDataArray.push({
            companyLogoUrl: element.image,
            companyName: element.company,
            designation: element.role,
            timeFrame: element.time,
            workDone: element.work,
        })
    })

    if (windowWidth == 0) {
        return <></>
    }
    return (
        <div className='text-white px-10 md:px-20 pt-24 pb-20  h-fit '  >
            <div className='font-caprasimo text-4xl xsm:text-5xl sm:text-6xl '>My<span className='text-green-500'> Experience</span></div>
            <div className="pt-16 "  style={
                !showAllExperience
                    ? {
                        height: 
                        // 'fit-content',
                        experienceCardHeight > 900 
                            ? windowWidth > 900 ? 800: 700
                            : `calc(${experienceCardHeight}px + 100px)`,
                        overflow:
                        experienceCardHeight > 900 
                            ? windowWidth > 900 ? 'scroll' : 'hidden'
                            : 'hidden', 
                        
                        transition: 'height 0.5s ease',
                    }
                    : {
                        height: `calc(${experienceCardHeight}px + 100px)` ,
                        overflow: 'clip',
                        transition: 'height 0.5s ease',
                    }
            }>
                <div ref={experienceCardRef} className=' h-fit'>
                {workDataArray.map((item, index) => (
                    <div className="py-5 " key={index}>

                        <ExperienceCard
                            animationDuration={700}
                            height={600}
                            width={windowWidth > 1040 ? '70%' : '100%'}
                            data={item}
                            dropColor='var(--green-500)'
                            backdropTranslate={[10, 10]}
                            classTW=''
                        />

                    </div>
                ))}
                </div>

            </div>
            {experienceCardHeight > 900  &&
                <div
                className='flex flex-row justify-end '
            >
                <Button
                    backDropColor='var(--green-500)'
                    height={60}
                    width={140}
                    showBackDrop={true}
                    backDropTranslate={[5, 5]}
                    text={showAllExperience ? 'Show Less' : 'Show Full'}
                    onClick={() => { 
                        setshowAllExperience(!showAllExperience)
                        if(experienceCardRef.current)
                            setExperienceCardHeight(experienceCardRef.current.offsetHeight )
                    
                    }}
                    hoverAnimation='backdrop-animation'
                    animationDuration={500}
                    tailwindClass='pt-10'
                />
            </div>
            }
        </div>
    )
}

export default Experience

