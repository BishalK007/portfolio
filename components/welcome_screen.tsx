'use client'
import React, { useEffect, useState } from 'react'
import AutoWidthImage from './re_usable/image/auto_width_image'
import AutoHeightImage from './re_usable/image/auto_height_image'
import ProfilePic from './re_usable/image/profile_pic'
import Typewriter from './re_usable/text/typewriter_text'
import Button from './re_usable/button/button'
import { useInView } from 'react-intersection-observer';


const WelcomeScreen: React.FC<{
  data: Data,
  // windowWidth: number ,
  // windowHeight: number,
}> = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      // console.log(window.innerHeight, windowWidth);
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth,]);

  const [quoteref, inView] = useInView({
    // triggerOnce: true, // Ensures the effect runs only once when component comes into view
  });
  const [quoteAnimation, setquoteAnimation] = useState(' scale-[0.8] opacity-0 translate-y-5 ')

  useEffect(() => {
    if (inView) {
      setquoteAnimation(' scale-100  translate-y-0 ')

    } else {
      setquoteAnimation(' scale-[0.8] opacity-0 translate-y-5 ')
    }
  }, [inView]);
  const scrollToContact = () => {
    const getContactElement = document.querySelector('#get-contact');
    if (getContactElement) {
      getContactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //_____________ Desktop View
  if (windowWidth > 768) {
    return (
      <div className="relative pt-20 h-[900px]" >
        <div className='absolute flex flex-row justify-end w-full pr-20 '>
          <ProfilePic
            data={data}
            width={windowWidth / 2 - 100}
            height={800}
            backDropColor='var(--green-500)'
            backDropTranslate={[15, 15]}
            animationDuration={700}
            objectPosition='calc(50% + 50px) top'
          />
        </div>
        {/* */
         /*__________________________ Info  ______________________ */
         /* */}
        <div className={'absolute flex flex-row justify-start pr-20 text-white text-6xl  pl-20 h-[800px] '} style={{ width: windowWidth / 2 + 20, }}>
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
            <div className={'text-2xl font-caprasimo  absolute top-80 flex flex-col '}>
              <div
                ref={quoteref}
                className={'transition-all duration-1000 ' + quoteAnimation}
              >
                {data.welcomeQuote}
              </div>
              <div className='pt-10 flex flex-col space-y-4 font-sans'>
                <Button
                  height={70}
                  width={220}
                  text='Contact Me'
                  bgColor='white'
                  textColor='black'
                  borderColor='white'
                  borderWidth={0}
                  showBackDrop={true}
                  backDropTranslate={[8, 8]}
                  backDropColor='var(--green-500)'
                  hoverAnimation='backdrop-animation'
                  animationDuration={700}
                  tailwindClass='text-2xl font-bold '
                  onClick={scrollToContact}
                />
                <a href={data.aboutMe.cv} download>

                  <Button
                    height={50}
                    width={140}
                    text='Download CV'
                    bgColor='transparent'
                    textColor='white'
                    borderColor='transparent'
                    borderWidth={2}
                    tailwindClass='text-xl font-bold ml-[2px]'
                    onClick={() => { }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  //_____________Mobile View
  else if (windowWidth > 0) {
    return (
      <div className='px-10' >
        <div className="flex flex-col screen545:flex-row  pt-16  items-center screen545:items-start">
          <ProfilePic
            data={data}
            width={windowWidth > 545 ? 200 : windowWidth * 0.8}
            height={windowWidth > 545 ? 200 : windowWidth * 0.8}
            backDropColor='var(--green-500)'
            animationDuration={700}
            objectPosition='calc(50% + 20px) top'
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

        <div
          ref={quoteref}
          className={'pt-8  text-xl screen545:text-2xl font-caprasimo text-white top-80 flex flex-col  screen545:pt-14 px-5 text-center screen545:text-left transition-all duration-1000' + quoteAnimation}>
          {data.welcomeQuote}
        </div>
        <div className='pt-10 flex flex-col space-y-4 font-sans items-center screen545:items-start pl-5'>
          <Button
            height={70}
            width={220}
            text='Contact Me'
            bgColor='white'
            textColor='black'
            borderColor='white'
            borderWidth={0}
            showBackDrop={true}
            backDropTranslate={[8, 8]}
            backDropColor='var(--green-500)'
            hoverAnimation='backdrop-animation'
            animationDuration={700}
            tailwindClass='text-xl font-bold ml-[2px]'
            onClick={scrollToContact}
          />
          <a href={data.aboutMe.cv} download>
            <Button
              height={40}
              width={140}
              text='Download CV'
              bgColor='transparent'
              textColor='white'
              borderColor='transparent'
              borderWidth={2}
              tailwindClass='text-xl font-bold ml-[2px]'
              onClick={() => { }}
            />
          </a>
        </div>
      </div>
    )
  }
  else {
    return <></>
  }

}







export default WelcomeScreen