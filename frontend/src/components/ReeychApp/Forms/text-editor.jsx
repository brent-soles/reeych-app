import React from 'react';
import {Editor, RichUtils } from 'draft-js';

import styled from '@emotion/styled';

const EditorWrapper = styled.div`
  background: rgba(0, 0, 0, .13);
  border-radius: .6rem;

  min-height: 20rem;
  min-width: 30rem;
  max-width: 100%;
  
  margin: 2rem 0rem;

  transition: .1s ease-in-out;
  
  .DraftEditor-root {
    padding: 1rem;
  }
`
const BtnControlBar = styled.div`
background: rgba(0, 0, 0, .09);
  dislay: flex;
  flex-direction: row;
  
  button {
    padding: 1rem;
    margin: .5rem;
    border-radius: .6rem;
    width: 4.5rem;
  }
`;

function TextEditor({ content, onChange }) {
  // Set bold in draf editor
  const _onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(content, "BOLD"));
  };

  const _onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(content, "ITALIC"));
  };

  const handleKeyCommand = (command, editorState) => {
    const newContent = RichUtils.handleKeyCommand(editorState, command);
    console.log("command: ", command);
    if (newContent) {
      onChange(newContent);
      return "handled";
    }
    return "not handled";
  };

  return (
    <EditorWrapper id="editorWrapper">
      <BtnControlBar>
        <button onClick={_onBoldClick}>B</button>
        <button onClick={_onItalicClick}>I</button>
        {/* Solely for mocking purposes */}
        <button onClick={_onBoldClick}>B</button>
        <button onClick={_onItalicClick}>I</button>
        <button onClick={_onBoldClick}>B</button>
        <button onClick={_onItalicClick}>I</button>
        <button onClick={_onBoldClick}>B</button>
        <button onClick={_onItalicClick}>I</button>
        <button onClick={_onBoldClick}>B</button>
        <button onClick={_onItalicClick}>I</button>
        <button onClick={_onBoldClick}>B</button>
        <button onClick={_onItalicClick}>I</button>
      </BtnControlBar>
      <Editor
        spellCheck
        stripPastedStyles
        editorState={content}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
      />
    </EditorWrapper>
  );
}



// function BtnControlBar(props) {
//   return (
//     <div id="btn-control-bar">
//       {props.children}
//     </div>
//   )
// }

export default TextEditor;