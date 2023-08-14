'use client'
import React, { useEffect, useState } from 'react'
import AutoWidthImage from './re_usable/image/auto_width_image'

const WelcomeScreen:React.FC<{data:Data}> = ({data}) => {
    const [welcomeHeight, setWelcomeHeight] = useState(0)
    useEffect(() => {
        setWelcomeHeight(window.innerHeight - 80);
        const handleResize = () => {
          setWelcomeHeight(window.innerHeight - 80);
        };
        window.addEventListener('resize', handleResize);
      
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
      
  return (
    <div>
        {/* <div className='bg-black bg-opacity-50 rounded-lg text-white w-16 '>{data.welcomeQuote}</div> */}
        <div className={"relative w-full  "} style={{height:welcomeHeight + 32}}>
            {/* */
             /*__________________________ Image Div  ______________________ */
             /* */}
            <div className="absolute top-0 w-full  pt-8 ">
                <div className="flex flex-row w-full justify-end px-[10vw]">
                    <AutoWidthImage 
                        altTxt={data.profileImage.altText}
                        height={welcomeHeight}
                        src={data.profileImage.src.bgRemoved}
                        tailwindClasses=''
                    />
                </div>
            </div>
            {/* */
             /*__________________________ Welcome Quote  ______________________ */
             /* */}
            <div className="absolute top-0 w-full bg-black bg-opacity-20 h-full ">
                <div className="flex flex-col  justify-end px-[10vw] h-full pb-44 xsm:pb-32 max-w-[900px]">
                    
                    <div className='text-xl sm:text-3xl font-borel leading-8 sm:leading-relaxed text-start bg-black bg-opacity-50  text-white  rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg p-10  '>
                        <div className="text-2xl sm:text-4xl font-caprasimo pb-4 text-white">Hey! <span className='text-yellow-300'>Bishal</span> Here</div>
                        {data.welcomeQuote}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WelcomeScreen