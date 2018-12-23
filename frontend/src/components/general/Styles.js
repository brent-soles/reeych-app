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
    width: 46rem;
    height: 18rem;
    margin: 1.5rem auto;
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

