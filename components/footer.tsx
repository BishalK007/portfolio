'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import IconLocal from './re_usable/icons/default_icon'
import MailLink from './re_usable/text/mail-link'

const Footer: React.FC<{ data: Data }> = ({ data }) => {
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

    useEffect(() => {

        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth, windowHeight]);

    if (windowWidth == 0) {
        return <></>
    }
    
    return (
        <div className='bg-[var(--bg-color-dark)] py-8 w-full flex flex-col screen545:flex-row items-center px-10 md:px-20 space-y-3 justify-center'>
            <div className='text-white  w-[100%] screen545:w-[50%] px-2'>
                Copyright © Bishal Karmakar 2023. All rights reserved.
            </div>
            <div className='text-white flex flex-col w-[100%] screen545:w-[50%] space-y-3 px-2'>
                <div className="flex flex-row space-x-5">
                <Link href={data.aboutMe.githubLink} target="_blank">
                        <IconLocal
                            iconSrc='github-white'
                            bgColor='transparent'
                        />
                    </Link>
                    <Link href={data.aboutMe.linkdinLink} target="_blank">
                        <IconLocal
                            iconSrc='linkdin-white'
                            bgColor='transparent'
                        />
                    </Link>
                    <Link href={data.aboutMe.instagramLink} target="_blank">
                        <IconLocal
                            iconSrc='instagram-white'
                            bgColor='transparent'
                        />
                    </Link>
                </div>
                <div
                    className='text-md screen545:text-xl pl-1'
                    style={{
                        overflowWrap: 'anywhere', wordWrap: 'break-word'
                    }}
                >
                    <MailLink
                        email={data.aboutMe.mail}
                    />
                </div>
            </div>
        </div>
    )
}

export default Footer