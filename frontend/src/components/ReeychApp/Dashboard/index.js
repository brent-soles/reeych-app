import React, { useContext } from 'react';
import styled from '@emotion/styled';

import FormCreateCard from '../Forms/form-create';
import { AuthContext } from '../../Authentication/AuthContext';
import { StoreContext } from '../../../../src';

const DashBoardContainer = styled.div`
  h1 {
    margin: 2rem;
  }
`;

function Dashboard(props){
  const { authCtx } = useContext(AuthContext);
  const { data: { profile: { spaces } } } = authCtx;
  const store = useContext(StoreContext);
  console.log("STORE: ", store);
  return (
    <DashBoardContainer>
      <h1>{spaces[props.path].name}</h1>
      <FormCreateCard />
    </DashBoardContainer>
  );
}

export default Dashboard;