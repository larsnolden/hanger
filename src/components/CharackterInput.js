import React from  'react';
import styled from  '@emotion/styled';

// set width dynamically based on char number
//    box-shadow: inset 0px 3px 6px rgba(0, 0, 0, 0.1), inset 0px 10px 20px rgba(0, 0, 0, 0.15);
export default styled.input`
    display: flex;
    width: 290px;
    padding: 0 10px 0 10px;
    background: #0061A7;
    border: 5px solid #FCFCFC;
    box-sizing: border-box;
    border-radius: 5px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 60px;
    letter-spacing: 0.2em;
    text-shadow: 0 0 0 #FCFCFC, 0px 1px 2px rgba(0, 0, 0, 0.24), 0px 1px 3px rgba(0, 0, 0, 0.12);
    outline: none;
    color: transparent;
    text-align: center;
    width: 100%;
`;
