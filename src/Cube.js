import React, { useEffect, useRef, useState } from 'react';

const Cube = () => {
  React.useEffect(() => {
    // Force GPU acceleration in Firefox
    document.querySelector('.cube-wrapper').style.transform = 'translateZ(0)';
    document.querySelector('.cube').style.transform = 'translateZ(0)';
  }, []);
  const cubeRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const rotY = (mouseX / window.innerWidth - 0.5) * -200;
      const rotX = (mouseY / window.innerHeight - 0.5) * 200;

      setRotation({ x: rotX, y: rotY });
      
      const cube = cubeRef.current;
      if (cube) {
        cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="container">
      <div className="desaturated-background"></div>
      <div className="cube-wrapper">
        <div className="cube" ref={cubeRef}>
          <div className="face front">
            <div className="face-content"><h1>Front</h1></div>
          </div>
          <div className="face back">
          </div>
          <div className="face right">
            <div className="face-content"><h1>Right</h1></div>
          </div>
          <div className="face left">
            <div className="face-content"><h1>Left</h1></div>
          </div>
          <div className="face top">
            <div className="face-content"><h1>Top</h1></div>
          </div>
          <div className="face bottom">
            <div className="face-content"><h1>Bottom</h1></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cube;