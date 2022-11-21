import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Game.css";
import HangmanPicture from "./HangmanPicture";
import Words from "./Words";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !secretWord.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = secretWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const getWord = () => {
    axios
      .get(`https://random-word-form.herokuapp.com/random/noun`)
      .then((res) => {
        const word = res.data;
        setSecretWord(word[0]);
      });
  };

  useEffect(() => {
    getWord();
  }, []);

  const addGuessedLetter = useCallback(
    (letter) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, addGuessedLetter]);

  const resetGame = () => {
    setGuessedLetters([]);
    getWord();
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Hangman</h1>
        <p>Find the hidden word - Enter a letter using keyboard</p>
      </div>
      <div className="hangman">
        <HangmanPicture numberOfGuesses={incorrectLetters.length} />
        <p hidden={isWinner || isLoser || incorrectLetters.length === 0}>
          Wrong letters: <span>{incorrectLetters + ""}</span>
        </p>
        {isWinner && (
          <div className="end-game">
            <p>
              Congratulations! <span id="win">You WON!</span>
            </p>
            <button onClick={resetGame}>TRY AGAIN!</button>
          </div>
        )}
        {isLoser && (
          <div className="end-game">
            <p>
              Unfortunately you lost...the word was: <span>{secretWord}</span>
            </p>
            <button onClick={resetGame}>TRY AGAIN!</button>
          </div>
        )}
      </div>

      <Words secretWord={secretWord} guessedLetters={guessedLetters} isWinner={isWinner} />
    </div>
  );
}

export default App;
