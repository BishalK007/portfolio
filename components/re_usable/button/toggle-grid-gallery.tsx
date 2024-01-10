import { cn } from '@lib/utils';
import React, { useState } from 'react';
import { BiSolidCarousel } from "react-icons/bi";
import { CiGrid41 } from "react-icons/ci";

interface ToggleButtonProp {
    // isInSliderView: boolean,
    onGridPress: () => void
    onGalleryPress: () => void
}
const ToggleButton: React.FC<ToggleButtonProp> = ({
    onGalleryPress,
    onGridPress,
}) => {
    const [isGridView, setIsGridView] = useState(false);
    const [gridButtonColor, setGridButtonColor] = useState('yellow');
    const [galleryButtonColor, setGalleryButtonColor] = useState('green')

    return (
        <div className={cn(
            "flex flex-row  h-14   text-white rounded-lg focus:outline-none ",
        )}>
            <button
                // disabled={isGridView ? false : true}
                onClick={() => {
                    console.log("gall");
                    onGalleryPress();
                    isGridView ?? setIsGridView(false)
                    isGridView ?? setGalleryButtonColor('green')
                    isGridView ?? setGridButtonColor('yellow')
                }}
                className={cn(
                    ' w-20 rounded-l-lg flex flex-row justify-center items-center ',
                    // galleryButtonColor
                )}
                style={{
                    backgroundColor: galleryButtonColor,
                }}
            >
                <BiSolidCarousel
                    className='text-[30px]'
                />
            </button>
            <button
                // disabled={isGridView ? true : false}
                onClick={() => {
                    onGridPress();
                    console.log("grid")
                    !isGridView ?? setIsGridView(true) 
                    !isGridView ?? setGridButtonColor('green') 
                    !isGridView ?? setGalleryButtonColor('yellow') 
                }}
                className={cn(
                    ' w-20 rounded-r-lg flex flex-row justify-center items-center  ',
                    // gridButtonColor
                )}
                style={{
                    backgroundColor: gridButtonColor
                }}
            >
                <CiGrid41 className='text-[30px]' />
            </button>
        </div>
    );
}

export default ToggleButton;
