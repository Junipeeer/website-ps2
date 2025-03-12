import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';

const EmojiBlob = ({ emoji, ref }) => {
  return (
    <div className="emoji-wrapper" ref={ref} style={{transform: `scaleX(${ref})`}}>
      <AnimatePresence mode="wait">
        <m.p
          key={emoji}
          className="emoji-blob"
          initial={{ 
            opacity: 0,
            scaleY: 0.7,
            scaleX: 0.5
          }}
          animate={{ 
            opacity: 0.7,
            scaleY: 1,
            scaleX: 1,
            transition: {
              duration: 0.1,
              type: "spring",
              stiffness: 200,
              mass: 2,
              damping: 15,
              opacity: {
                type: "tween"
              }
            }
          }}
          exit={{ 
            opacity: 0,
            scaleX: 0.8,
            transition: { duration: 0.15 }
          }}
        >
          {emoji}
        </m.p>
      </AnimatePresence>
    </div>
  );
};

export default EmojiBlob;