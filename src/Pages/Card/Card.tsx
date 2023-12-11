import React, { useState } from 'react';

export default function Card() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const getRandomChar = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);

  const transformText = (text) => {
    return text
      .split('')
      .map(() => getRandomChar())
      .join('');
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    const transformedText = transformText(newText);
    setOutputText(transformedText);
  };

  return (
    <div>
      <input type='text' value={inputText} onChange={handleInputChange} placeholder='Enter text' />
      <div>
        <h3>Шифрование:</h3>
        <pre>{outputText}</pre>
        <pre>{inputText}</pre>
      </div>
    </div>
  );
}
