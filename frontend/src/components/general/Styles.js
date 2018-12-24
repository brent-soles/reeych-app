import React from 'react';
import styled from '@emotion/styled';

export const CardContainerLayout = styled.div`
    position: relative;
    width: 53rem;
    height: calc(100vh - 5rem);
    background-color: rgba(255, 255, 255, .3);
    box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.25);
    margin: 2.5rem auto;
    border-radius: 2rem;

    grid-template-columns: 60rem;
    grid-template-rows: repeat(minmax(30rem, 80rem));

    overflow-y: scroll;
`;

export const CardLayout = styled.div`
    grid-row: 1;
    grid-column: 1;
    width: 46rem;
    height: 18rem;
    margin: 1.5rem;
    border-radius: 2rem;
    padding: 2rem;
    
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
`;

export const ExpandedCardLayout = styled.div`
    grid-row: 1;
    grid-column: 1;
    display: ${props => !props.show ? 'block' : 'none'};
    width: 46rem;
    height: 60rem;
    margin: 1.5rem;
    border-radius: 2rem;
    padding: 2rem;
    
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
`;

export const H1 = styled.h1`
    font-family: Nunito;
    font-size: 3.6rem;
`;

export const H2 = styled.h2`
    font-family: Nunito, sans-serif;
    font-weight: 300;
    font-size: 2.4rem;
`;

export const P = styled.p`
    font-family: Nunito, sans-serif;   
    font-size: 1.8rem;
`;


export const PrimaryButtonStyled = styled.button`
    background-color: rgba(0, 184, 158, 1);
    border-radius: .2rem;
    color: white;

    font-family: Nunito, sans-serif;
    font-size: 2.4rem;
    padding: 1rem;
`;