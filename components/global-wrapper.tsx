'use client'
import React, { useState, useEffect, useRef } from 'react';
import Nav from './nav';
import WelcomeScreen from './welcome_screen';
import AboutMe from './aboutme';
import Experience from './experience';
import Projects from './projects';
import GetContact from './get-contact';
import Footer from './footer';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BackgroundBeamsWithCollision } from './bg-theme';

const GlobalWrapper: React.FC<{ data: Data }> = ({ data }) => {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    aboutme: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    getcontact: useRef<HTMLDivElement>(null),
  };
  const foregroundRef = useRef<HTMLDivElement>(null)
  const [foregroundHeight, setForegroundHeight] = useState('0')

  const [currViewPortItem, setCurrViewPortItem] = useState('');

  useEffect(() => {
    // Intersection Observer setup
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.4, // When 40% of the element is visible
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrViewPortItem(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    // Observe all section elements
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Set the foreground height using offsetHeight
    if (foregroundRef.current) {
      setForegroundHeight(`${foregroundRef.current.offsetHeight}px`);
    }

    return () => {
      // Cleanup observer on component unmount
      observer.disconnect();
    };
  }, [sectionRefs, foregroundRef]);

  return (

    <BackgroundBeamsWithCollision className='h-full md:h-full w-full md:w-full bg-gradient-to-r from-transparent to-transparent '>
      <div className="h-[100dvh] w-full overflow-y-scroll">
        <div className="w-full h-[5000px]" ref={foregroundRef}>
        <Nav currSelectedItem={currViewPortItem} />
          <div ref={sectionRefs.home} id="home">
            <WelcomeScreen data={data} />
          </div>
          <div ref={sectionRefs.aboutme} id="aboutme">
            <AboutMe data={data} />
          </div>
          <div ref={sectionRefs.experience} id="experience">
            <Experience data={data} />
          </div>
          <div ref={sectionRefs.projects} id="projects">
            <Projects data={data} />
          </div>
          <div ref={sectionRefs.getcontact} id="get-contact">
            <GetContact data={data} />
          </div>
          <Footer data={data} />
          <ToastContainer />
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default GlobalWrapper;
