import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Translate() {
    const [inputText, setInputText] = useState('test');
    const [language, setLanguage] = useState('en');
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [outputText, setOutputText] = useState('Translated text!');
    const [languages, setLanguages] = useState([]);

    const getSourceLanguage = () => {
        console.log("Input text: ");
        console.log(inputText);
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText
        })
            .then((response) => {
                setSourceLanguage(response.data[0].language)
                // console.log("Output" + sourceLanguage);
            })
    }

    useEffect(() => {
        axios.get(`https://libretranslate.de/languages`)
            .then((response) => {
                setLanguages(response.data);
            })
    }, [])

    const translate = () => {
        getSourceLanguage();
        let data = {
            q: inputText,
            source: sourceLanguage,
            target: language
        }
        console.log(data);
        axios.post(`https://libretranslate.de/translate`, data)
            .then((response) => {
                setOutputText(response.data.translatedText)
                // console.log(outputText);
            })
    }

    return (
        <div className="translate-main">
            <h1 id="header"> Pocket Translator </h1>
            <div id="language-div">
                <label htmlFor="languages" id="language-select-label">Language:</label>
                <select name="languages" id="language-select" onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en" >English </option>
                    {languages.map((language) => {
                        if (language.code != "en") {
                            return (
                                <option value={language.code}>
                                    {language.name}
                                </option>
                            )
                        }
                    })}
                </select>
            </div>
            <br></br>
            <textarea placeholder="Start typing..." className='textbox' id="input" onChange={(e) => setInputText(e.target.value)}></textarea>
            <div className='textbox' id="output"> {outputText} </div>
            <button onClick={translate} id="translate"> Translate </button>
        </div>
    )
}