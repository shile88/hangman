import React from "react";
import "../assets/styles/Words.css";

const Words = ({ secretWord, guessedLetters, isWinner }) => {
 
  return (
    <div className="words">
      {secretWord.split("").map((letter, index) => (
        <span className="word" key={index}>
          <span style={{visibility: guessedLetters.includes(letter) ? 'visible' : 'hidden', color: isWinner ? "green" : ""}}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Words;
