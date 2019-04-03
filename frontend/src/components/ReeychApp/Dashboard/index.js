import React, { useContext } from 'react';
import styled from '@emotion/styled';

import FormCreateCard from '../Forms/form-create';
import { AuthContext } from '../../Authentication/AuthContext';

const DashBoardContainer = styled.div`
  h1 {
    margin: 2rem;
  }
`;

function Dashboard(props){
  // console.log('dash', props);
  const { authCtx } = useContext(AuthContext);
  const { profile: { spaces } } = authCtx;
  return (
    <DashBoardContainer>
      <h1>{spaces[props.path].name}</h1>
      <FormCreateCard />
    </DashBoardContainer>
  );
}

export default Dashboard;