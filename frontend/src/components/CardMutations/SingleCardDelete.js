import React from 'react';
import { Mutation } from 'react-apollo';
import styled from '@emotion/styled';

import { DELETE_CARD } from './GraphQLOperations';

const DeleteButton = styled.button`
    color: red;
    padding: 1rem;

`;

const SingleCardDelete = ({ cardId, render }) => (
    <Mutation mutation={DELETE_CARD}>
        {(deleteCard,{ data }) => {
            return render({ deleteCard })
            // return ( 
            //     <DeleteButton onClick={async ()=> await deleteCard({variables: {id: cardId}})}>
            //         Delete
            //     </DeleteButton>
            // );
        }}
    </Mutation>
)

export default SingleCardDelete;