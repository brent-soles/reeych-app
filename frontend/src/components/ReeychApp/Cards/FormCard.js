/**
 * Render prop for form card
 */
import React, { useState, useContext } from 'react';
import { graphql } from 'react-apollo';
import styled from '@emotion/styled';


const CardContainerGrid = styled.div`
    display: grid;
    margin: 0 auto;
`;

// FormCard only renders once, then the component produced from
// gqlEnhance is the component that re-renders upon state change
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
  // The component re
  const Component = gqlEnhance(({ mutate }) => {
    const [formState, setFormState] = useState({ ...initialState });
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("formState", formState);
          mutate({
            variables: {...formState}
          })
        }}
      >
        <CardContainerGrid>
          {children({ formState, setFormState })}
        </CardContainerGrid>
      </form>
    )}
  )
  return <Component />
}

export default FormCard;
