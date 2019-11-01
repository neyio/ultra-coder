import React, { useRef, useState, useCallback } from 'react';
import NeoEditor from '../../components/Neyio';

const Editor = props => {
  const ref = useRef({
    container: null,
  });
  const [test, setTest] = useState(0);
  const [editorVisible, setEditorVisible] = useState(true);
  const renderEditor = useCallback(() => {
    return <NeoEditor />;
  }, []);

  return (
    <div>
      {editorVisible && renderEditor()}
      <button
        onClick={() => {
          setEditorVisible(!editorVisible);
        }}
      >
        toggleEditor
      </button>
      {editorVisible && (
        <div ref={ref}>
          <button
            onClick={() => {
              setTest(test - 1);
            }}
          >
            {test}
          </button>
        </div>
      )}
    </div>
  );
};

export default Editor;
