import React, { useState } from 'react';
import { Query, graphql } from 'react-apollo';

/**
 * Import user components
 */
import {
  CardContainerLayout,
  CardLayout,
  H1Input,
  H2Input,
  Row,
  H2Select,
  Textarea
} from '../../../SharedComponents/Styles/Styles';
import { DeleteButton } from '../../../SharedComponents/Styles/Buttons';
import { PrimaryButton, TertiaryButton } from '../../../SharedComponents/Styles/StyledButtons';
import FormCard from '../FormCard/FormCard';
import SingleCardDelete from './SingleCardDelete';
import { ALL_CARDS, UPDATE_CARD } from './GraphQLOperations';


const CardBoardQuery = ({ spaceId }) => {

  const [st, setSt] = useState({});




  console.log('Query',);

  return (
    <CardContainerLayout>
      <Query query={ALL_CARDS} variables={{ id: "5c672e823aedb67d4580e10a" }} >
        {({ data, loading, error }) => {
          if (loading) return <h1>Loading...</h1>
          if (error) return <h1>{error.message}</h1>

          console.log('Setting data to', data);
          setSt(data);
          return null;
        }}
      </Query>
      {/* <Query query={ALL_CARDS} variables={{ id: spaceId }} pollInterval={500}>
        {({ data, loading, error }) => {
          if (loading) return <h1>Loading...</h1>
          if (error) return <h1>{error.message}</h1>

          const { cards } = data;

          console.log(`CARDS: ${cards}`)

          return cards.map((card, index) => {
            const { id, ...restProps } = card;
            return (
              <FormCard
                id={id}
                mutation={UPDATE_CARD}
                mutationName={"updateCard"}
                initialState={restProps}
                render={({ state, setState }) => (
                  <CardLayout key={index} style={{ height: '30rem' }}>
                    <Row row={1} >
                      <H1Input
                        value={state.title}
                        onChange={e => setState({ ...state, title: e.target.value })}
                      />
                    </Row>
                    <Row row={2} >
                      <H2Select
                        value={state.author}
                        onChange={e => setState({ ...state, author: e.target.value })}
                      >
                        <option value="author 1">author 1</option>
                        <option value="author 2">author 2</option>
                        <option value="author 3">author 3</option>
                      </H2Select>
                    </Row>
                    <Row row={3}>
                      <Textarea
                        value={state.description}
                        onChange={e => setState({ ...state, description: e.target.value })}
                      />
                    </Row>
                    <Row row={4}>
                      <PrimaryButton type="submit" form={id}>Update</PrimaryButton>
                      <SingleCardDelete render={({ deleteCard }) => {
                        return <TertiaryButton onClick={() => deleteCard({ variables: { id } })}>Delete</TertiaryButton>
                      }}
                      />
                    </Row>
                  </CardLayout>
                )
                }
              />
            )
          })
        }}
      </Query> */}
    </CardContainerLayout>
  );
}

export default CardBoardQuery;