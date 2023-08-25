'use client'
import React, { useEffect, useState } from 'react'
import AboutMeCard from './re_usable/card/about_me_card'
import UnderlineText from './re_usable/text/underline_text'
import ProgressCard from './re_usable/card/progressCard'

const AboutMe: React.FC<{ data: Data }> = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  useEffect(() => {
    // console.log(data.skills.length)
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

  const aboutMeDataMap = new Map<string, string>();
  aboutMeDataMap.set('First Name', data.aboutMe.firstName);
  aboutMeDataMap.set('Last Name', data.aboutMe.lastName);
  aboutMeDataMap.set('Phone', data.aboutMe.phoneNo);
  aboutMeDataMap.set('City', data.aboutMe.city);
  aboutMeDataMap.set('Email', data.aboutMe.mail);
  aboutMeDataMap.set('Languages', data.aboutMe.languages.map(lang => `'${lang}'`).join(',  '));

  const skillCardDataMap = new Map<string, number>()
  data.skills.forEach((element) => {
    skillCardDataMap.set(element.name, element.progress);
    // console.log( element.name + element.progress + typeof element.progress)
  })
  const languageDataMap = new Map<string, number>()
  data.programming_languages.forEach((element) => {
    languageDataMap.set(element.name, element.progress);
    // console.log( element.name + element.progress + typeof element.progress)
  })
  // skillCardDataMap.set('hello',10);
  // skillCardDataMap.set('hello1',10);
  // skillCardDataMap.set('hello2',10);
  // skillCardDataMap.set('hello5',10);
  // skillCardDataMap.set('hello6',10);
  // skillCardDataMap.set('hello7',10);
  // skillCardDataMap.set('hello8',10);
  // skillCardDataMap.set('hello9',10);
  // skillCardDataMap.set('hello10',10);
  // console.log(skillCardDataMap)
  if (windowWidth == 0) {
    return <></>
  }
  return (
    <div className='text-white px-10 md:px-20 pt-24 min-h-[900px] '>
      {/* */
         /*__________________________ About ME  ______________________ */
         /* */}
      <div className='font-caprasimo text-4xl xsm:text-5xl sm:text-6xl'>About<span className='text-green-500'> Me</span></div>
      <div className="w-full">
        <div className="flex flex-col screen1040:flex-row   h-fit">
          {/* */
           /*__________________________ Personal Details  ______________________ */
           /* */}
          <div className="flex flex-col pt-20 font-bricolage_grotesque w-full ">
            <UnderlineText
              underLineHeight={2}
              classTW='text-2xl xsm:text-3xl sm:text-4xl'
              color='var(--green-500)'
              spacing={10}
            >
              {'Personal Details -'}
            </UnderlineText>


            <AboutMeCard
              dataMap={aboutMeDataMap}
              cols={windowWidth <= 710 ? 1 : 2}
              height={500}
              width={windowWidth <= 1040 ? '100% ' : '40vw'}
              dropColor='var(--green-500)'
              gap={20}
              backdropTranslate={[14, 14]}
              animationDuration={700}
              classTW='pt-20  text-md sm:text-lg screen900:text-xl  screen1040:text-lg xl:text-xl'
            />
          </div>
          <div className="flex flex-col">
            {/* */
           /*__________________________ Skills  ______________________ */
           /* */}
          <div className="flex flex-col pt-20 font-bricolage_grotesque w-full justify-between screen545:pl-10  max-h-fit">
            <div className="sm:pl-5 ">
              <UnderlineText
                underLineHeight={2}
                
                classTW='text-2xl xsm:text-3xl sm:text-4xl  '
                color='var(--green-500)'
                spacing={10}
              >
                {'Skills -'}
              </UnderlineText>
            </div>
            <div
              className=''
              style={{
                width: windowWidth <= 1040 ? '100% ' : '40vw', height: 'fit-content'
              }}>
              <ProgressCard
                dataMap={skillCardDataMap}
                width={windowWidth <= 1040 ? '100% ' : '40vw'}
                bgColor='transparent'
                cols={windowWidth <= 1040 ? 1 : 2}
                gap={30}
                classTW='text-xl'
              />
            </div>
          </div>{/* */
           /*__________________________ Languages  ______________________ */
           /* */}
          <div className="flex flex-col pt-20 font-bricolage_grotesque w-full justify-between screen545:pl-10">
            <div className="sm:pl-5">
              <UnderlineText
                underLineHeight={2}
                
                classTW='text-2xl xsm:text-3xl sm:text-4xl '
                color='var(--green-500)'
                spacing={10}
              >
                {'Languages -'}
              </UnderlineText>
            </div>
            <div
              className=''
              style={{
                width: windowWidth <= 1040 ? '100% ' : '40vw', height: 'fit-content'
              }}>
              <ProgressCard
                dataMap={languageDataMap}
                width={windowWidth <= 1040 ? '100% ' : '40vw'}
                bgColor='transparent'
                cols={windowWidth <= 1040 ? 1 : 2}
                gap={30}
                classTW='text-xl'
              />
            </div>
          </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutMe

// {/* */
//            /*__________________________ Skills  ______________________ */
//            /* */}
//            <div className="flex flex-col pt-20 font-bricolage_grotesque w-full justify-between screen545:pl-10">
//            <div className="sm:pl-5">
//              <UnderlineText
//                underLineHeight={2}
               
//                classTW='text-2xl xsm:text-3xl sm:text-4xl '
//                color='var(--green-500)'
//                spacing={10}
//              >
//                {'Skills -'}
//              </UnderlineText>
//            </div>
//            <div
//              className=''
//              style={{
//                width: windowWidth <= 1040 ? '100% ' : '40vw', height: 600
//              }}>
//              <ProgressCard
//                dataMap={skillCardDataMap}
//                width={windowWidth <= 1040 ? '100% ' : '40vw'}
//                bgColor='transparent'
//                cols={windowWidth <= 1040 ? 1 : 2}
//                gap={30}
//                classTW='text-xl'
//              />
//            </div>
//          </div>