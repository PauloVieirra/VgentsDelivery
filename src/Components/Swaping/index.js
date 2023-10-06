import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Swaper = () => {
  const [currentScreen, setCurrentScreen] = useState(1);

  const screenContents = {
    1: <div>
        <h1 style={{ color: 'white' }}>Tela 1</h1>
        </div>,
    2: <h1 style={{ color: 'white' }}>Tela 2</h1>,
  };

  const props = useSpring({
    transform: `translateX(-${(currentScreen - 1) * 50}%)`,
    from: { transform: `translateX(-${(currentScreen * 100) - 1}%)` },
  });

  const handleDotClick = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100vh' }}>
      <animated.div
        style={{
          width: '200%',
          height: '100%',
          display: 'flex',
          transform: props.transform,
        }}
      >
        {[1, 2].map((screen) => (
          <div
            key={screen}
            style={{
              flex: '50%',
              height: '100%',
              backgroundColor: screen === currentScreen ? 'lightblue' : 'lightgreen',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {screenContents[screen]}
          </div>
        ))}
      </animated.div>
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        {[1, 2].map((screen) => (
          <div
            key={screen}
            onClick={() => handleDotClick(screen)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentScreen === screen ? 'black' : 'white',
              margin: '0 5px',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Swaper;
