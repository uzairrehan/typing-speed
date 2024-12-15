"use client";

import React, { useRef, useState, useEffect } from "react";

const sentences = [
  "Learning JavaScript opens up many opportunities in web development.",
  "React and Next.js are powerful tools for building modern web applications.",
  "Backend development with Node.js allows for scalable server-side solutions.",
  "Animations in frontend development make websites more interactive and engaging.",
  "Firebase Authentication simplifies user login and management processes.",
];

function Home() {
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentSentence, setCurrentSentence] = useState("");
  const [userText, setUserText] = useState("");
  const [score, setScore] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isTyping && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isTyping]);

  const startTest = () => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    
    setCurrentSentence(randomSentence);
    setIsTyping(true);
    setStartTime(Date.now());
    setUserText("");
    setScore("");
  };

  const endTest = () => {
    const timeTaken = (Date.now() - startTime) / 1000; 
    const wordsTyped = userText.trim().split(" ").length;
    const speed = Math.round((wordsTyped / timeTaken) * 60);

    setScore(`You typed at ${speed} WPM. Words: ${wordsTyped}, Time: ${timeTaken.toFixed(2)}s`);
    setIsTyping(false);
    setCurrentSentence("");
  };

  return (
    <div className="main-body">
      <h2>Typing Speed Test</h2>
      <p id="showSentence">{currentSentence}</p>
      <div className="typing_section">
        <textarea
          id="textarea"
          ref={textareaRef}
          disabled={!isTyping}
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="Start typing here..."
        ></textarea>
        <button id="btn" onClick={isTyping ? endTest : startTest}>
          {isTyping ? "Done" : "Start"}
        </button>
      </div>
      <p id="score">{score}</p>
    </div>
  );
}

export default Home;
