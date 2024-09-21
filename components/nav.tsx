// Nav.tsx
import { cn } from '@lib/utils';
import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

interface NavProps {
  currSelectedItem: string;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const Nav: React.FC<NavProps> = ({ currSelectedItem, scrollContainerRef }) => {
  const [navHeight, setNavHeight] = useState('h-[72px]');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        if (scrollContainerRef.current.scrollTop > 50) {
          setNavHeight('h-16');
        } else {
          setNavHeight('h-[72px]');
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    scroll.scrollToTop({
      containerId: 'scroll-container',
      duration: 500,
      smooth: true,
    });
  };

  const navItems = [
    { id: 'aboutme', text: 'About Me' },
    { id: 'experience', text: 'Experience' },
    { id: 'projects', text: 'Projects' },
    { id: 'get-contact', text: 'Get in Touch' },
  ];

  return (
    <div
      className={`${navHeight} transition-all duration-300 px-6 md:px-10 ease-in-out bg-[var(--bg-color-dark)] bg-opacity-100 sticky top-0 z-50 text-white`}
    >
      <div className="flex items-center justify-between h-full">
        {/* Logo or Branding */}
        <div className="text-xl font-bold" onClick={scrollToTop}>
          {"</> Bishal"}
        </div>

        {/* Desktop Navigation */}
        <nav className="space-x-4 hidden md:flex flex-row">
          {navItems.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              containerId="scroll-container"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={`hover:text-gray-300 ${
                currSelectedItem === item.id ? 'text-green-500' : 'text-white'
              }`}
            >
              <div
                className={cn(
                  'text-xl font-bold',
                  currSelectedItem === item.id ? 'text-[var(--green-500)]' : 'text-white'
                )}
              >
                {item.text}
              </div>
            </ScrollLink>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Mobile Menu Icon */}
          <div className="text-white cursor-pointer" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className={cn(
                'fixed top-0 right-0 bottom-0 bg-[var(--bg-color-dark)] z-50 overflow-hidden transition-all duration-300 ease-in-out',
                navHeight === 'h-[72px]' ? 'top-[72px]' : 'top-16'
              )}
            >
              <nav className="flex flex-col space-y-4 p-4">
                {navItems.map((item) => (
                  <ScrollLink
                    key={item.id}
                    to={item.id}
                    containerId="scroll-container"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    style={{ cursor: 'pointer' }}
                    className={`hover:text-gray-300 ${
                      currSelectedItem === item.id ? 'text-green-500' : 'text-white'
                    }`}
                    onClick={toggleMobileMenu} // Close mobile menu on item click
                  >
                    <div
                      className={cn(
                        'text-xl font-bold',
                        currSelectedItem === item.id
                          ? 'text-[var(--green-500)] translate-x-2'
                          : 'text-white'
                      )}
                    >
                      {item.text}
                    </div>
                  </ScrollLink>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
