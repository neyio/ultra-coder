/** @jsx jsx */
import { useState } from 'react';
import Prism from 'prismjs';
import copyHelper from 'copy-to-clipboard';
import { useSelected } from 'slate-react';
import { Node } from 'slate';

import { jsx, css } from '@emotion/core';

import {
  buttonStyle,
  codeContainerStyle,
  exitHintStyle,
  codeAreaStyle,
  codeLineStyle,
} from './style.js';

import { MARK_TYPE, CODE_TYPE, CODE_LINE_TYPE } from './config';

// https://github.com/GitbookIO/slate-edit-code
const createDecoration = ({ text, path, textStart, textEnd, start, end, className }) => {
  if (start >= textEnd || end <= textStart) {
    return null;
  }

  // Shrink to this text boundaries
  start = Math.max(start, textStart);
  end = Math.min(end, textEnd);

  // Now shift offsets to be relative to this text
  start -= textStart;
  end -= textStart;

  return {
    anchor: {
      path,
      offset: start,
    },
    focus: {
      path,
      offset: end,
    },
    type: 'prismjs-token',
    className,
  };
};

const CopyButton = ({ onClick, ...others }) => {
  const [copyStatus, setCopyStatus] = useState(false);
  return (
    <div {...others} css={buttonStyle} onClick={handleClick} onMouseLeave={handleMouseLeave}>
      {!copyStatus ? <div>copy icon</div> : 'copyed'}
    </div>
  );

  function handleClick() {
    /* eslint-disable no-unused-expressions*/
    onClick && onClick();
    setCopyStatus(true);
  }

  function handleMouseLeave() {
    setCopyStatus(false);
  }
};

export const renderLeaf = (props, next) => {
  const { leaf, children, attributes } = props;
  if (leaf && leaf.type === MARK_TYPE) {
    const className = `${leaf.className} token`;
    return (
      <span {...attributes} className={className}>
        {children}
      </span>
    );
  }
  return next();
};

export const decorate = ([element, elementPath], next) => {
  if (element.type !== CODE_TYPE) return next();
  const textEntry = Array.from(Node.texts(element));
  const blockTotalText = textEntry.map(t => t[0].text).join('\n');
  const language = element.language;

  const grammer = Prism.languages[language];
  const tokens = Prism.tokenize(blockTotalText, grammer);

  const [, decorations] = textEntry.reduce(
    (acc, [text, path]) => {
      const [textStart, outDecorations] = acc;
      const textEnd = textStart + text.text.length;

      function processToken(token, type, info) {
        const [offset, innerDecorations] = info;
        if (typeof token === 'string') {
          let decoration = null;
          if (type) {
            decoration = createDecoration({
              text,
              path: elementPath.concat(path),
              textStart,
              textEnd,
              start: offset,
              end: offset + token.length,
              className: type,
            });
          }
          return [offset + token.length, innerDecorations.concat(decoration)];
        } else {
          // typeof token === 'object'
          const currentClassName = [type]
            .concat(token.type, token.alias)
            .filter(x => !!x)
            .join(' ');
          if (typeof token.content === 'string') {
            const decoration = createDecoration({
              text,
              path: elementPath.concat(path),
              textStart,
              textEnd,
              start: offset,
              end: offset + token.content.length,
              className: currentClassName,
            });
            return [offset + token.content.length, innerDecorations.concat(decoration)];
          } else {
            return token.content.reduce(
              (innerAcc, content) => processToken(content, token.type, innerAcc),
              info,
            );
          }
        }
      }

      const [, newDecorations] = tokens.reduce(
        (tokenAcc, token) => processToken(token, null, tokenAcc),
        [0, outDecorations],
      );
      return [textEnd + 1, newDecorations]; // '+1' for '/n'
    },
    [0, []],
  );
  return decorations.filter(x => !!x);
};

export const renderElement = (props, next) => {
  const { element } = props;
  switch (element.type) {
    case CODE_TYPE:
      return <CodeBlock {...props} />;
    case CODE_LINE_TYPE:
      return <CodeLine {...props} />;
    default:
      return next();
  }
};

// component
function CodeBlock(props) {
  const { attributes, element, children } = props;
  const isSelected = useSelected();
  const language = element.language;
  return (
    <div
      {...attributes}
      className={isSelected ? 'code-block--selected' : ''}
      css={codeContainerStyle}
    >
      <div contentEditable={false}>
        <CopyButton onClick={handleCopyBtnClick} />
        <div css={exitHintStyle}>exit: Shift+↩</div>
      </div>
      <pre
        className={`code language-${language}`}
        css={css`
          padding: 0 !important;
          margin: 1rem 0 !important;
        `}
      >
        <code css={codeAreaStyle}>{children}</code>
      </pre>
    </div>
  );

  function handleCopyBtnClick() {
    const text = Array.from(Node.texts(element))
      .map(([textNode]) => textNode.text)
      .join('\n');
    copyHelper(text);
  }
}

function CodeLine(props) {
  const { children, attributes } = props;
  return (
    <div {...attributes} css={codeLineStyle}>
      {children}
    </div>
  );
}
