import React from 'react';
import styled from  '@emotion/styled';

import CharackterInput from 'components/CharackterInput';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export default () =>
    <Wrapper>
        <CharackterInput />
    </Wrapper>
;