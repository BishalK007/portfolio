// PageRevealAnimation.jsx
import React from 'react';
import './page_reveal.css'; // Make sure to create this CSS file
import { cn } from '@lib/utils';

const PageRevealAnimation = () => {
  return (
    <div className={
        cn(
            "page-reveal-container absolute z-[9999] h-full w-full flex items-center justify-center overflow-hidden",
        )
    }>
      <span className="letter letter-b">B</span>
      <span className="letter letter-k">K</span>
    </div>
  );
};

export default PageRevealAnimation;
