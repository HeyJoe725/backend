import React, { useEffect, useRef } from 'react';

const Runner = ({ averageCadence }) => {
    const spriteRef = useRef(null);
    const frameHeight = 852;  // height of each frame
    const totalFrames = 8;
    let frame = 0;

    useEffect(() => {
        function animateSprite() {
            const offset = frame * frameHeight;
            spriteRef.current.style.backgroundPosition = `0px -${offset}px`; // Move the background position  spriteRef.current.style.backgroundPosition = `-${offset}px 0px`;

            frame = (frame + 1) % totalFrames;  // Cycle through the frames
        }
        const intervalTime = averageCadence ? (1000000 / (averageCadence * 45)) : 400;

        // Set an interval to change frames every 300ms
        const intervalId = setInterval(animateSprite, intervalTime);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [averageCadence]);

    const spriteStyles = {
        width: '1000px',
        height: `${frameHeight}px`,
        backgroundImage: 'url("/images/running.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `1000px ${frameHeight * totalFrames}px`, // Ensure the entire sprite sheet height is accounted for
        transform: 'scale(0.2)', // scale down to 50%
        transformOrigin: '0 0'  // Set the origin of transformation to top left corner
    };

    return <div style={spriteStyles} ref={spriteRef}></div>;
};

export default Runner;
