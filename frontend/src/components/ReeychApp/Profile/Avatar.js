import React, { useState } from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import { SECONDARY } from '../../SharedComponents/Styles/Colors';
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

  const [showDetails, setShowDetails] = useState(false);
  const AvatarStyle = styled.div`
    background-color: ${({hideBg}) => hideBg ? 'transparent' : 'rgba(0, 0, 0, .3)'};
    height: 100%;
    display: grid;
    position: fixed;
    right: 0;
    min-width: 30rem;
    max-width:40rem;
    grid-template-rows: ${xySize + 4}rem 10rem auto auto;
    text-align: center;
  `;

  return (
    <AvatarStyle hideBg={!showDetails}>
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
        <Link to="settings">Settings</Link> 
        <Link to="/logout" onClick={()=> window.location.pathname = '/auth/register'}>Logout</Link>
      </>}
    </AvatarStyle>
  )
}

export default Avatar;