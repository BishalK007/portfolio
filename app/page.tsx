import React from 'react'
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import '@styles/globals.css'
import WelcomeScreen from '@/components/welcome_screen';
import AboutMe from '@components/aboutme';
import Experience from '@components/experience';




const page = () => {
  const fileContents = fs.readFileSync('public/data/data.yaml', 'utf8');
  const data = yaml.load(fileContents) as Data;
  return (
    <div className="">
      <WelcomeScreen
        data={data}
      />
      <AboutMe
        data={data}
      />
      <Experience
        data={data}
      />
      <div className="h-[3000px] ">
      </div>
    </div>
  )
}

export default page