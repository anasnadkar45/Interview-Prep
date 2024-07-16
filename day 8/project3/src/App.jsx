import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [convertedText, setConvertedText] = useState('');
  const [text, setText] = useState('');

  function handleRadioChange(e) {
    const convertTo = e.target.value
    if(convertTo === 'touppercase'){
      const newText = text.toUpperCase();
      console.log(newText)
      setConvertedText(newText);
    }
    if(convertTo === 'encodebase64'){
      const newText = btoa(text);
      setConvertedText(newText);
    }
    if(convertTo === 'decodebase64'){
      const newText = atob(text);
      setConvertedText(newText);
    }
  }

  return (
    <>
      <form className='text_converter_form'>
        <label htmlFor="text">Text to be conveted</label>
        <input
          type="text"
          placeholder='Enter a text'
          onChange={(e)=>{
            e.preventDefault();
            setText(e.target.value);
          }}
        />
        <label htmlFor="text">
          <input
            type="radio"
            value={"touppercase"}
            name="convertTo"
            onChange={handleRadioChange}
          />
          Convert to Uppercase
        </label>
        <label htmlFor="text">
          <input
            type="radio"
            value={"encodebase64"}
            name="convertTo"
            onChange={handleRadioChange}
          />
          Convert to encodebase64
        </label>
        <label htmlFor="text">
          <input
            type="radio"
            value={"decodebase64"}
            name="convertTo"
            onChange={handleRadioChange}
          />
          Convert to decodebase64
        </label>
      </form>
      <div>
        <h2>Converted Text is:</h2>
        <div>
          <p>{convertedText}</p>
        </div>
      </div>
      
    </>
  )
}

export default App
