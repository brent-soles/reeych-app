import React, { useContext } from 'react';
import styled from '@emotion/styled';

import FormCard from './form-card-base';
import TextEditor from './text-editor';
import { CREATE_CARD } from '../../../GraphQL/Cards/Operations';

const FormCardWrapper = styled.div`
  margin: 0rem auto;
  min-width: 30rem;
  max-width: 55rem;

  border-radius: .8rem;
  padding: .6rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .3);

  * {
    font-size: 1.5rem;
    
  }

  input {
    border-radius: .8rem;
    margin: .6rem;
    padding: .8rem;
    border: none;
    outline: none;
  }

  select {
    padding: .8rem;
    border: none;
    height: 3.5rem;
    outline: none;
    margin: .6rem;
  }

  select:hover {
    background: rgba(0, 0, 0, .1);
  }

  input:hover {
    background: rgba(0, 0, 0, .1);
  }

  input:focus {
    background: rgba(0, 0, 0, .2);
    box-shadow: 0px 0px 5px 0.5px blue;
  }

  #create-card-main {

  }
  
`

function FormCreateCard(){
  return (
    <FormCardWrapper>
      <FormCard
        style={{
          width: '500px'
        }}
        mutation={CREATE_CARD} 
        contentToStr
      >
        {({ editorState, setEditorState, props }) => {
          const handleChange = ({ target }) => {
            setEditorState({
              ...editorState,
              [target.name]: target.value
            })
          }
          return (
            <>
              <input 
                name='title'
                type='text'
                value={editorState.title}
                onChange={handleChange} 
                {...props}
              />
              <input 
                name='date'
                type='date'
                value={editorState.date}
                onChange={handleChange}
              />
              <select
                name='author'
                value={editorState.author}
                onChange={handleChange}
              >
                {editorState.data.authorsList.map((el, i) => (
                  <option key={i}>{el}</option>
                ))}
              </select>
              <TextEditor
                id={`create-card-main`}
                name='content'
                content={editorState.content}
                onChange={(newEditorState) => {
                  handleChange({ target: { name: "content", value: newEditorState } })
                }}
              />
              <button type="submit">+</button>
            </>
          )}
        }
      </FormCard>
    </FormCardWrapper>
  )
};

export default FormCreateCard;