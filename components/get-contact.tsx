'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Button from './re_usable/button/button';
import TelLink from './re_usable/text/tel-link';
import MailLink from './re_usable/text/mail-link';
import IconLocal from './re_usable/icons/default_icon';
// import { Input } from "@/components/ui/input"


const GetContact: React.FC<{ data: Data }> = ({ data }) => {
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

    const [emailFieldValue, setEmailFieldValue] = useState('')
    const [nameFieldValue, setNameFieldValue] = useState('')
    const [subjectFieldValue, setSubjectFieldValue] = useState('')
    const [bodyFieldValue, setBodyFieldValue] = useState('')



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

    const inputStyle: React.CSSProperties = {
        color: 'white',
        caretColor: 'var(--green-500)',
        borderBottom: '2px solid var(--green-500)',
        boxSizing: 'border-box',
        height: '80px',
        width: '100%',
        borderRadius: '0px',
        padding: '10px',
        fontSize: '20px',
        backgroundColor: 'var(--bg-color)',
        outline: 'none',
        cursor: 'text',

    };
    if (windowWidth == 0) {
        return <></>
    }

    return (
        <div className='text-white px-10 md:px-20 mt-24 py-10 '>
            <div className='font-caprasimo text-4xl xsm:text-5xl sm:text-6xl pb-10'>Get in<span className='text-green-500'> Touch </span></div>
            <div className="flex flex-col screen900:flex-row w-full" style={{
                backgroundColor: 'var(--bg-color-dark)',
                // backgroundColor: 'green'

            }}>
                {/* */
             /*__________________________ Left Fields   ______________________ */
             /* */}
                <div className='w-[80%] m-10 '>
                    <div className='text-green-500 font-caprasimo text-2xl screen545:text-3xl pb-10 pt-10'>
                        {data['get-contact'].at(0)}
                    </div>
                    <div className='text-xl screen545:text-2xl pb-10'>
                        {data['get-contact'].at(1)}
                    </div>
                    <div className='text-lg screen545:text-xl pb-10'>
                        {data['get-contact'].at(2)}
                    </div>
                    <div className="flex flex-row space-x-5">
                        <div style={{ height: 30, width: 30 }}><IconLocal iconSrc='mail' size={30} /></div>
                        <div
                            className='text-lg screen545:text-xl pb-10 '
                            style={{
                                overflowWrap: 'anywhere', wordWrap: 'break-word'
                            }}
                        >
                            <MailLink
                                email={data.aboutMe.mail}
                                subject={subjectFieldValue}
                                body={bodyFieldValue}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <div style={{ height: 30, width: 30 }}><IconLocal iconSrc='phone' size={30} /></div>
                        <div
                            className='text-lg screen545:text-xl pb-10 '
                            style={{
                                overflowWrap: 'anywhere', wordWrap: 'break-word'
                            }}
                        >
                            <MailLink
                                email={data.aboutMe.phoneNo}
                                subject={subjectFieldValue}
                                body={bodyFieldValue}
                            />
                        </div>
                    </div>



                    <div className='text-xl pb-10'>

                    </div>

                </div>
                {/* */
             /*__________________________ Right Form  ______________________ */
             /* */}

                <div className="  w-[100%] py-16 px-10 flex flex-col space-y-5"
                >
                    <input
                        type="text"
                        value={nameFieldValue}
                        onChange={(event) => {
                            setNameFieldValue(event.target.value);
                        }}
                        style={inputStyle}
                        placeholder="Your Name.."
                    />
                    <input
                        type="Email"
                        value={emailFieldValue}
                        onChange={(event) => {
                            setEmailFieldValue(event.target.value);
                        }}
                        style={{
                            ...inputStyle,
                        }}
                        placeholder="Your Email.."
                    />
                    <input
                        type="text"
                        value={subjectFieldValue}
                        onChange={(event) => {
                            setSubjectFieldValue(event.target.value);
                        }}
                        style={{
                            ...inputStyle,
                        }}
                        placeholder="Subject.."
                    />
                    <textarea
                        // type="text"

                        value={bodyFieldValue}
                        onChange={(event) => {
                            setBodyFieldValue(event.target.value);
                        }}
                        style={{
                            wordBreak: 'break-word',
                            wordWrap: 'break-word',
                            ...inputStyle,
                            height: '200px',
                        }}
                        placeholder="Tell me About it.."
                    />
                    <div className="flex flex-row justify-end">
                        <Button
                            backDropColor='var(--green-500)'
                            height={60}
                            width={140}
                            showBackDrop={true}
                            backDropTranslate={[5, 5]}
                            text={1 ? 'Submit' : 'Submitting..'}
                            // onClick={() => { setshowAllProject(!showAllProject) }}
                            hoverAnimation='backdrop-animation'
                            animationDuration={500}
                            tailwindClass='pt-10'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetContact