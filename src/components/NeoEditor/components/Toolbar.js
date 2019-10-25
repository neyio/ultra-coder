import React, { useEffect, useRef } from 'react';

import {toolBarEventHandler} from '../libs/EventHandler';
const Toolbar = props => {
  const { turndownMD = () => {}, importMD = () => {} } = props;
  const ref = useRef();
  useEffect(() => {
    const currentRef = ref.current;
    const preduceToolbarEvent = ({ target }) => {
      const cmd = target.getAttribute('data-name');
      const value = target.getAttribute('data-value');
      return toolBarEventHandler(cmd, value);
    };
    currentRef.addEventListener('click', preduceToolbarEvent, false);
    return () => {
      currentRef.removeEventListener('click', preduceToolbarEvent);
    };
  }, []);
  return (
    <div>
      <button onClick={turndownMD}>HTML转MD</button>
      <button onClick={importMD}>MD转HTML</button>
      <nav id="neo-toolbar" ref={ref}>
        <button name="button-edit" data-name="justifyCenter">
          居中
        </button>
        <button name="button-edit" data-name="justifyLeft">
          左对齐
        </button>
        <button name="button-edit" data-name="justifyRight">
          右对齐
        </button>
        <button name="button-edit" data-name="indent">
          添加缩进
        </button>
        <button name="button-edit" data-name="outdent">
          去掉缩进
        </button>
        <button name="button-edit" data-name="fontname" data-value="宋体">
          宋体
        </button>
        <button name="button-edit" data-name="fontsize" data-value="5">
          大字体
        </button>
        <button name="button-edit" data-name="forecolor" data-value="red">
          红色字体
        </button>
        <button name="button-edit" data-name="backColor" data-value="lightgreen">
          浅绿背景
        </button>
        <button name="button-edit" data-name="bold">
          加粗
        </button>
        <button name="button-edit" data-name="italic">
          斜体
        </button>
        <button name="button-edit" data-name="underline">
          下划线
        </button>
        <button name="button-edit" data-name="copy">
          复制
        </button>
        <button name="button-edit" data-name="cut">
          剪切
        </button>
        <button name="button-edit" data-name="paste">
          粘贴
        </button>
        <button name="button-edit" data-name="selectAll">
          全选
        </button>
        <button name="button-edit" data-name="delete">
          删除
        </button>
        <button name="button-edit" data-name="forwarddelete">
          后删除
        </button>
        <button name="button-edit" data-name="removeFormat">
          清空格式
        </button>
        <button name="button-edit" data-name="redo">
          前进一步
        </button>
        <button name="button-edit" data-name="undo">
          后退一步
        </button>
        <button name="button-edit" data-name="print">
          打印
        </button>
        <button name="button-edit" data-name="formatblock" data-value="div">
          插入div
        </button>
        <button name="button-edit" data-name="inserthorizontalrule">
          插入hr
        </button>
        <button name="button-edit" data-name="insertorderedlist">
          插入ol
        </button>
        <button name="button-edit" data-name="insertunorderedlist">
          插入ul
        </button>
        <button name="button-edit" data-name="formatblock" data-value="p">
          插入p
        </button>
        <button name="button-edit" data-name="inserttext" data-value="这是我插入的内容！">
          插入文本
        </button>
        <button
          name="button-edit"
          data-name="insertimage"
          data-value="http://images.cnblogs.com/cnblogs_com/qingsong/545927/o_39.gif"
        >
          插入图像
        </button>
        <button
          name="button-edit"
          data-name="createlink"
          data-value="https://www.w3cschool.cn/javascript/javascript-execcommand.html"
        >
          增加链接
        </button>
        <button name="button-edit" data-name="unlink">
          删除链接
        </button>
      </nav>
    </div>
  );
};

export default Toolbar;
