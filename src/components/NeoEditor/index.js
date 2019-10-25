import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'highlight.js/styles/github.css';
import TurndownService from 'turndown';
import ReactDOM, { findDOMNode } from 'react-dom';
import Toolbar from './components/Toolbar';
import Master from './libs/Master';
import markdownString from './testcase';
import TextArea from 'antd/lib/input/TextArea';
import { inputEventHandler, onMouseUp } from './libs/EventHandler';

const turndownService = new TurndownService({
  option: 'value',
  headingStyle: 'atx',
  hr: '---',
  fence: '```',
  emDelimiter: '*',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full',
  strongDelimiter: '**',
});
const Hello = props => {
  return <div>Hello World</div>;
};

const Writer = props => {
  const { markown = markdownString } = props;
  const ref = useRef();
  const [html, setHtml] = useState('');
  const [md, setMD] = useState(markown);

  const mdTextChangeHandler = ({ target }) => {
    const { value } = target;
    setMD(value);
  };

  const turndownMD = useCallback(() => {
    const dom = ref;
    setMD(turndownService.turndown(dom.current));
    console.log('HTML 转 MD 成功');
  }, [ref]);

  const importMD = useCallback(() => {
    (async () => {
      setHtml(await Master(md, 2000));
      console.log('MD 转 HTML 成功');
    })();
  }, [md]);

  useEffect(() => {
    const editor = ref.current;
    const dom = findDOMNode(editor);
    // const dom = document.querySelector('.neo-editor');
    (async () => {
      setHtml(await Master(md, 2000));
      dom.addEventListener('textInput', inputEventHandler, false);
      dom.addEventListener('keydown', inputEventHandler, false);
      const newDIV = document.createDocumentFragment();
      ReactDOM.render(<Hello></Hello>, newDIV, () => {
        dom.appendChild(newDIV);
        console.log('测试性代码');
      });
    })();
    return () => {
      dom.removeEventListener('textInput', inputEventHandler, false);
      dom.removeEventListener('keydown', inputEventHandler, false);
    };
  }, [md]);

  return (
    <div>
      <Toolbar turndownMD={turndownMD} importMD={importMD} />
      <div
        className="neo-editor"
        ref={ref}
        contentEditable={true}
        style={{ padding: '1rem', outline: 'none' }}
        dangerouslySetInnerHTML={{ __html: html }}
        onMouseUp={onMouseUp}
      />
      <hr />
      <TextArea value={md} onChange={mdTextChangeHandler} rows={32}></TextArea>
    </div>
  );
};

export default Writer;
