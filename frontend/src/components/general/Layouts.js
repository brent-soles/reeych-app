import React from 'react';
import { CardLayout, H1, H2 } from './Styles';

const Card = (props) => (
    <CardLayout id={`${props.id}`}>
        <H1>{props.title}</H1>
        <H2>( ~_~ ) {props.author} | {props.date}</H2>
        <span></span>
    </CardLayout>
)

export default Card;
