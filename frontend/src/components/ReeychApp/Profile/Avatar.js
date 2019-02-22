import React, { useState } from 'react';
import { Redirect } from '@reach/router';
import { SECONDARY } from '../../SharedComponents/Styles/Colors';
import styled from '@emotion/styled';

import headShot from './brent-mq.jpg'

const xySize = 8;

function Img ( props ) {
  const ImgStyle = styled.div`
    height: ${xySize}rem;
    width: ${xySize}rem;
    margin: auto;
    border: .5rem solid rgba(${SECONDARY}, 1);
    border-radius: ${xySize}rem;
    transition: .3s;

    &:hover {
      height: ${xySize + 2}rem;
      width: ${xySize + 2}rem;
      border: .3rem solid rgba(${SECONDARY}, .4);
      box-shadow: 0rem 0.15rem 1rem rgb(0, 0, 0, .3);
    }
  `
  return <ImgStyle {...props} />;
}


function Avatar({ name, emails, memberships, cards }) {

  // if(typeof props !== typeof {}){
  //   return null;
  // }
  const [showDetails, setShowDetails] = useState(false);
  const [redirect, setRedirect] = useState(false);
  console.log('In avatar')

  const AvatarStyle = styled.div`
    background-color: rgba(0, 0, 0, .3);
    height: 100%;
    display: grid;
    position: absolute;
    right: 0;
    min-width: 30rem;
    max-width:40rem;
    grid-template-rows: ${xySize + 4}rem 10rem auto auto;
    text-align: center;
  `;

  const toSettings = () => setRedirect(true);
  if(redirect){
    return <Redirect to={`app/123/settings/`} noThrow />
  } else {
    return (
      <AvatarStyle>
        <Img src={headShot} onClick={() => setShowDetails(!showDetails)}/>
        {showDetails && <>
          <h1>{name.full}</h1>
          <ul>
            {emails.map((el, i) => 
              el.primary ? <strong><li key={i}>{el.email}</li></strong> : <li key={i}>{el.email}</li>
            )}
          </ul>
          <ul>
            {memberships.map((el, i) => 
              <li key={i}>{el}</li>
            )}
          </ul>
          <ul>
            {cards.map((el, i) => (
              <li>{el}</li>
            ))}
          </ul>
          <button onClick={(e) => {
            e.preventDefault();
            toSettings();
          }}>| Settings |</button>
        </>}
      </AvatarStyle>
    )
  }
}

export default Avatar;