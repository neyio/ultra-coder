import React, { useRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';


//props 需要 配置 spellcheckEnabled
const RichEditor = ({ plugins = [], ...props }) => {
  const { spellcheckEnabled = false } = props;
  const ref = useRef();
 
  useEffect(() => {
    const container = findDOMNode(ref.current);
    container.setAttribute('contenteditable', true);
    container.setAttribute('autocorrect', false);
    container.setAttribute('autocomplete', 'off');
    container.setAttribute('spellcheck', !!spellcheckEnabled);
      return () => {
        
    };
  }, [spellcheckEnabled]);

  return <div ref={ref} />;
};

export default RichEditor;
