import React, { useContext } from 'react';
import styled from '@emotion/styled';

import FormCreateCard from '../Forms/form-create';
import StoreContext from '../../../store/context';

const DashBoardContainer = styled.div`
  h1 {
    margin: 2rem;
  }
`;

function Dashboard(props){
  
  const { state } = useContext(StoreContext);
  const { spaces, cards } = state;
  
  const currentSpaceId = spaces.current;
  const currentSpaceName = spaces.all[currentSpaceId].name;

  return (
    <DashBoardContainer>
      <h1>{currentSpaceName}</h1>
      <FormCreateCard />
      <div>
        <ul>
          {Object.keys(cards)
            .map((el, i) => {
              const {meta, id} = cards[el];
              return meta.spaceId === currentSpaceId ?
                <li key={i}>{id}</li> :
                null;
          })}
        </ul>
      </div>
    </DashBoardContainer>
  );
}

export default Dashboard;