// src/components/TextToggle.js
import React, { useState } from 'react';

function TextToggle() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div id='about' className="max-w-5xl mx-auto">
      <p className='mb-3'>
        Libhub stands for Library Hub. This is an innovative improvement to the schools library system, designed to enhance students learning experience. It simplifies the search for academic resources, making it easier to find relevant materials.
      </p>
      <p className={`${isExpanded ? '' : 'line-clamp-1'}`}>
        And we are BoyFốur from team 4 JS Club. Our project, Libhub, simplifies resource searching and provides a virtual library simulation, making it easier for students to access and explore academic materials. We aim to optimize UI/UX to make the library more user-friendly and interesting.
      </p>

      <button 
        onClick={toggleText} 
        className="text-blue-500 hover:underline hover:underline-offset-1 text-base"
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
}

export default TextToggle;
