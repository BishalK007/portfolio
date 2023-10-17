'use client'
import { cn } from '@lib/utils';
import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const Nav:React.FC<{
  currSelectedItem:string
}> = ({currSelectedItem}) => {
  const [navHeight, setNavHeight] = useState('h-20')
  const [currentSection, setCurrentSection] = useState('')

  

  useEffect(() => {
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavHeight('h-16')
      } else {
        setNavHeight('h-[72px]')
      }

      // Get the current section
      const currentSectionId = window.location.hash.substring(1)
      setCurrentSection(currentSectionId)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const navItems = [
    { id: 'aboutme', text: 'About Me' },
    { id: 'experience', text: 'Experience' },
    { id: 'projects', text: 'Projects' },
    { id: 'get-contact', text: 'Get in Touch' },
  ];

  return (
    <div className={navHeight + ' transition-all duration-1000  ease-in-out  bg-[var(--bg-color-dark)] bg-opacity-100 sticky top-0 z-50 text-white'}>
      <div className="flex items-center justify-between px-10 h-full ">
        {/* Logo or Branding (if any) */}
        <div className=" text-xl font-bold" onClick={scrollToTop}>
         {"</> Bishal"}
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          {navItems.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={`hover:text-gray-300 ${currentSection === item.id && 'text-green-500'}`}
            >
              <div className={cn(
                "text-xl font-bold",
                currSelectedItem == item.id ? "text-[var(--green-500)]" : "text-white"
              )}>{item.text}</div>
            </ScrollLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Nav
