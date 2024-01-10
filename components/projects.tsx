'use client'
import React, { useEffect, useRef, useState } from 'react'
import ExperienceCard from './re_usable/card/experience_card'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProjectCard from './re_usable/card/project_card';
import Button from './re_usable/button/button';
import ProjectCardMobile from './re_usable/card/project_card_mobile';
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
        if (projectCardRef.current) {
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
            <div className=''>
                <div className='font-caprasimo text-4xl xsm:text-5xl sm:text-6xl pb-10'>My<span className='text-green-500'> Projects</span></div>

                {/* */
                /*__________________________ Contracting Container  ______________________ */
                /* */}
                {windowWidth > 625 && <ProjectCard
                    // data = {Array.from({length: 10})}
                    data={projectDataArray}
                />}
                {windowWidth <= 625 && <ProjectCardMobile
                    // data = {Array.from({length: 10})}
                    data={projectDataArray}
                />}
            </div>
        </div>
    )
}

export default Projects

