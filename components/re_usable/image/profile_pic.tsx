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
  backDropTranslate = [10, 10], //width, height OR x, y
  backDropColor = 'black',
  objectPosition = 'center',
  animationDuration = 200,

}) => {
  const [ref, inView] = useInView();
  const [animation, setAnimation] = useState('');
  const backDropRef = useRef<HTMLDivElement | null>(null)
  const backDropRefx = useRef<(HTMLDivElement | null)>(null);
  const backDropRefy = useRef<(HTMLDivElement | null)>(null);
  useEffect(() => {
    if (inView && backDropRef.current) {
      backDropRef.current.style.transform = `translate(${backDropTranslate[0]}px, ${backDropTranslate[1]}px)`
    } else if (backDropRef.current) {
      backDropRef.current.style.transform = `translate(0,0)`
      // setBackDropTranslateCSS(`translate(0,0)`);
    }
    //Backdrop of Right side on x axis
    if (inView && backDropRefx.current) {
      backDropRefx.current.style.width = `${backDropTranslate[0]}px`
      backDropRefx.current.style.height = `calc(100% - ${backDropTranslate[1]}px)`
    } else if (backDropRefx.current) {
      backDropRefx.current.style.width = `0px`
      backDropRefx.current.style.height = `100%`
    }
    // Backdrop of bottom on y axis
    if (inView && backDropRefy.current) {
      backDropRefy.current.style.width = `calc(100% - ${backDropTranslate[0]}px)`,
      backDropRefy.current.style.height = `${backDropTranslate[1]}px`
    } else if (backDropRefy.current) {
      backDropRefy.current.style.width = `100%`
      backDropRefy.current.style.height = `0px`
    }
  }, [inView, backDropTranslate]);

  return (
      <div
        ref={ref}
        className="object-cover relative  "
        style={{ width, height, maxWidth: 600 }}
      >
        <div className="flex flex-col  justify-center transition-all" style={{
          width: `calc(100% + ${backDropTranslate[0]}px)`,
          height: `calc(100% + ${backDropTranslate[1]}px)`,
          transition: `all ${animationDuration}ms`
        }}>
          <div className="flex flex-row w-full justify-center" style={{
            height: `calc(100% - ${backDropTranslate[1]}px)`,
          }}>
            <div className="h-full w-full profile-image relative">
              <Image
              className=' absolute'
                src={data.profileImage.src.bgRemoved}
                alt={data.profileImage.altText}
                fill={true}
                style={{
                  objectFit: "cover",
                  objectPosition: `${objectPosition}`,
                  // translate: "0 2px"
                }}

              />
            </div>
            <div
              className="flex flex-row self-end"
              ref={backDropRefx}
              style={{
                width: `${backDropTranslate[0]}px`,
                height: `calc(100% - ${backDropTranslate[1]}px)`,
                backgroundColor: `${backDropColor}`,
                transition: `all ${animationDuration}ms`
              }}
            />
          </div>
          <div
            className="flex flex-col self-end"
            ref={backDropRefy}
            style={{
              height: `${backDropTranslate[1]}px`,
              width: `calc(100% - ${backDropTranslate[0]}px)`,
              backgroundColor: `${backDropColor}`,
              transition: `all ${animationDuration}ms`
            }}
          />
        </div>
      </div>
  );
};

export default ProfilePic;
