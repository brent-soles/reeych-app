import React from 'react';
import styled from '@emotion/styled';

import { SECONDARY } from '../../SharedComponents/Styles/Colors';

const xySize = 8;
const ImgStyle = styled.img`
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

function Img ( props ) {
  return <ImgStyle {...props} />;
}

export default Img;