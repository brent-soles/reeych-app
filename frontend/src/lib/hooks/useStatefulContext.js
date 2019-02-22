import React, { useState, createContext } from 'react';


// This should only be declared at the root
function useStatefulContext(config) {
  
  if(!config.name){
    throw new Error(`Config not optional and must contain valid key 'name' of type: string`);
  }
  if(!config.initValues){
    throw new Error(`Config not optional and must contain valid key 'initValues' of type: any`);
  }

  const { name, initValues } = config;
  // Setting ctx === context
  const [ ctx, setCtx ] = useState(initValues);
  
  return {
    value: {
      [name + 'Ctx']: ctx,
      ['set' + name + 'Ctx']: setCtx
    }
  }
}

export function createStatefulContext({ name, value }) {
  if(!name){
    throw new Error(`Config not optional and must contain valid key 'name' of type: string`);
  }
  if(!value){
    throw new Error(`Config not optional and must contain valid key 'value' of type: any`);
  }
  
  const Ctx = createContext({});

  return {
    [`${name}Provider`]: (props) => {
      return (
        <Ctx.Provider value={value}>
          {props.children ? props.children : new Error(`Cannot have child props of type: ${props.children}`)}
        </Ctx.Provider>
      )
    },
  };
}

export default useStatefulContext;