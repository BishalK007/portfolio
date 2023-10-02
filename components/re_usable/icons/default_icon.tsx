import { cn } from '@lib/utils'
import Image from 'next/image'
import React from 'react'

interface IconLocalProps {
    size?: number,
    iconSrc: string,
    bgColor?: string,
    txtColor?: string,
    classTW?: string,
    iconText?: string,
    showIconText?: boolean,
}

const IconLocal: React.FC<IconLocalProps> = ({
    size = 30,
    bgColor = 'white',
    txtColor = 'black',
    iconSrc,
    classTW = '',
    iconText = iconSrc,
    showIconText = false,
}) => {

    function capitalizeFLetter(string: string) {
        return (string.charAt(0).toUpperCase() +
            string.slice(1));
    }
    return (
        <div className={
            showIconText  
            ? cn("bg-white  pl-2 pr-3", classTW)
            : cn("bg-white ", classTW)
        }
            style={{
                backgroundColor: bgColor,
                height: size,
                width: showIconText ? 'fit-content' : size ,
                borderRadius: (size / 2),
                display: 'flex',
                alignItems: 'center', // Center vertically
                justifyContent: 'center',
                // Center horizontally
            }}>
            <div className="flex flex-row space-x-2 ">
                <div style={{
                    display: 'flex',
                    alignItems: 'center', // Center vertically
                    justifyContent: 'center',
                }}>

                    <Image
                        alt={iconSrc}
                        src={`/assets/icons/${iconSrc}.svg`}
                        height={size * 0.8}
                        width={size * 0.8}
                    ></Image>
                </div>
                {showIconText && <div className=' text-lg font-bold'
                    style={{
                        color: txtColor,
                    }}>{capitalizeFLetter(iconText)}
                </div>}
            </div>
        </div>
    )
}

export default IconLocal