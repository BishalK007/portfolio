import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface ProfilePicProps {
  data: Data;
  width?: number;
  height?: number;
  backDropTranslate?: number[];
  backDropColor?: string
  objectPosition?: string;
  animationDuration?: number;
}

const ProfilePic: React.FC<ProfilePicProps> = ({
  data,
  width = 100,
  height = 100,
  backDropTranslate = [10, 10],
  backDropColor = 'black',
  objectPosition = 'center',
  animationDuration = 200,

}) => {
  const [ref, inView] = useInView();
  const [animation, setAnimation] = useState('');
  const backDropRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (inView && backDropRef.current) {
      backDropRef.current.style.transform = `translate(${backDropTranslate[0]}px, ${backDropTranslate[1]}px)`
    } else if (backDropRef.current) {
      backDropRef.current.style.transform = `translate(0,0)`
      // setBackDropTranslateCSS(`translate(0,0)`);
    }
  }, [inView, backDropTranslate]);

  return (
    <div
      ref={ref}
      className="bg-red-300 h-20 w-20 object-cover relative"
      style={{ width, height, maxWidth: 600 }}
    >
      <div className={`h-full w-full bg-green-500 absolute transition-all duration-1000 ${animation}`}
        ref={backDropRef}
        style={{
          transform: `translate(${backDropTranslate[0]}px, ${backDropTranslate[1]}px)`,
          backgroundColor: `${backDropColor}`,
          transition: `transform ${animationDuration}ms`
        }}></div>
      <div className="h-full w-full bg-black profile-image absolute">
        <Image
          src={data.profileImage.src.bgRemoved}
          alt={data.profileImage.altText}
          fill={true}
          style={{objectFit: "cover", 
          // height: "100%",
          objectPosition: `${objectPosition}`
        }}
      
        />
      </div>
    </div>
  );
};

export default ProfilePic;
