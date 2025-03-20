import React from 'react';
import './WorkExperience.css';

export const WorkExperience = () => {
  return (
    <div className="work-experience" style={{ 
      border: '5px solid red', 
      padding: '20px', 
      backgroundColor: 'white',
      fontSize: '24px',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <h1>WorkExperience Component</h1>
      <p>This is a simple test to verify WorkExperience renders</p>
      <p>If you can see this text, WorkExperience is working!</p>
    </div>
  );
};

export default WorkExperience; 