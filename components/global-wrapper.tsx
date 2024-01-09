'use client'
import React, { useState, useEffect, useRef } from 'react';
import Nav from './nav';
import WelcomeScreen from './welcome_screen';
import AboutMe from './aboutme';
import Experience from './experience';
import Projects from './projects';
import GetContact from './get-contact';
import Footer from './footer';
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { CardItem } from './re_usable/card/project_card';

const GlobalWrapper: React.FC<{ data: Data }> = ({ data }) => {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    aboutme: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    getcontact: useRef<HTMLDivElement>(null),
  };
  
  const [currViewPortItem, setCurrViewPortItem] = useState('');

  useEffect(() => {
    // console.log(currViewPortItem)
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.4, // When 60% of the element is visible
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

    return () => {
      // Cleanup observer on component unmount
      observer.disconnect();
    };
  }, [sectionRefs]);

  return (
    <div>
      <Nav currSelectedItem={currViewPortItem} />
      {/* <Carousel
            opts={{
                align: "center",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 2000,
                })
            ]}
            className="w-[500px]"
        >
            <CarouselPrevious />
            <CarouselContent>
                {Array.from(data).map((_, index) => (
                    <CarouselItem
                        key={index}
                        style={{
                            width: '500px',
                            marginRight: '10px',
                            // backgroundColor: 'lightgrey',
                            display: 'inline-block',

                        }}
                    >
                        <div className='py-[10px]'>
                            <CardItem
                                height={
                                    500
                                }
                                projectName={"hello"}
                                aboutProject={"hi"}
                                imgSrc={""}
                                techStack={["1", "2"]}
                                url={""}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
        </Carousel> */}
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
  );
};

export default GlobalWrapper;
