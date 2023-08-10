import React, { useEffect, useRef } from 'react';

const Runner = () => {
    const spriteRef = useRef(null);
    const frameWidth = 500;
    const totalFrames = 6;
    let frame = 0;

    useEffect(() => {
        function animateSprite() {
            const offset = frame * frameWidth;
            spriteRef.current.style.backgroundPosition = `-${offset}px 0px`;

            frame = (frame + 1) % totalFrames; // Cycle through the frames
        }

        // Set an interval to change frames every 200ms (adjust as needed)
        const intervalId = setInterval(animateSprite, 200);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const spriteStyles = {
        width: `${frameWidth}px`,
        height: '852px', // Use the actual height of each frame in the sprite sheet
        backgroundImage: 'url("/images/running_sprite_sheet.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${frameWidth * totalFrames}px 852px`, // Ensure the entire sprite sheet width is accounted for
        transform: 'scale(0.5)', // Scale down to 50%
        transformOrigin: '0 0' // Set the origin of transformation
    };


    return <div style={spriteStyles} ref={spriteRef}></div>;
};

export default Runner;
