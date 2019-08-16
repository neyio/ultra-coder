import React, { Component } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/neo.css';
import 'codemirror/addon/fold/foldgutter.css';

import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/selection/active-line.js';

import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/mode/javascript/javascript.js';

import styled from 'styled-components';
import { Select, Row, Col } from 'antd';
import styles from './index.less';
const { Option } = Select;

const CodeContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;

export default class CodeEditor extends Component {
  _ref = null;
  constructor(props) {
    super(props);
    this._ref = null;
    this.state = {
      content: undefined,
    };
  }

  static defaultProps = {
    content: null,
    language: 'C',
    readonly: false,
    height: '1024px',
  };

  onSave = () => {
    const { onSave } = this.props;
    onSave &&
      onSave({
        content: this.state.content,
        language: this.state.language,
      });
  };
  onCodeChange = e => {
    this.setState({
      content: e.getValue(),
    });
  };

  onLanguageChange = e => {
    const { onSave } = this.props;
    onSave &&
      onSave({
        language: e,
        content: this.state.content,
      });
  };
  componentDidMount() {
    console.log(this._ref.editor);
  }

  render() {
    const { content, extra, language, height } = this.props;
    return (
      <CodeContainer>
        <Row type="flex" justify="space-between" className={styles.codeTools}>
          <Col>
            <span>程序语言:</span>
            <Select
              showSearch
              className={styles.languageSelector}
              placeholder="选择编码语言"
              optionFilterProp="children"
              value={language}
              onChange={this.onLanguageChange}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="C">C</Option>
              <Option value="C#">C#</Option>
              <Option value="Javascript">Javascript</Option>
              <Option value="Java">Java</Option>
              <Option value="PHP">PHP</Option>
            </Select>
          </Col>
          <Col>{extra}</Col>
        </Row>
        <CodeMirror
          ref={_r => {
            this._ref = _r;
          }}
          value={content}
          onChange={this.onCodeChange}
          autofocus={true}
          placeholder="Write the code, change the world..."
          options={{
            theme: 'neo',
            tabSize: 2,
            firstLineNumber: 1,
            keyMap: 'sublime',
            mode: language,
            lineNumbers: true,
            extraKeys: {
              Ctrl: 'autocomplete',
              'Ctrl-Q': function(cm) {
                cm.foldCode(cm.getCursor());
              },
            }, //自动提示配置
            lineWiseCopyCut: true, //行剪切
            matchbrackets: true, //括号匹配
            lineWrapping: true, //false 表示超了行不滚动
            autoCloseBrackets: true, //自动闭合括号
            styleActiveLine: true, // 激活行的样式特殊
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          }}
          onBlur={this.onSave}
        />
      </CodeContainer>
    );
  }
}
