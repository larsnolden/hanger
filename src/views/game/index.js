import React, {
    useEffect,
    useReducer,
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

const gameLost = styled.div`
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

const ScoreText = styled.div`
    color: #FCFCFC;
    font-family: Roboto;
    font-weight: 900;
    font-size: 36px;
    letter-spacing: 0.05em;
    user-select: none;
    text-align: center;
`;

const WinText = styled.div`
    color: #04C19A;
    font-family: Roboto;
    font-weight: 900;
    font-size: 48px;
    letter-spacing: 0.05em;
    user-select: none;
    text-align: center;
`;

const LossText = styled.div`
    color: #C34034;
    font-family: Roboto;
    font-weight: 900;
    font-size: 48px;
    letter-spacing: 0.05em;
    user-select: none;
`;

const getRandomWord = () => possibleWords.words[Math.floor(Math.random() * Math.floor(possibleWords.words.length))];
const myStorage = window.localStorage;

const initialState = {
    hangmanCount: 0,
    gameStatus: 'initial',
    highScore: 0,
    inputValue: 'Click to start',
    searchedWord: '',
    currentScore: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'setHangmanCount':
            return { ...state, hangmanCount:  action.value };
        case 'setGameStatus':
            return { ...state, gameStatus: action.value };
        case 'setHighscore':
            return { ...state, highScore: action.value };
        case 'setInputValue':
            return { ...state, inputValue: action.value };
        case 'setSearchedWord':
            return { ...state, searchedWord: action.value };
        case 'increaseCurrentScore':
            return { ...state, currentScore: state.currentScore + 1 };
        case 'resetGameState':
            return { ...initialState, highScore: state.highScore, gameStatus: state.gameStatus };
        case 'resetGameStateContinue':
            return { ...initialState, highScore: state.highScore, currentScore: state.currentScore, gameStatus: state.gameStatus };
        default:
            return state;
    }
}

const GameDisplay = ({ status, ...restProps }) => {
    switch (status) {
        case 'running': 
            return <Hangman stage={restProps.hangmanCount} />;
        case 'win':
            return <WinText>Awesome!<br/> keep going</WinText>;
        case 'newHighscore':
            return <WinText>!!! New High Score!!!</WinText>;
        case 'loss':
            return <LossText>Game Over</LossText>;
        default:
            return <div />
    }
}

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const dispatcher = (type, value) => dispatch({ type, value })

    //  load highscore form local storage
    useEffect(() => {
        if (!state.highScore) {
            const localStorageHighscore = myStorage.getItem('highscore');
            dispatcher('setHighscore', localStorageHighscore);
        }
    });

    function handleUserInput(char) {
        if (state.gameStatus === 'running') {
            //  check if char is correct and was not entered yet
            if (state.searchedWord.includes(char) && !state.inputValue.includes(char)) {
                let matchingIndices = state.searchedWord.split('').map((currentChar, index) => {
                    if (currentChar === char) return index
                });

                let newInputValue = state.inputValue
                    .split('')
                    .map((currentChar, index) => {
                        if (matchingIndices.includes(index)) return state.searchedWord[index];
                        return currentChar;
                    })
                    .join('');
                // let newInputValue = state.inputValue
                //     .split('')
                //     .map((existingChar, index) => state.searchedWord.indexOf(char) === index ? char : existingChar).join('');
                dispatcher('setInputValue', newInputValue);

                if (state.searchedWord === newInputValue) {
                    //  win
                    if (state.currentScore + 1 >= state.highScore) {
                        myStorage.setItem('highscore', state.currentScore + 1);
                        dispatcher('setGameStatus', 'newHighscore')
                    } else dispatcher('setGameStatus', 'win');
                    //  reset state, except for current Score, highScore and gameStatus
                    dispatcher('increaseCurrentScore');
                    dispatcher('resetGameStateContinue');
                }
            } else {
                const newHangmanCount = state.hangmanCount + 1;
                dispatcher('setHangmanCount', newHangmanCount) ;

                if (state.hangmanCount + 1 > 5) {
                    //  loose
                    dispatcher('setGameStatus', 'loss');
                    dispatcher('resetGameState');
                }
            }
        }
    }

    function startGame() {
        dispatcher('setGameStatus', 'running');
        const searchedWord = getRandomWord();
        dispatcher('setSearchedWord', searchedWord);
        dispatcher('setInputValue', [...Array(searchedWord.length)].map(() => "_").join(''));
        console.log(`͠≖ ͜ʖ͠≖) `, searchedWord);
    }

    return (
        <Wrapper>
            <Heading>
                Hanger
            </Heading>
            <ScoreText>
                Highscore: {state.highScore}
            </ScoreText>
            <ScoreText>
                Current Streak: {state.currentScore}
            </ScoreText>
            <GameContainer>
                <GameDisplay  status={state.gameStatus} hangmanCount={state.hangmanCount} />
                <CharacterInput
                    onKeyPress={evt => handleUserInput(evt.key)}
                    value={state.inputValue}
                    onClick={startGame} />
            </GameContainer>
        </Wrapper>
    );
};
