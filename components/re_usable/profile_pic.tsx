import Image from 'next/image'
import React from 'react'

const ProfilePic:React.FC<{data:Data, width:number, height:number}> = ({data, width, height}) => {
  return (
    <div className="bg-red-300 h-20 w-20 object-cover relative" style={{width:width, height:height, maxWidth:600}}>
      <div className="h-full w-full bg-green-500 absolute translate-x-5 translate-y-5"></div>
      <div className="h-full w-full bg-black profile-image absolute">
        <img 
          src={data.profileImage.src.sqBgRemoved}  
          alt={data.profileImage.altText}
          
          style={{
            width:width, 
            height:height, 
            objectFit:'cover',
            objectPosition: 'calc(50% + 50px) center'
            // objectPosition: 'clac(50%)',
          }}
        />
      </div>
    </div>
  )
}

export default ProfilePic