'use client'
import React, { useEffect, useState } from 'react'
import AutoWidthImage from './re_usable/image/auto_width_image'
import AutoHeightImage from './re_usable/image/auto_height_image'
import ProfilePic from './re_usable/profile_pic'
import Typewriter from './re_usable/typewriter_text'
import Button from './re_usable/button/button'

const WelcomeScreen: React.FC<{ data: Data }> = ({ data }) => {
  const [welcomeHeight, setWelcomeHeight] = useState(0)
  const [welcomeWidth, setWelcomeWidth] = useState(0)
  useEffect(() => {
    setWelcomeHeight(window.innerHeight);
    setWelcomeWidth(window.innerWidth);
    const handleResize = () => {
      setWelcomeHeight(window.innerHeight);
      setWelcomeWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //_____________ Desktop View
  if (welcomeWidth > 768) {
    return (
      <div className="relative pt-20 ">
        <div className='absolute flex flex-row justify-end w-full pr-20 '>
          <ProfilePic
            data={data}
            width={welcomeWidth / 2 - 100}
            height={800}
            objectPosition='calc(50% + 50px) center'
          />
        </div>
        {/* */
         /*__________________________ Info  ______________________ */
         /* */}
        <div className='absolute flex flex-row justify-start pr-20 text-white text-6xl  pl-20 h-[800px] ' style={{ width: welcomeWidth / 2 + 20, }}>
          <div className="flex flex-col">
            <div className="w-fit pt-20 font-bricolage_grotesque flex flex-row relative">
              {/* */
             /*__________________________ Title  ______________________ */
             /* */}
              <div className="absolute flex flex-row">
                <span className='pr-5 text-gray-500 font-bold  h-min '>{'>'}</span>
                <div>
                  <Typewriter
                    text1={data.name as string}
                    text2={data.designation as string}
                    color1="White"
                    color2="rgb(74 222 128)"
                  />
                  <span className='pl-2 text-gray-500 font-bold'>{'_'}</span>
                </div>
              </div>
            </div>
            {/* */
             /*__________________________ Quote  ______________________ */
             /* */}
            <div className='text-2xl font-caprasimo  absolute top-80 flex flex-col'>
              {data.welcomeQuote}
              <div className='pt-10 flex flex-col space-y-4 font-sans'>
                <Button
                  height={60}
                  width={180}
                  text='Contact Me'
                  bgColor='var(--green-500)'
                  textColor='black'
                  cornerRadius={[10, 10, 10, 10]}
                  borderColor='white'
                  borderWidth={0}
                  tailwindClass='text-2xl font-bold hover:scale-105 transition-all duration-500'
                  onClick={() => { }}
                />
                <Button
                  height={50}
                  width={140}
                  text='Download CV'
                  bgColor='transparent'
                  hoverColor='white'
                  textColor='white'
                  hoverTextColor='black'
                  cornerRadius={[10, 10, 10, 10]}
                  borderColor='white'
                  borderWidth={2}
                  tailwindClass='text-xl font-bold transition-all duration-500 ml-[2px]'
                  onClick={() => { }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  //_____________Mobile View
  else {
    return (
      <div className='px-10'>
        <div className="flex flex-col screen545:flex-row  pt-16  items-center screen545:items-start">
          <ProfilePic
            data={data}
            width={200}
            height={200}
            objectPosition='center'
          />
          <div className="flex flex-col screen545:pl-[10vw]">
            {/* */
             /*__________________________ Title  ______________________ */
             /* */}
            <div className=" flex flex-row   text-4xl screen545:text-4xl w-40 pt-14 justify-start ml-[-40px] screen545:ml-0 " >
              <span className='pr-5 text-gray-500 font-bold  h-20 '>
                <div className="hidden screen545:flex">{'>'}</div>
              </span>
              <div>
                <Typewriter
                  text1={data.name as string}
                  text2={data.designation as string}
                  color1="White"
                  color2="rgb(74 222 128)"
                />
                <span className='pl-2 text-gray-500 font-bold'>{'_'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-8  text-xl screen545:text-2xl font-caprasimo text-white top-80 flex flex-col  screen545:pt-14 px-5 text-center screen545:text-left'>
          {data.welcomeQuote}
        </div>
        <div className='pt-10 flex flex-col space-y-4 font-sans items-center screen545:items-start pl-5'>
                <Button
                  height={50}
                  width={160}
                  text='Contact Me'
                  bgColor='var(--green-500)'
                  textColor='black'
                  cornerRadius={[10, 10, 10, 10]}
                  borderColor='white'
                  borderWidth={0}
                  tailwindClass='text-xl font-bold hover:scale-105 transition-all duration-500'
                  onClick={() => { }}
                />
                <Button
                  height={40}
                  width={140}
                  text='Download CV'
                  bgColor='transparent'
                  hoverColor='white'
                  textColor='white'
                  hoverTextColor='black'
                  cornerRadius={[10, 10, 10, 10]}
                  borderColor='white'
                  borderWidth={2}
                  tailwindClass='text-lg font-bold transition-all duration-500 ml-[2px]'
                  onClick={() => { }}
                />
              </div>
      </div>
    )
  }

}

export default WelcomeScreen