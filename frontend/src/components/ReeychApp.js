import React, { useState } from 'react';
import styled from '@emotion/styled';

/**
 * Import user components
 */
import { CardContainerLayout, CardLayout } from './general/Styles';
import FullCard from './Card';

const MainDiv = styled.div`
    width: 100%;
    height: 100vh;
    // background-color: rgba(168, 246, 209, 1);
    background-color: rgba(0, 184, 158, 1);
    position: absolute;

`;


const ReeychApp = (props) => {
    const [state, setState] = useState({
        data: "~shrug~"
    })

    return (
        <MainDiv>
            <CardContainerLayout>
                <FullCard 
                    author="Brent" 
                    title="TITTTLLLLEEE" 
                    date="12/12/12" 
                    meta={{
                        details: "deets",
                        questions: "ques",
                        notes: "notes"
                    }}
                />
                <FullCard 
                    author="Bnert" 
                    title="TLLEEE" 
                    date="12/13/12" 
                    meta={{
                        details: "asdfasdeets",
                        questions: "ques",
                        notes: "notes"
                    }}
                />
            </CardContainerLayout>
        </MainDiv>
    )
}

export default ReeychApp;