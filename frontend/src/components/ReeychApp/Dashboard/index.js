import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

import FormCard from '../Cards/FormCard';
import { CREATE_CARD } from '../../../containers/Cards/Operations';


export default function Dashboard(){
  return (
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
          console.log('setting', { [target.name]: target.value })
          setFormState({...formState, [target.name]: target.value});
        }
        
        return (
          <>
            <h1>{formState.heading}</h1>
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
            <Editor 
              name='content'
              editorState={formState.content}
              onChange={(editorState) => {
                setFormState({...formState, "content": editorState})
              }}
            />
            <button type="submit">Submit</button>
          </>
        )}
      }
    </FormCard>
  );
}