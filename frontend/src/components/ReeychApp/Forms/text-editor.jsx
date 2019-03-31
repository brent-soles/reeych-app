import React from 'react';
import {Editor, RichUtils } from 'draft-js';

import styled from '@emotion/styled';

const EditorWrapper = styled.div`
  background: yellow;
  min-height: 20rem;
  min-width: 30rem;
  max-width: 100%;
  transition: .1s ease-in-out;

  .DraftEditor-root:focus {
    background: grey;
  }
`

function TextEditor({ content, onChange }) {
  
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
      <button onClick={_onBoldClick}>B</button>
      <button onClick={_onItalicClick}>I</button>
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

export default TextEditor;