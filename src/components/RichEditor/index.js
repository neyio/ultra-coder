import React, { useRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import MainController from './controller/MainController';
import { CLASS_LIST } from './constants';

//props 需要 配置 项 见下方解构
const RichEditor = ({ plugins = [], ...props }) => {
  const { hideQuickInsertHint = false, spellcheckEnabled = false } = props;
  const ref = useRef({ controller: null });

  useEffect(() => {
    const container = findDOMNode(ref.current);
    container.setAttribute('contenteditable', true);
    container.setAttribute('autocorrect', false);
    container.setAttribute('autocomplete', 'off');
    container.setAttribute('spellcheck', !!spellcheckEnabled);
    if (!hideQuickInsertHint) {
      container.classList.add(CLASS_LIST.SHOW_QUICK_INSERT_HINT);
    }

    /** binding start **/
    ref.current.controller = new MainController(container, { ...props }); //将配置和ref传入控制器，将控制权转移至MainController内的相关服务。
    /** binding end **/

    return () => {};
  }, [hideQuickInsertHint, props, spellcheckEnabled]);

  return <div ref={ref} />;
};

export default RichEditor;
