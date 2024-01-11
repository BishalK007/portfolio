import { cn } from '@lib/utils';
import React, { useState } from 'react';
import { BiSolidCarousel } from "react-icons/bi";
import { CiGrid41 } from "react-icons/ci";

interface ToggleButtonProp {
    onGridPress: () => void
    onGalleryPress: () => void
    gridButtonColorTW: string
    galleryButtonColorTW: string
}
const ToggleButton: React.FC<ToggleButtonProp> = ({
    onGalleryPress,
    onGridPress,
    gridButtonColorTW,
    galleryButtonColorTW,
}) => {
    const [isGridView, setIsGridView] = useState(false);

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
                }}
                className={cn(
                    ' w-20 rounded-l-lg flex flex-row justify-center items-center ',
                    galleryButtonColorTW
                )}
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
                }}
                className={cn(
                    ' w-20 rounded-r-lg flex flex-row justify-center items-center  ',
                    gridButtonColorTW
                )}
            >
                <CiGrid41 className='text-[30px]' />
            </button>
        </div>
    );
}

export default ToggleButton;
