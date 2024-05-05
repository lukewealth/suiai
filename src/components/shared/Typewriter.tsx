// Typewriter.tsx
import React, { useEffect, useState } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number; // Speed in milliseconds
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100 }) => {
    const [printedText, setPrintedText] = useState('');

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            setPrintedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) clearInterval(timer);
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return (
        <div className="typewriter special-text">
            {printedText}
            <span className="cursor">|</span>
        </div>
    );
};

export default Typewriter;
