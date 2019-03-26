import React, { useState } from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

import Img from '../Common/Img';
import ListItems from '../../SharedComponents/Utilities/ListItems';
import headShot from './brent-mq.jpg'

const xySize = 8;
const AvatarStyle = styled.div`
  background-color: ${({hideBg}) => hideBg ? 'transparent' : 'rgba(0, 0, 0, .3)'};
  height: 100%;
  padding-left: 6rem;
  display: grid;
  position: fixed;
  right: 0;
  min-width: 30rem;
  max-width:40rem;
  grid-template-rows: ${xySize + 4}rem 10rem auto auto;
  text-align: left;
  transition: .2s;
`;


function Avatar({ first_name, last_name, email, spaces, cards }) {

  const [showDetails, setShowDetails] = useState(false);
  const toggleAvatarBar = () => {
    setShowDetails((prevState) => {
      return !prevState
    })
  }

  return (
    <AvatarStyle hideBg={!showDetails}>
      <Img src={headShot} onClick={() => setShowDetails(!showDetails)}/>
      {showDetails && 
      <>
        <h1>{`${first_name} ${last_name}`}</h1>
        <ul>
          <li>{email}</li>
        </ul>
        <ListItems list={spaces} linkCb={toggleAvatarBar} />
        <Link to="settings" onClick={toggleAvatarBar}>Settings</Link> 
        <Link to="/logout" onClick={()=> window.location.pathname = '/auth/register'}>Logout</Link>
      </>
      }
    </AvatarStyle>
  )
}

export default Avatar;