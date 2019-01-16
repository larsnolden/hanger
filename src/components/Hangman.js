import React from 'react';

import { ReactComponent as Stage1 } from 'assets/hangman/stage1.svg';
import { ReactComponent as Stage2 } from 'assets/hangman/stage2.svg';
import { ReactComponent as Stage3 } from 'assets/hangman/stage3.svg';
import { ReactComponent as Stage4 } from 'assets/hangman/stage4.svg';
import { ReactComponent as Stage5 } from 'assets/hangman/stage5.svg';


export default ({
    stage,
}) => {
    switch(stage) {
        case 1: 
            return  <Stage1 />;
        case 2: 
            return <Stage2/>;
        case 3: 
            return <Stage3/>;
        case 4: 
            return <Stage4/>;
        case 5:
            return <Stage5/>;
        default:
            return <div/>
    }
}
   
;