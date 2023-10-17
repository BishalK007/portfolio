import React, { useEffect, useState } from 'react';
import ProgressBar from '../progress/progress_bar';
import { cn } from '@lib/utils';
import CircularProgress from '../progress/progress_bar_circular';


interface ProgressCardProp {
  dataMap: Map<string, number>;
  cols?: number;
  width?: number | string;
  height?: number | string;
  gap?: number;
  isBackDropVisible?: boolean;
  bgColor?: string;
  dropColor?: string;
  backdropTranslate?: number[];
  showAnimation?: boolean;
  animationDuration?: number;
  progressType: 'circular' | 'linear';
  classTW?: string;

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
  progressType = 'linear',
  classTW = '',
}) => {
  const [progressValue, setProgressValue] = useState(50);
  const gridWidth = 100 / cols;

  const shouldCenterLastItem = [...Array.from(dataMap)].length % 2 === 1;
  const myRef = document.querySelector('.scrollable-div')

  return (
    <div
      className={cn('w-full h-fit flex items-center justify-center pt-10 ', classTW)}
      style={{
        backgroundColor: bgColor,
        width: width,
        height: height,
      }}>
      <div
        className='w-full px-[10%] h-fit'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, calc(${gridWidth}% - ${gap / 2}px))`, // Adjusted here
          gap: `${gap}px`,
        }}>
        {[...Array.from(dataMap)].map(([key, value], index) => (
          <div
            key={key}
            style={{
              height: 'fit',
              width: '100%',
              gridColumn: shouldCenterLastItem && index === [...Array.from(dataMap)].length - 1 ? `1 / span ${cols}` : 'auto',
              justifySelf: shouldCenterLastItem && index === [...Array.from(dataMap)].length - 1 ? 'center' : 'auto',
            }}>
            <div className='flex flex-col items-center w-full'>
              {progressType == 'circular' && (
                  <CircularProgress
                    size={100}
                    progressValue={value / 100}
                    borderWidth={4}
                    progressColor='gray'
                    showAnimation={true}
                    animationDuration={700}
                    insideText={`${key}`}
                    insideTextColor='white'
                  />
              )}
              {progressType == 'linear' && <span className='pb-5'>{key}</span>}
              {progressType == 'linear' && (
                <ProgressBar
                  width={'100%'}
                  height={4}
                  progressValue={value / 100}
                  cornerRadius={2}
                  progressColor='gray'
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressCard;


