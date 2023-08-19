import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface ProfilePicProps {
  data: Data;
  width?: number;
  height?: number;
  objectPosition?: string;
}

const ProfilePic: React.FC<ProfilePicProps> = ({ data, width = 100, height = 100, objectPosition = 'center' }) => {
  const [ref, inView] = useInView();
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    if (inView) {
      setAnimation('translate-x-5 translate-y-5');
    } else {
      setAnimation('');
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="bg-red-300 h-20 w-20 object-cover relative"
      style={{ width, height, maxWidth: 600 }}
    >
      <div className={`h-full w-full bg-green-500 absolute transition-all duration-700 ${animation}`}></div>
      <div className="h-full w-full bg-black profile-image absolute">
        <img
          src={data.profileImage.src.sqBgRemoved}
          alt={data.profileImage.altText}
          style={{
            width,
            height,
            objectFit: 'cover',
            objectPosition,
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePic;
