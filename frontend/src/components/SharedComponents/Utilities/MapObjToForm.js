import React from 'react';
/**
 * 
 * {
 *  formType: [input|button]
 *  type: [text|submit|btn]
 *  label: string
 *  value: fn()
 *  onChange: fn()
 * }
 * 
 * @param {*} param0 
 */

// function _setValue({formType, }) {
//   if(type === 'input'){
//     return <input {...props} />
//   }
// }

export default function MapObjToForm({ form, onSubmit }){
  return (
    <form>
      {Object.values(form).map(el => {
        if(!el) return null;
        if(el.label) {
          return ( 
            <label for={el.label} >
              {el.label}
              
            </label>
          );
        }
      })}
    </form>
  )
}