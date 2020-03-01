/** @jsx jsx */
import { useRef, useEffect, useState } from 'react';
import { Node, Transforms } from 'slate';

import { jsx } from '@emotion/core';

import { useSlate, useSelected, ReactEditor } from 'slate-react';

import { containerStyle, contentStyle, previewStyle } from './style';

import { DEFAULT_KATEX_INSTANCE, ELEMENT_NAME } from './config';

//for lazy load katex from cdn;
const lazyMethodGet = valueFunc =>
  new Proxy(
    {},
    {
      get(target, key, receiver) {
        const realKatex = valueFunc();
        if (!realKatex || !realKatex[key]) return x => x;
        return realKatex[key];
      },
    },
  );
const katex = lazyMethodGet(() => DEFAULT_KATEX_INSTANCE || window.katex);

//component
const KatexPreview = ({ text, onClick }) => {
  const ref = useRef(null);
  const [katexHtml, setKatexHtml] = useState('');
  const [validState, setValidState] = useState(true);

  const className = validState
    ? text.length === 0
      ? 'formula-preview--empty'
      : ''
    : 'formula-preview--error';
  useEffect(() => {
    try {
      const result = katex.renderToString(text);
      setKatexHtml(result);
      setValidState(true);
    } catch (e) {
      if (e instanceof katex.ParseError) {
        setValidState(false);
        setKatexHtml('');
      } else {
        throw e;
      }
    }
  }, [text]);
  return (
    <div
      ref={ref}
      contentEditable={false}
      className={className}
      css={previewStyle}
      dangerouslySetInnerHTML={{ __html: katexHtml }}
      onClick={onClick}
    />
  );
};

const KatexBlock = props => {
  const { element, attributes, children } = props;
  const isSelected = useSelected();
  const editor = useSlate();
  // const mathTex = Node.string(element);
  const mathTex = Array.from(Node.texts(element))
    .map(([textNode]) => textNode.text)
    .join('\n');
  const className = isSelected ? 'formula-container--active' : '';
  return (
    <figure {...attributes} className={className} css={containerStyle}>
      <div css={contentStyle}>{children}</div>
      {renderPreview()}
    </figure>
  );

  // render function
  function renderPreview() {
    return <KatexPreview text={mathTex} onClick={onClick} />;
  }

  // handle function
  function onClick(e) {
    const path = ReactEditor.findPath(editor, element);
    // const newSelection = Editor.range(editor,path);
    Transforms.select(editor, path);
  }
};

export const renderElement = (props, next) => {
  const { element } = props;
  switch (element.type) {
    case ELEMENT_NAME:
      return <KatexBlock {...props} />;
    default:
      return next();
  }
};
