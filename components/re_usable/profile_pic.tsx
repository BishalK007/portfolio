import Image from 'next/image'
import React from 'react'

interface ProfilePicProps {
  data: Data,
  width?: number, 
  height?: number, 
  objectPosition?: string
}
const ProfilePic: React.FC<ProfilePicProps> = ({ data, width, height, objectPosition }) => {
  return (
    <div className="bg-red-300 h-20 w-20 object-cover relative" style={{ width: width, height: height, maxWidth: 600 }}>
      <div className="h-full w-full bg-green-500 absolute translate-x-5 translate-y-5"></div>
      <div className="h-full w-full bg-black profile-image absolute">
        <img
          src={data.profileImage.src.sqBgRemoved}
          alt={data.profileImage.altText}

          style={{
            width: width,
            height: height,
            objectFit: 'cover',
            objectPosition: objectPosition
            // objectPosition: 'clac(50%)',
          }}
        />
      </div>
    </div>
  )
}
ProfilePic.defaultProps = {
  width: 100,
  height: 100,
  objectPosition: 'center',
}

export default ProfilePic