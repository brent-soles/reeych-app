import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { Link } from '@reach/router';
import styled from '@emotion/styled';


function ListItems({ list, el }) {
  const Ul = styled.ul`
    list-style: none;
    text-decoration: none;
    
    li {
      font-size: 2rem;
    }
  `
  //const [items, setItems] = useState(list);
  const transitions = useTransition(list, (list, i) => i, {
    from: { transform: 'translate3d(40px,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0px,0,0)', opacity: 1 },
    leave: { transform: 'translate3d(40px,0,0)', opacity: 0 },
    delay: 500,
    trail: 30
  });
  return (
    <Ul>
      {transitions.map(({item, props, key}) => (
        <animated.li key={key} style={props}>
          {el ? item[el] : item}
        </animated.li>
      ))}
    </Ul>
  )
}

export default ListItems;