import React from 'react';
import styled from  '@emotion/styled';

import CharackterInput from 'components/CharackterInput';
import Hangman from 'components/Hangman';

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

const Text = styled.div`

`;

export default () =>
    <Wrapper>
        <Heading>
            Hanger
        </Heading>
        <Hangman stage={5} />
        <CharackterInput value="start" />
    </Wrapper>
;