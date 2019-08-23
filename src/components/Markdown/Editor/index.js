import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import { Button, Input, Card, Divider, Icon } from 'antd';
import styles from './index.less';
import MarkdownViewer from '../Viewer';
import { insertText } from './utils/insert';
// import iconfont from './utils/iconfont.js';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1366507_c6au2qz3g8p.js',
});
const ButtonGroup = Button.Group;
const codeMap = {
  ...['一', '二', '三', '四', '五'].reduce(
    (pre, value, i) => ({
      ...pre,
      [`h${i + 1}`]: {
        prefix: `${'#'.repeat(i + 1)} `,
        subfix: '',
        str: `${value}级标题`,
      },
    }),
    {},
  ),
  img: {
    prefix: '![alt](',
    subfix: ')',
    str: 'url',
  },
  link: {
    prefix: '[title](',
    subfix: ')',
    str: 'url',
  },
  code: {
    prefix: '\n```',
    subfix: '\n\n```',
    str: 'language',
  },
  unOrderedList: {
    prefix: '\n* ',
    subfix: '\n',
    str: '无序列表',
  },
  orderedList: {
    prefix: '\n1. ',
    subfix: '\n',
    str: '有序列表',
  },
  deleteLine: {
    prefix: '~~',
    subfix: '~~',
    str: '',
  },
  underLine: {
    prefix: '~',
    subfix: '~',
    str: '',
  },
  bold: {
    prefix: '**',
    subfix: '**',
    str: '加粗内容',
  },

  quotes: {
    prefix: '\n> ',
    subfix: '',
    str: '引用内容',
  },
};

function Editor({
  defaultValue = '',
  maxHeight = '600px',
  minRows = 3,
  width = '100%',
  className = '',
  bodyStyle = {},
  contentStyle = {},
  okText = '提交',
  onOk = () => {
    console.log('onOk fired');
  },
  maxRows,
}) {
  const domRef = useRef(null);
  const [content, setContent] = useState(defaultValue ? defaultValue : '');
  const [preview, setPreview] = useState(false);
  const insertDom = type => {
    if (codeMap[type]) {
      setContent(insertText(domRef.current.textAreaRef, codeMap[type]));
    }
  };
  return (
    <Card
      className={classnames(styles.editorContainer, className)}
      style={{ width: width || '100%' }}
      size="small"
      hoverable
      type="inner"
      bodyStyle={{ padding: '5px', margin: 0, maxHeight: maxHeight, ...bodyStyle }}
      actions={[
        <div className={classnames(styles.footerBar)}>
          <span className={styles.footBarLeftPart}>
            {!preview && (
              <ButtonGroup>
                <Button
                  type="link"
                  onClick={() => {
                    insertDom('quotes');
                  }}
                >
                  <IconFont type="icon-yinyong" />
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    insertDom('unOrderedList');
                  }}
                >
                  <IconFont type="icon-wuxuliebiao" />
                </Button>

                <Button
                  type="link"
                  onClick={() => {
                    insertDom('orderedList');
                  }}
                >
                  <IconFont type="icon-youxuliebiao" />
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    insertDom('deleteLine');
                  }}
                >
                  <IconFont type="icon-shanchuxian" />
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    insertDom('code');
                  }}
                >
                  <IconFont type="icon-charudaima" />
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    insertDom('bold');
                  }}
                >
                  <IconFont type="icon-jiacu" />
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    insertDom('link');
                  }}
                >
                  <IconFont type="icon-chaolianjie" />
                </Button>
              </ButtonGroup>
            )}
          </span>
          <span className={styles.footBarRightPart}>
            <Button
              size="small"
              onClick={() => {
                setPreview(pre => !pre);
              }}
            >
              {preview ? '编辑' : '预览'}
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size="small" onClick={onOk}>
              {okText}
            </Button>
          </span>
        </div>,
      ]}
    >
      {preview && (
        <MarkdownViewer
          content={content}
          className={styles.previewer}
          style={{ maxHeight: maxHeight }}
        />
      )}

      <Input.TextArea
        ref={domRef}
        placeholder="请输入内容..."
        value={content}
        style={{
          resize: 'none',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          display: preview ? 'none' : 'block',
          ...contentStyle,
        }}
        onChange={e => {
          setContent(e.target.value);
        }}
        autosize={{ minRows: minRows, maxRows: maxRows || 6 }}
      />
    </Card>
  );
}

export default Editor;
