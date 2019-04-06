import React from 'react';
import { Link } from '@reach/router';
import { useTransition, animated } from 'react-spring';
import styled from '@emotion/styled';

const Ul = styled.ul`
list-style: none;
text-decoration: none;

li a {
  font-size: 2rem;
  text-decoration: none;
}
`;

function ListItems({ list, linkCb, dispatch }) {
  const transitions = useTransition(Object.values(list), (_, i) => i, {
    from: { transform: 'translate3d(40px,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0px,0,0)', opacity: 1 },
    leave: { transform: 'translate3d(40px,0,0)', opacity: 0 },
    delay: 500,
    trail: 30
  });
  return (
    <Ul>
      {transitions.map(({item, props, key}) => {
        console.log('item', item);
        return (
        <animated.li id={item.id} key={key} style={props}>
          <Link to={item.url} 
            onClick={() => {
              dispatch({target: 'spaces', type: 'UPDATE_CURRENT', payload: item.id})
              linkCb();
            }}
          >
            {item.name}
          </Link>
        </animated.li>
        )
      })}
    </Ul>
  )
}

export default ListItems;