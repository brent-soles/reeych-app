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
  const { authCtx } = useContext(AuthContext);
  const { data: { profile: { spaces } } } = authCtx;
  return (
    <DashBoardContainer>
      <h1>{spaces[props.path].name}</h1>
      <FormCreateCard />
    </DashBoardContainer>
  );
}

export default Dashboard;