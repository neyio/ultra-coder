/** @jsx jsx */

import { useState, useMemo, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { jsx, css } from '@emotion/core';

import { CodeReact } from './code/index';
import { FormulaReact, withFormula } from './formula/index';
import { TableReact, withTable } from './table/index';

// import 'prismjs/themes/prism-tomorrow.css';
// import 'prismjs/themes/prism.css';
//

import { compose } from '@/utils/functional';
import { slateExtend } from './extend.js';

const { renderElement, decorate, renderLeaf, onKeyDown } = slateExtend(
  CodeReact,
  FormulaReact,
  TableReact,
  {
    renderElement: ({ attributes, children }) => <p {...attributes}>{children}</p>,
    decorate: () => [],
    renderLeaf: ({ attributes, children }) => <span {...attributes}>{children}</span>,
    onKeyDown: () => {},
  },
);

const HEADINGS = 1;
const initialValue = [];

// const {withCode,Code} = codeFactory();

for (let h = 0; h < HEADINGS; h++) {
  initialValue.push({
    children: [
      {
        text: 'const hhh= ()=>{}',
      },
    ],
    type: 'paragraph',
  });
}

const HugeDocumentExample = () => {
  const editor = useMemo(() => compose(withTable, withFormula, withReact, createEditor)(), []);
  const [value, setValue] = useState(initialValue);
  const handleKeyDown = useCallback(e => onKeyDown(e, editor), [editor]);
  return (
    <div
      css={css`
        padding: 4rem;
      `}
    >
      <Slate editor={editor} value={value} onChange={v => setValue(v)}>
        <Editable
          renderElement={renderElement}
          spellCheck
          autoFocus
          decorate={decorate}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
};

export default HugeDocumentExample;
