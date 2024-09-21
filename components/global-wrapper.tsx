'use client';
import React, { useState, useEffect, useRef } from 'react';
import Nav from './nav';
import WelcomeScreen from './welcome_screen';
import AboutMe from './aboutme';
import Experience from './experience';
import Projects from './projects';
import GetContact from './get-contact';
import Footer from './footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BackgroundBeamsWithCollision } from './bg-theme';

const GlobalWrapper: React.FC<{ data: Data }> = ({ data }) => {
  // Use a single ref to hold all section refs
  const sectionRefs = useRef<{
    home: HTMLDivElement | null;
    aboutme: HTMLDivElement | null;
    experience: HTMLDivElement | null;
    projects: HTMLDivElement | null;
    getcontact: HTMLDivElement | null;
  }>({
    home: null,
    aboutme: null,
    experience: null,
    projects: null,
    getcontact: null,
  });

  const foregroundRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [foregroundHeight, setForegroundHeight] = useState('0');
  const [currViewPortItem, setCurrViewPortItem] = useState('');

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    // Intersection Observer setup
    const options = {
      root: scrollContainerRef.current, // Use the scrollable div as the root
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
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
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
  }, [foregroundRef, scrollContainerRef]);

  return (
    <BackgroundBeamsWithCollision className='h-full md:h-full w-full md:w-full bg-gradient-to-r from-transparent to-transparent'>
      <div
        className="h-[100dvh] w-full overflow-y-scroll scrollbar-none"
        id="scroll-container"
        ref={scrollContainerRef}
      >
        <div className="w-full h-[5000px]" ref={foregroundRef}>
          <Nav currSelectedItem={currViewPortItem} scrollContainerRef={scrollContainerRef} />
          <div ref={(el) => sectionRefs.current.home = el} id="home">
            <WelcomeScreen data={data} />
          </div>
          <div ref={(el) => sectionRefs.current.aboutme = el} id="aboutme">
            <AboutMe data={data} />
          </div>
          <div ref={(el) => sectionRefs.current.experience = el} id="experience">
            <Experience data={data} />
          </div>
          <div ref={(el) => sectionRefs.current.projects = el} id="projects">
            <Projects data={data} />
          </div>
          <div ref={(el) => sectionRefs.current.getcontact = el} id="get-contact">
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
