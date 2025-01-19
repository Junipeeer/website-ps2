import React, { useEffect, useRef, useState, useMemo} from 'react'
import {Link} from 'react-router-dom';
import {motion as m} from 'framer-motion'
import EmojiBlob from './EmojiBlob'

const Cube = () => {
  const cubeRef = useRef(null);
  const emojiRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef();
  const startTimeRef = useRef(Date.now());
  const [currentFace, setCurrentFace] = useState("👋");
  const FACE_EMOJIS = useMemo(() => ({
    front: '👋',
    left: '🎨',
    right: '🛠️',
    top: '🌐',
    bottom: '💡',
    clocks: ['🕛', '🕧', '🕐', '🕜', '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕡', '🕖', '🕢', '🕗', '🕣', '🕘', '🕤', '🕙', '🕥', '🕚', '🕦']
  }), []);

  const handleFaceHover = (face) => {
    if (currentFace === face) return;
    setCurrentFace(FACE_EMOJIS[face]);
  };
  
  // Continuous idle animation
  useEffect(() => {
    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const translateY = Math.sin(elapsed) * 20;
      const idleRotX = Math.sin(elapsed * 0.5) * 5;
      const idleRotY = Math.cos(elapsed * 0.3) * 5;
      const idleRotZ = Math.sin(elapsed * 0.7) * 2;

      if (cubeRef.current) {
        cubeRef.current.style.transform = `
          translateY(${translateY}px)
          rotateX(${rotation.x + idleRotX}deg)
          rotateY(${rotation.y + idleRotY}deg)
          rotateZ(${idleRotZ}deg)
        `;
      }
      if (emojiRef.current) {
        emojiRef.current.style.transform = `
          translateY(${translateY}px)
          rotateY(${-(rotation.y + idleRotY)}deg)
          rotateX(${-(rotation.x + idleRotX)}deg)
          rotateZ(${-idleRotZ}deg)
        `;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [rotation]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const cubeSize = Math.min(500, window.innerHeight * 0.8);
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const distanceFromCubeX = (mouseX - centerX) / (cubeSize / 2);
      const distanceFromCubeY = (mouseY - centerY) / (cubeSize / 1.5);

      const maxRotation = 80;
      const exponent = 0.7;

      const rotY = -Math.sign(distanceFromCubeX) * Math.min(
        Math.pow(Math.abs(distanceFromCubeX), exponent) * maxRotation,
        maxRotation
      );
      
      const rotX = Math.sign(distanceFromCubeY) * Math.min(
        Math.pow(Math.abs(distanceFromCubeY), exponent) * maxRotation,
        maxRotation
      );

      setRotation({ x: rotX, y: rotY });
    };
    
    const handleMouseLeave = (e) => {
      updateClockFace();
    };

    const updateClockFace = () => {
      let date = new Date();
      let hour = date.getHours() % 12;
      let minutes = date.getMinutes();
      if (minutes >= 30) {
        minutes = 1;
      } else {
        minutes = 0;
      }
      let clkIndex = hour * 2 + minutes;
      setRotation({ x: 0, y: 0 });
      if (currentFace === FACE_EMOJIS.clocks[clkIndex]) return;
      setCurrentFace(FACE_EMOJIS.clocks[clkIndex]);
    };

    // Calculate time until next minute
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Initial timeout to sync with minute change
    const initialTimeout = setTimeout(() => {
      updateClockFace();
      // After initial sync, update every minute
      const clockInterval = setInterval(updateClockFace, 60000);
      
      // Store interval ID for cleanup
      return () => clearInterval(clockInterval);
    }, msUntilNextMinute);

    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(initialTimeout);
    };
  }, [FACE_EMOJIS, currentFace]);

  return (
    <div className="container">
      <div className="desaturated-background"></div>
      <m.div className="cube-wrapper"
        animate={{translateY: 0, scale: 1 }}
        transition={{delay: 0.2, duration: 0.7, ease: "easeOut"}}
        exit={{translateY: "100%", scale: 0.1 }}
      >
        <div className="cube font-mono justify-center align-middle" ref={cubeRef}>
          <EmojiBlob ref={emojiRef} emoji={currentFace} />
          <div className="face front" onMouseEnter={() => handleFaceHover('front')}>
            <div className="face-content structured">
              <h1 className="">Julian Schalon</h1>
              <p>Media Developer</p>
            </div>
          </div>
          <div className="face back">
          </div>
          <div className="face right" onMouseEnter={() => handleFaceHover('right')}>
            <Link className="face-content" to="/projects"><h1>Projects</h1></Link>
          </div>
          <div className="face left" onMouseEnter={() => handleFaceHover('left')}>
            <Link className="face-content" to="/portfolio"><h1>Portfolio</h1></Link>
          </div>
          <div className="face top" onMouseEnter={() => handleFaceHover('top')}>
            <Link className="face-content" to="/links"><h1>Links</h1></Link>
          </div>
          <div className="face bottom" onMouseEnter={() => handleFaceHover('bottom')}>
            <Link className="face-content" to="/blog"><h1>Blog</h1></Link>
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default Cube;