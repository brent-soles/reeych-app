import React, { useState } from 'react';
import BtnRender from './general/Buttons';
import { PrimaryButtonStyled } from './general/Styles';
import { CardLayout, ExpandedCardLayout, H1, H2, P } from './general/Styles';
import styled from '@emotion/styled';

const Card = (props) => (
    <CardLayout id={`${props.id}`}>
        <H1>{props.title}</H1>
        <img src="/051-user.svg" style={{display: "inline-block"}} width="40px" height="40px"></img>
        <span style={{display: "inline-block"}}><H2>{props.author} | {props.date}</H2></span>
        <P>Hey, we are meeting at X @ 7:00 PM. Bring a friend, and don't forget to reach out if you have any questions!</P>
        <div>
            {Object.keys(props.meta).map((o, i) => {
                console.log("o: " + o);
                return (
                    <button key={i} 
                        onClick={(e) => {
                            e.preventDefault();
                            props.setExpand({on: !props.on})
                        }}
                    >{o}</button>
                )
            })}
        </div>
    </CardLayout>
)

const ExpandedCard = (props) => (
    <ExpandedCardLayout show={props.show}>

    </ExpandedCardLayout>
)

const StyledDiv = styled.div`
    display: grid;
`;


const FullCard = (props) => {

    const [expand, setExpand] = useState({on: false})

    return (
        <StyledDiv className={`${props.id}`}>
            <ExpandedCard show={expand.on} />
            <Card setExpand={setExpand} on={expand.on} {...props}/>
        </StyledDiv>
    )
}

export default FullCard;
