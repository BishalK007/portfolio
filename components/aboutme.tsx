'use client'
import React, { useEffect } from 'react'
import AboutMeCard from './re_usable/card/about_me_card'

const AboutMe:React.FC<{ data: Data }> = ({ data }) =>{
    const dataMap = new Map<string, string>();
    dataMap.set('First Name', data.aboutMe.firstName);
    dataMap.set('Last Name', data.aboutMe.lastName);
    dataMap.set('Phone', data.aboutMe.phoneNo);
    dataMap.set('City', data.aboutMe.city);
    dataMap.set('Email', data.aboutMe.mail);
    dataMap.set('Languages', data.aboutMe.languages.map(lang => `'${lang}'`).join(', '));
    // useEffect(()=>{
    //     console.log(dataMap)
    // },[])
  return (
    <div className='text-white px-20 pt-24'>
        {/* */
         /*__________________________ About ME  ______________________ */
         /* */}
        <div className='font-caprasimo text-6xl'>About<span className='text-green-500'> Me</span></div>
        <div className="w-fit">
        <AboutMeCard 
            dataMap={dataMap}
            cols={2}
            height={500}
            width='50vw'
            dropColor='var(--green-500)'
            classTW='pt-20'
        />
        </div>

    </div>
  )
}

export default AboutMe