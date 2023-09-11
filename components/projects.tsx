'use client'
import React, { useEffect, useState } from 'react'
import ExperienceCard from './re_usable/card/experience_card'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProjectCard from './re_usable/card/project_card';
interface WorkData {
    companyName: string;
    designation: string;
    timeFrame: string;
    companyLogoUrl: string;
    workDone: string[];
}
const Projects: React.FC<{ data: Data }> = ({ data }) => {
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

    useEffect(() => {
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
        <div className='text-white px-10 md:px-20 pt-24 min-h-[900px] '>
            <div className='font-caprasimo text-4xl xsm:text-5xl sm:text-6xl'>My<span className='text-green-500'> Projects</span></div>
            <ProjectCard />
        </div>
    )
}

export default Projects

