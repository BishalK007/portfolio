// ./components/re_usable/button/toggle-grid-gallery.tsx

import { cn } from '@lib/utils';
import React, { useState } from 'react';
import { BiSolidCarousel } from "react-icons/bi";
import { CiGrid41 } from "react-icons/ci";

interface ToggleButtonProp {
    onGridPress: () => void;
    onGalleryPress: () => void;
    slidingIndicatorColor?: string ;
    toggleBgColor?: string;
}

const ToggleButton: React.FC<ToggleButtonProp> = ({
    onGalleryPress,
    onGridPress,
    slidingIndicatorColor = 'bg-[var(--green-500)]',
    toggleBgColor = 'bg-gray-800',
}) => {
    const [isGridView, setIsGridView] = useState(false);

    return (
        <div
            className={cn(
                "relative flex flex-row h-14 text-white rounded-lg ",
                "transition-all duration-300 ease-in-out",
                "overflow-hidden",
                "shadow-inner", // Optional: Adds inner shadow for depth
                toggleBgColor
            )}
        >
            {/* Sliding Background Indicator */}
            <div
                className={cn(
                    "absolute top-0 left-0 h-full w-20 transition-transform duration-300 ease-in-out",
                    isGridView ? "translate-x-full rounded-r-lg" : "translate-x-0 rounded-l-lg",
                    slidingIndicatorColor // Fixed color for the sliding indicator
                )}
            ></div>

            {/* Gallery View Button */}
            <button
                onClick={() => {
                    if (!isGridView) return; // Prevent action if already in gallery view
                    onGalleryPress();
                    setIsGridView(false);
                }}
                className={cn(
                    'relative z-10 w-20 rounded-l-lg flex justify-center items-center transition-opacity duration-300',
                    !isGridView ? 'opacity-100 cursor-default' : 'opacity-50 cursor-pointer',
                    // Apply hover effect only when the button is clickable
                    isGridView ? 'hover:opacity-70' : '',
                    'noTapHighlight' // Apply the custom tap highlight class
                )}
                disabled={!isGridView}
                aria-pressed={!isGridView}
                aria-label="Switch to Gallery View"
            >
                <BiSolidCarousel className={cn('text-[30px]', !isGridView ? 'text-white' : 'text-gray-400')} />
            </button>

            {/* Grid View Button */}
            <button
                onClick={() => {
                    if (isGridView) return; // Prevent action if already in grid view
                    onGridPress();
                    setIsGridView(true);
                }}
                className={cn(
                    'relative z-10 w-20 rounded-r-lg flex justify-center items-center transition-opacity duration-300',
                    isGridView ? 'opacity-100 cursor-default' : 'opacity-50 cursor-pointer',
                    // Apply hover effect only when the button is clickable
                    !isGridView ? 'hover:opacity-70' : '',
                    'noTapHighlight' // Apply the custom tap highlight class
                )}
                disabled={isGridView}
                aria-pressed={isGridView}
                aria-label="Switch to Grid View"
            >
                <CiGrid41 className={cn('text-[30px]', isGridView ? 'text-white' : 'text-gray-400')} />
            </button>
        </div>
    );
}

export default ToggleButton;
