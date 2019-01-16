import React, {
    useEffect,
    useState,
  } from 'react';
import styled from '@emotion/styled';

import CharacterInput from 'components/CharacterInput';
import Hangman from 'components/Hangman';

import possibleWords from 'assets/possibleWords';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #0061A7;
    height: 100vh;
    align-items: center;
`;

const Heading = styled.div`
    font-family: Roboto;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 0.05em;
    color: #D3F9F2;
    margin-top: 20px;
    user-select: none;
`;

const GameOver = styled.div`
    color: #C34034;
    font-family: Roboto;
    font-weight: 900;
    font-size: 48px;
    letter-spacing: 0.05em;
    user-select: none;
`;

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    justify-content: space-around;
`;

const getRandomWord = () => possibleWords.words[Math.round(Math.random(possibleWords.words.length))];

export default () => {
    const [hangmanCount, setHangmanCount] = useState(0);
    const [searchedWord, setSearchedWord] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [userFocused, setUserFocused] = useState(false);

    //  asynchronously update state
    useEffect(() => {
        if(!gameOver && !gameWon) {
            if(!userFocused) setInputValue('click to start');
            if(!searchedWord) setSearchedWord(getRandomWord);
            if(userFocused && inputValue.length !== searchedWord.length) {
                setInputValue([...Array(searchedWord.length)].map(() => "_").join(''));
            }
        } else if (gameOver) {
            setInputValue('Game Over');
        } else if (gameWon) {
            setInputValue('You Won!');
        }
    })

    useEffect(() => {
        console.log(searchedWord, inputValue, searchedWord == inputValue)
        if ((hangmanCount < 5) &&  userFocused && (searchedWord == inputValue)) setGameWon(true);
        if (hangmanCount >= 5) setGameOver(true);
        console.log(gameWon)
    });

    function handleUserInput(char) {
        if (!gameOver && !gameWon) {
            if (searchedWord.includes(char)) {
                let charIndex = searchedWord.indexOf(char);
    
                //  replace underscore with guessed char
                let newInputValue = inputValue.split('').map((existingChar, index  )=> charIndex  === index ? char : existingChar).join('');  
                setInputValue(newInputValue);
            } else if (!searchedWord.includes(char)) {
                setHangmanCount(hangmanCount + 1);
            }
        }
    }

    return (
        <Wrapper>
            <Heading>
                Hanger
            </Heading>
            <GameContainer>
                <Hangman stage={hangmanCount} /> 
                <CharacterInput
                        gameWon={gameWon}
                        gameOver={gameOver}
                        onKeyPress={evt => handleUserInput(evt.key)}
                        value={inputValue} 
                        onClick={() => setUserFocused(true)}/>
            </GameContainer>
        </Wrapper>
    );
};
