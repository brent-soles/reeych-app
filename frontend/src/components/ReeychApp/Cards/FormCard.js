/**
 * Render prop for form card
 */
import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import styled from '@emotion/styled';


const CardContainerGrid = styled.div`
    display: grid;
    margin: 0 auto;
`;

function FormCard({mutation, initialState, children}){

  // graphql funciton returns a function, to which mutation
  // function is passed.
  // the function returns a component, which is then returned from the 
  // FormCard function.
  const gqlEnhance = graphql(mutation, {
    // Options
  });

  // State must be declared in the returned function, or the entire
  // Componenet will re-render upon each input
  // mutate is passed from gqlEnhance, children is from FormCard props
  const Component = gqlEnhance(
    ({ mutate }) => {
      const [formState, setFormState] = useState({ ...initialState });
      return (
        <CardContainerGrid>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              console.log("formState", formState);
              // mutate({
              //   variables: {...formState}
              // })

            }}
          >
            {children({ formState, setFormState })}
          </form>
        </CardContainerGrid>
      )}
    )
  return <Component />
}

export default FormCard;
