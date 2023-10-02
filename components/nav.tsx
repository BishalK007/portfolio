'use client'
import React, { useState, useEffect } from 'react'

const Nav = () => {
  const [navHeight, setNavHeight] = useState('h-20')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavHeight('h-16')
        // console.log('out');
      } else {
        setNavHeight('h-20')
        // console.log('in');
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={navHeight + ' transition-all duration-1000  ease-in-out  bg-black bg-opacity-100 sticky top-0 z-50 text-white'}></div>
  )
}

export default Nav
