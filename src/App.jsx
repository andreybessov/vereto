import React, { useState } from 'react';
import AboutSection from './components/AboutSection';
import AnimationSection from './components/AnimationSection';
import Header from './components/Header'
import HeroSection from './components/HeroSection';
import PicassoSection from './components/PicassoSection';
import CaseSection from './components/CaseSection'
import ContactSection from './components/ContactSection'
import ProjectSection from './components/ProjectSection'
import Footer from './components/Footer'
import AdvantagesSection from './components/AdvantagesSection';

function App() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
      setIsHovered(true);
  };

  const handleMouseLeave = () => {
      setIsHovered(false);
  };


  return (
    <div className='content'>
    <Header />
    <main>
      <HeroSection/>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <AboutSection />
            </div>
      <AnimationSection isHovered={isHovered}/>
      <ProjectSection />
      <PicassoSection/>
      <CaseSection />
      <AdvantagesSection/>
      <ContactSection />
    </main>
      <Footer />
    </div>
  );
}

export default App;
