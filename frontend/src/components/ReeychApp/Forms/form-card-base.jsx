/**
 * Render prop for form card
 */
import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import styled from '@emotion/styled';
import { EditorState, convertToRaw } from 'draft-js';
import { funnlAsync } from 'funnl';

import StoreContext from '../../../store/context'

const CardContainerGrid = styled.div`
    display: grid;
    margin: 0 auto;
`;

// FormCard only renders once, then the component produced from
// gqlEnhance is the component that re-renders upon state change
function FormCard({ mutation, contentToStr, children }) { 
  
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
    const { state, dispatch } = useContext(StoreContext);
    
    const currentSpaceId = state.spaces.current;
    const currentEditorState = state.editor[currentSpaceId];
    // If the object is null, we want to make empty,
    // Otherwise, data will be in correct format
    if ( Object.entries(currentEditorState.content).length === 0 ) {
      currentEditorState.content = EditorState.createEmpty()
    }

    return (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          console.log("SUBMITTED");
          await funnlAsync([
            currentEditorState.content.getCurrentContent(),
            convertToRaw,
            (r) => ({
              variables: {
                ...currentEditorState,
                content: contentToStr ? JSON.stringify(r) : r
              }
            }),
            (r) => console.log(`Sending:`, r),
            // mutate // Send data to backend
            () => {
              console.log("RESETTING")
              dispatch({ target: 'editor', type: 'RESET_EDITOR', payload: { spaceId: currentSpaceId }})
            }
          ])
        }}
      >
        <CardContainerGrid>
          {children({ editorState: currentEditorState, setEditorState: dispatch })}
        </CardContainerGrid>
      </form>
    )}
  )
  return <Component />
}

export default FormCard;
