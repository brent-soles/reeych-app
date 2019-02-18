import { useState } from 'react';


// This should only be declared at the root
function useStatefulContext(Context, config) {
  
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
    [name + 'Context']: Context,
    value: {
      [name + 'Ctx']: ctx,
      ['set' + name + 'Ctx']: setCtx
    }
  }
}

export default useStatefulContext;