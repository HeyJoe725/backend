import React, { useState } from 'react';

function TextInput({ placeholder, onInputChange, onEnterPress }) {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        const value = e.target.value;
        setText(value);

        if (onInputChange) {
            onInputChange(value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && onEnterPress) {
            onEnterPress(text);
            // const value = e.target.value;
            // setText(value);

            // if (onInputChange) {
            //     onInputChange(value);
            // }
        }
    };

    return (
        <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Enter text here..."}
            className="border rounded p-2"
        />
    );
}

export default TextInput;
