import React from 'react';
import { EditorState } from 'draft-js';
import styled from '@emotion/styled';

import FormCard from './form-card-base';
import TextEditor from './text-editor';
import { CREATE_CARD } from '../../../containers/Cards/Operations';

const FormCardWrapper = styled.div`
  margin: 0rem auto;
  min-width: 30rem;
  max-width: 60rem;

  border-radius: .4rem;
  padding: .6rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, .3);

  * {
    font-size: 1.5rem;
  }

  input {
    margin: .6rem;
    padding: .6rem;
    border: none;
  }

  input:focus {
    background: rgba(0, 0, 0, .2);
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
        initialState={{ 
          heading: 'ehy', 
          date: '2019-04-01',
          author: 'Mock Author',
          content: EditorState.createEmpty(),
          data: {
            authorsList: [
              'Mock Auhtor',
              'Another Author',
              'Third Author'
            ]
          }
      }}>
        {({ formState, setFormState }) => {
          const handleChange = ({ target }) => {
            setFormState({...formState, [target.name]: target.value});
          }
          return (
            <>
              <input 
                name='heading'
                type='text'
                value={formState.heading}
                onChange={handleChange} 
              />
              <input 
                name='date'
                type='date'
                value={formState.date}
                onChange={handleChange}
              />
              <select
                name='author'
                value={formState.author}
                onChange={handleChange}
              >
                {formState.data.authorsList.map((el, i) => (
                  <option key={i}>{el}</option>
                ))}
              </select>
              <TextEditor
                id={`create-card-main`}
                name='content'
                content={formState.content}
                onChange={(editorState) => {
                  setFormState({...formState, "content": editorState})
                }}
              />
              <button type="submit">Submit</button>
            </>
          )}
        }
      </FormCard>
    </FormCardWrapper>
  )
};

export default FormCreateCard;