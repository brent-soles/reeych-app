import React, { useState } from 'react';
import styled from '@emotion/styled';

/**
 * Import user components
 */
import { CardContainerLayout, CardLayout } from './general/Styles';
import Card from './general/Layouts';

const MainDiv = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgba(168, 246, 209, 1);
    position: absolute;

`;


const ReeychApp = (props) => {
    const [state, setState] = useState({
        data: "~shrug~"
    })

    return (
        <MainDiv>
            <CardContainerLayout>
                <Card author="Brent" title="TITTTLLLLEEE" date="12/12/12" />
                <CardLayout />
                <CardLayout />
                <CardLayout />
                <CardLayout />
                <CardLayout />
                <CardLayout />
                <CardLayout />
            </CardContainerLayout>
        </MainDiv>
    )
}

export default ReeychApp;