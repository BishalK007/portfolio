'use client'
import React, { useState } from 'react'
import ProgressBar from '../progress/progress_bar';
import { cn } from '@lib/utils';

interface ProgressCardProp {
  dataMap: Map<string, number>;
  cols?: number;
  width?: number | string;
  height?: number | string;
  gap?: number,
  isBackDropVisible?: boolean
  bgColor?: string
  dropColor?: string,
  backdropTranslate?: number[],
  showAnimation?: boolean
  animationDuration?: number,
  classTW?: string,
}

const ProgressCard: React.FC<ProgressCardProp> = ({
  dataMap,
  cols = 1,
  width = 300,
  height = 'fit-content',
  gap = 16,
  isBackDropVisible = true,
  bgColor = 'blue',
  dropColor = 'gray',
  backdropTranslate = [5, 5],
  showAnimation = true,
  animationDuration = 200,
  classTW = '',
}) => {
  const [progressValue, setProgressValue] = useState(50);
  const gridWidth = 100 / cols
  return (
    <div
      className={cn(' w-full h-fit flex items-center justify-center pt-10 ',
        classTW)}
      style={{
        backgroundColor: bgColor,
        width: width,
        height: height,
      }}>
      <div
        className='w-full px-[10%] h-fit '
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, calc(${gridWidth}% - ${gap / 2}px))`, // Adjusted here
          gap: `${gap}px `,
        }}>
        {/* {
          Array.from({length: 50 }, (_, index) => (
            <div key={index} className='bg-red-500'>Hi</div>
          ))
        } */}
        {[...Array.from(dataMap)].map(([key, value]) => (
          <div
            key={key}
            style={{
              height: 'fit',
              width: '100%',
            }}>
            <div className=' '
              style={{
                width: '100%',
              }}>
              <span className='pb-10'>{key}</span>
              <ProgressBar
                width={'100%'}
                height={4}
                progressValue={value / 100}
                cornerRadius={2}
                progressColor='gray'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressCard



// {[...Array.from(dataMap)].map(([key, value]) => (
//   <div
//     key={key}
//     style={{
//       height: 'fit',
//       width: '100%',
//     }}>
//     <div className='text-2xl '
//       style={{
//         width: '100%',
//       }}>
//       <span className='pb-10'>{key}</span>
//       <ProgressBar
//         width={'100%'}
//         height={4}
//         progressValue={0.2}
//         cornerRadius={2}
//         progressColor='gray'
//       />
//     </div>
//   </div>
// ))}