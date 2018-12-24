import React from 'react';
import { CardLayout, H1, H2, P } from './Styles';

const Card = (props) => (
    <CardLayout id={`${props.id}`}>
        <H1>{props.title}</H1>
        <img src="/051-user.svg" style={{display: "inline-block"}} width="40px" height="40px"></img>
        <span style={{display: "inline-block"}}><H2>{props.author} | {props.date}</H2></span>
        <P>Hey, we are meeting at X @ 7:00 PM. Bring a friend, and don't forget to reach out if you have any questions!</P>
        <div>
            <button>Notes</button>
            <button>Questions</button>
            <button>Share</button>
        </div>
    </CardLayout>
)

export default Card;
