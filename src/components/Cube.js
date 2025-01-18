import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Cube = () => {
  const cubeRef = useRef(null);
  const innerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [currentEmoji, setCurrentEmoji] = useState('👋');
  const [emojiOpacity, setEmojiOpacity] = useState(0.7);
  const [emojiFontSize, setEmojiFontSize] = useState(300);
  const animationFrameRef = useRef();
  const startTimeRef = useRef(Date.now());
  const [currentFace, setCurrentFace] = useState("front");

  const FACE_EMOJIS = useMemo(() => ({
    front: '👋',
    left: '🎨',
    right: '🛠️',
    top: '🔗',
    bottom: '💡'
  }), []);

  const handleFaceHover = (face) => {
    if (currentFace === face) return;
    setCurrentFace(face);
    setEmojiOpacity(0);
    setEmojiFontSize(100);
    setTimeout(() => {
      setCurrentEmoji(FACE_EMOJIS[face]);
      setEmojiOpacity(0.7);
      setEmojiFontSize(300);
    }, 150);
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
      if (innerRef.current) {
        innerRef.current.style.transform = `
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
      setRotation({ x: 0, y: 0 });
      setEmojiOpacity(0);
      setEmojiFontSize(100);
      setCurrentFace("front");
      setTimeout(() => {
        setCurrentEmoji(FACE_EMOJIS.front);
        setEmojiOpacity(0.7);
        setEmojiFontSize(300);
      }, 150);
    };

    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [FACE_EMOJIS]);

  return (
    <div className="container">
      <div className="desaturated-background"></div>
      <div className="cube-wrapper">
        <div className="cube font-mono justify-center align-middle" ref={cubeRef}>
          <p className="cube-inner" 
            ref={innerRef} 
            style={{
              opacity: emojiOpacity,
              fontSize: `${emojiFontSize}px`
            }}>
            {currentEmoji}
          </p>
          <div className="face front" onMouseEnter={() => handleFaceHover('front')}>
            <div className="face-content structured">
              <h1 className="">Julian Schalon</h1>
              <p>Media Developer</p>
            </div>
          </div>
          <div className="face back">
          </div>
          <div className="face right" onMouseEnter={() => handleFaceHover('right')}>
            <Link to="/projects" className="face-content"><h1>Projects</h1></Link>
          </div>
          <div className="face left" onMouseEnter={() => handleFaceHover('left')}>
            <Link to="/portfolio" className="face-content"><h1>Portfolio</h1></Link>
          </div>
          <div className="face top" onMouseEnter={() => handleFaceHover('top')}>
            <Link to="/links" className="face-content"><h1>links</h1></Link>
          </div>
          <div className="face bottom" onMouseEnter={() => handleFaceHover('bottom')}>
            <Link to="/blog" className="face-content"><h1>Blog</h1></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cube;