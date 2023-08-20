'use client'
import React, { useEffect, useState } from 'react'
import AboutMeCard from './re_usable/card/about_me_card'

const AboutMe: React.FC<{ data: Data }> = ({ data }) => {
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
  }, []);

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
  if (windowWidth == 0) {
    return <></>
  }
  return (
    <div className='text-white px-10 md:px-20 pt-24 '>
      {/* */
         /*__________________________ About ME  ______________________ */
         /* */}
      <div className='font-caprasimo text-4xl xsm:text-5xl sm:text-6xl'>About<span className='text-green-500'> Me</span></div>
      <div className="w-full">
        <div className="flex flex-col screen545:flex-row">
          {/* */
           /*__________________________ Personal Details  ______________________ */
           /* */}
          <div className="flex flex-col pt-20 font-bricolage_grotesque w-full">
            <div className='text-2xl xsm:text-3xl sm:text-4xl '>
              Personal Details -
            </div>
            <AboutMeCard
              dataMap={dataMap}
              cols={windowWidth <= 710 ? 1 : 2}
              height={500}
              width={windowWidth <= 1040 ? '100% ' : '40vw'}
              dropColor='var(--green-500)'
              classTW='pt-20  text-md sm:text-lg screen900:text-xl  screen1040:text-lg xl:text-xl'
              gap={20}
            />
          </div>
          {/* */
           /*__________________________ Skills  ______________________ */
           /* */}
          <div className="flex flex-col pt-20 font-bricolage_grotesque w-full justify-between screen545:pl-10 ">
            <div className='text-2xl xsm:text-3xl sm:text-4xl '>
              Skills -
            </div>
            <div
              className='bg-red-500 mt-10'
              style={{ width: windowWidth <= 1040 ? '100% ' : '40vw', height: 600 }}
            >


            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutMe