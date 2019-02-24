import React from 'react';

import FormCard from '../Cards/FormCard';
import { CREATE_CARD } from '../../../containers/Cards/Operations';


export default function Dashboard(){
  return (
    <FormCard mutation={CREATE_CARD} initialState={{ greeting: 'ehy'}}>
      {({ formState, setFormState }) => (
        <>
          <h1>{formState.greeting}</h1>
          <input value={formState.greeting} onChange={(e) => setFormState({greeting: e.target.value})} />
          <button type="submit">Submit</button>
        </>
      )}
    </FormCard>
  );
}