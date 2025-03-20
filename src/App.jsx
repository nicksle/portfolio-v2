import React, { useState } from 'react';
import Intro from './components/Intro/Intro';
import Work from './components/Work/Work';
import './App.css';

// Import all necessary CSS files
import './components/Work/Work.css';
import './components/Dropdown/Dropdown.css';
import './components/DropdownGroup/DropdownGroup.css';
import './components/Head/Head.css';
import './components/Body/Body.css';
import './components/WorkExperience/WorkExperience.css';
import './components/HeadNav/HeadNav.css';
import './components/DropdownStack/DropdownStack.css';

function App() {
  const [showWork, setShowWork] = useState(false);

  // Function to be passed down to HeaderFrame
  const handleWorkClick = () => {
    setShowWork(true);
  };

  return (
    <div className="App">
      <Intro onWorkClick={handleWorkClick} />
      {showWork && <Work className={`work ${showWork ? 'fade-in' : ''}`} />}
    </div>
  );
}

export default App;
