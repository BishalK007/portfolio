'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Button from './re_usable/button/button';
import TelLink from './re_usable/text/tel-link';
import MailLink from './re_usable/text/mail-link';
import IconLocal from './re_usable/icons/default_icon';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface data {
    emailFieldValue: string
    nameFieldValue: string
    subjectFieldValue: string
    bodyFieldValue: string
}

const GetContact: React.FC<{ data: Data }> = ({ data }) => {
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

    const [emailFieldValue, setEmailFieldValue] = useState('')
    const [nameFieldValue, setNameFieldValue] = useState('')
    const [subjectFieldValue, setSubjectFieldValue] = useState('')
    const [bodyFieldValue, setBodyFieldValue] = useState('')

    const setFieldValues = (
        email: string,
        name: string,
        subject: string,
        body: string,

    ) => {
        setEmailFieldValue(email)
        setNameFieldValue(name)
        setBodyFieldValue(body)
        setSubjectFieldValue(subject)
    }

    function isValidEmail(email: string) {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    }
    const callToast = (txt:string) => {
        toast(txt, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    const submitEmailJS = async (data: data) => {
        // console.log(data.nameFieldValue)
        if (data.nameFieldValue == '') {
            callToast('Please enter your name')
            return;
        }
        if (!isValidEmail(data.emailFieldValue)) {
            callToast('Enter Valid Mail')
            return;
        }
        if (data.subjectFieldValue == '') {
            callToast('Please enter the subject')
            return;
        }
        if (data.bodyFieldValue == '') {
            callToast('Tell me about Something')
            return;
        }
        const emailPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: JSON.stringify({
                        nameFieldValue: data.nameFieldValue,
                        emailFieldValue: data.emailFieldValue,
                        subjectFieldValue: data.subjectFieldValue,
                        bodyFieldValue: data.bodyFieldValue,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    resolve('Promise resolved 👌');
                    setFieldValues('', '', '', '');

                } else {
                    reject('Promise rejected 🤯');
                }
            } catch (error) {
                reject('An error occurred while sending email');
            }

        }
        );
        toast.promise(
            emailPromise,
            {
                pending: 'Sending mail',
                success: 'Mail Sent 👌',
                error: 'Error Sending Mail 🤯'
            }
        );
    };

    // Add a handler to submit the form
    const handleSubmit = () => {
        // e.preventDefault();
        submitEmailJS({
            nameFieldValue,
            emailFieldValue,
            subjectFieldValue,
            bodyFieldValue,
        });
    };

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
        <div className='text-white  md:px-20 mt-24 pb-[2px] md:py-10 ' >

            <div className='font-caprasimo text-3xl xsm:text-5xl sm:text-6xl pb-10 mx-10'>Get in<span className='text-green-500'> Touch </span></div>
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
                    <div className="flex flex-row space-x-5 items-center">
                        <div style={{ height: 30, width: 30, }}><IconLocal iconSrc='mail-white' bgColor='transparent' size={30} /></div>
                        <div
                            className='text-md screen545:text-xl my-5 '
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
                    <div className="flex flex-row space-x-5 items-center">
                        <div style={{ height: 30, width: 30 }}><IconLocal iconSrc='phone-white' bgColor='transparent' size={30} /></div>
                        <div
                            className='text-md screen545:text-xl my-5'
                            style={{
                                overflowWrap: 'anywhere', wordWrap: 'break-word'
                            }}
                        >
                            <TelLink
                                phoneNumber={data.aboutMe.phoneNo}
                            // subject={subjectFieldValue}
                            // body={bodyFieldValue}
                            />
                        </div>

                    </div>
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
                            onClick={handleSubmit}
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