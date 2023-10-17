'use client'
import React, { useEffect, useRef, useState } from 'react'
import ExperienceCard from './re_usable/card/experience_card'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProjectCard from './re_usable/card/project_card';
import Button from './re_usable/button/button';
interface ProjectData {
    projectName: string;
    aboutProject: string;
    imgSrc: string;
    url: string;
    tech: string[];
    // workDone: string[];
}


const Projects: React.FC<{ data: Data }> = ({ data }) => {
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const [showAllProject, setshowAllProject] = useState(false)

    const projectCardRef = useRef<HTMLDivElement | null>(null)
    const [projectCardHeight, setProjectCardHeight] = useState(0)


    useEffect(() => {
        if(projectCardRef.current){
            setProjectCardHeight(projectCardRef.current.offsetHeight)
        }
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth, windowHeight]);

    let projectDataArray: ProjectData[] = [];
    data.projects.forEach((element) => {
        projectDataArray.push({
            projectName: element.name,
            aboutProject: element.about,
            imgSrc: element.imgSrc,
            tech: element.tech,
            url: element.url,

        })
    })
    if (windowWidth == 0) {
        return <></>
    }
    return (
        <div className='text-white px-10 md:px-20 pt-24 ' >
            <div className='font-caprasimo text-4xl xsm:text-5xl sm:text-6xl pb-10'>My<span className='text-green-500'> Projects</span></div>
            {/* */
             /*__________________________ Contracting Container  ______________________ */
             /* */}

            <div
                style={
                    ! showAllProject
                        ? {
                            height: windowWidth > 900 ? 800 : 700,
                            overflow: windowWidth > 900 ? 'scroll' : 'hidden',
                            transition: 'height 0.5s ease',
                        }
                        : {
                            height: projectCardHeight,
                            overflow: 'clip',
                            transition: 'height 0.5s ease',
                        }
                }>
                <div ref={projectCardRef}>
                    <ProjectCard

                        // data = {Array.from({length: 10})}
                        data={projectDataArray}
                        cols={

                            windowWidth > 1280
                                ? 3
                                : windowWidth > 900
                                    ? 2
                                    : 1
                        }
                        largeHeight={
                            windowWidth > 900
                                ? 500
                                : 350
                        }
                        smallHeight={
                            windowWidth > 900
                                ? 350
                                : 350
                        }
                    />
                </div>
            </div>
            <div
            className='flex flex-row justify-end'
            >
                <Button
                    backDropColor='var(--green-500)'
                    height={60}
                    width={140}
                    showBackDrop={true}
                    backDropTranslate={[5, 5]}
                    text={showAllProject ? 'Show Less' : 'Show Full'}
                    onClick={() => { setshowAllProject(!showAllProject) }}
                    hoverAnimation='backdrop-animation'
                    animationDuration={500}
                    tailwindClass='pt-10'
                />
            </div>
        </div>
    )
}

export default Projects

