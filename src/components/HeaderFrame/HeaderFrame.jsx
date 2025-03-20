import React, { useEffect, useState } from "react";
import "./HeaderFrame.css";

export const HeaderFrame = ({ onWorkClick }) => {
  const [mounted, setMounted] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showWorkContent, setShowWorkContent] = useState(false);
  const [activeItem, setActiveItem] = useState('logo');
  
  useEffect(() => {
    // Trigger animation on mount
    setMounted(true);
  }, []);

  // Add effect to trigger header animation after info2 animation completes
  useEffect(() => {
    let timer;
    if (showInfo2) {
      console.log("Info2 shown, waiting to show header..."); // Debug log
      // Wait for info2 animation to complete (0.8s) plus 1s delay
      timer = setTimeout(() => {
        console.log("Showing header now"); // Debug log
        setShowHeader(true);
      }, 1800);
    }
    
    return () => clearTimeout(timer);
  }, [showInfo2]);

  const handleSection6Click = () => {
    console.log("Section6 clicked"); // Debug log
    setShowInfo2(true);
  };

  const handleWorkClick = () => {
    setShowWorkContent(true);
    setActiveItem('work');
    document.querySelector('.intro').classList.add('show-work');
    onWorkClick();
  };

  const handleAboutClick = () => {
    setActiveItem('about');
  };

  const handleContactClick = () => {
    setActiveItem('contact');
  };

  return (
    <div className={`header-frame ${mounted ? 'mounted' : ''} ${showInfo2 ? 'show-info2' : ''} ${showHeader ? 'show-header' : ''} ${showWorkContent ? 'show-work' : ''}`}>
      <div className="content-container">
        <div className="info" style={{opacity: 1, visibility: 'visible'}}>
          <div className="row">
            <div className="column">
              <div className="div">
                <div className="section" />

                <div className="div-wrapper">
                  <div className="text-wrapper">Hello world!</div>
                </div>

                <div className="section-2" />
              </div>

              <div className="row-2">
                <div className="section-3" />

                <div className="section-2" />

                <div className="section-4">
                  <div className="text-wrapper">My names Nick</div>
                </div>
              </div>
            </div>

            <div className="column-2" />
          </div>

          <div className="row-3">
            <div className="section-3" />

            <div className="section-5">
              <div className="text-wrapper">Welcome to my site</div>
            </div>

            <div className="section-2" />

            <div 
              className="section-6" 
              onClick={handleSection6Click} 
              style={{cursor: 'pointer'}}
            />
          </div>
        </div>

        <div className="info-2" style={{opacity: 1, visibility: 'visible'}}>
          <div className="row-4">
            <div className="column">
              <div className="row-5">
                <div className="section-7">
                  <div className="text-wrapper">I'm a product designer</div>
                </div>

                <div className="section-2" />
              </div>

              <div className="row-2">
                <div className="section-3" />

                <div className="section-2" />

                <div className="section-8">
                  <div className="text-wrapper">queer creative,</div>
                </div>
              </div>
            </div>

            <div className="column-3" />
          </div>

          <div className="row-3">
            <div className="section-9">
              <div className="text-wrapper-2">&amp;</div>
            </div>

            <div className="section-5">
              <div className="text-wrapper">pop music enthusiast</div>
            </div>

            <div className="section-2" />

            <div className="section-2" />
          </div>

          <div className="row-3">
            <div className="section-3" />

            <div className="section-2" />

            <div className="section-6" />

            <div className="section-10">
              <div className="text-wrapper-3">based in San Francisco</div>
            </div>
          </div>
        </div>

        <header className="header" style={showHeader ? {opacity: 1, visibility: 'visible'} : {opacity: 0, visibility: 'hidden'}}>
          <div className={`logo ${activeItem === 'logo' ? 'active' : ''}`} />

          <div 
            className={`div-wrapper-2 ${activeItem === 'work' ? 'active' : ''}`}
            onClick={handleWorkClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="text-wrapper-4">Work</div>
          </div>

          <div 
            className={`div-wrapper-2 ${activeItem === 'about' ? 'active' : ''}`}
            onClick={handleAboutClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="text-wrapper-4">About</div>
          </div>

          <div 
            className={`div-wrapper-2 ${activeItem === 'contact' ? 'active' : ''}`}
            onClick={handleContactClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="text-wrapper-4">Contact</div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default HeaderFrame; 