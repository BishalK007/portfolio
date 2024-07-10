
import React from 'react'
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import '@styles/globals.css'
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