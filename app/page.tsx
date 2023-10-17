
import React from 'react'
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import '@styles/globals.css'
import WelcomeScreen from '@/components/welcome_screen';
import AboutMe from '@components/aboutme';
import Experience from '@components/experience';
import Projects from '@components/projects';
import GetContact from '@components/get-contact';
import Footer from '@components/footer';
import Nav from '@components/nav';
import GlobalWrapper from '@components/global-wrapper';




const page = () => {
  const fileContents = fs.readFileSync('public/data/data.yaml', 'utf8');
  const data = yaml.load(fileContents) as Data;
  return (
    <div className="">
      <GlobalWrapper
        data={data}
      />
    </div>
  )
}

export default page