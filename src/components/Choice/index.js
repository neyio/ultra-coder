import { Button, Checkbox, InputNumber, message, Radio, Divider } from 'antd';

import React, { Component } from 'react';
import styled from 'styled-components';
import EditableHtml from '@/components/Dynamic/EditableHtml';
const CheckboxGroup = Checkbox.Group;

const radioStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '1rem',
  minHeight: '2rem',
};

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  color: rgba(0, 0, 0, 0.45);
  padding: 1rem 1rem 1rem 0;
  border: 1px solid #e8e8e8;

  .n-choice-toolbar-left {
    display: flex;
    flex-direction: row;
  }
  & span label.tool-name {
    margin: 0 1rem;
  }
  & span.item {
    display: flex;
    align-items: center;
  }
`;

const Container = styled.div`
  border: 1px solid #e8e8e8;
  border-top: 0px;
  padding: 0.5rem 1rem;
  & .n-choice-label::before {
    width: 2%;
  }
  & .n-choice-title {
    padding: 0.5rem 1rem;
  }
  background: #fff;
  .bf-container .public-DraftEditor-content > div {
    padding-bottom: 0px;
  }
`;

const ChoiceMain = styled.div``;

export default class ChoiceMaker extends Component {
  static defaultProps = {
    choices: [],
    options: [],
    answer: [],
    disabled: false,
    type: 'single',
    onChange: val => {
      console.log(val);
    },
    onSave: () => {
      console.log('empty onSave.');
    },
  };
  constructor(props) {
    super(props);

    this.state = {
      disabled: this.props.disabled || false,
    };
  }

  trigger = () => {
    if (this.props.mode === 'immediately') {
      this.setState({
        disabled: true,
      });
    }
  };
  onChange = e => {
    const { onSave } = this.props;
    if (onSave) {
      onSave({
        answer: e.sort((i, j) => {
          return i.charCodeAt(0) - j.charCodeAt(0);
        }),
        mode: e.length > 1 ? 'multiple' : 'single',
      });
    }
  };

  onOptionChanged = index => text => {
    const { options, onSave } = this.props;
    const newOptions = options;
    newOptions[index] = text;
    if (onSave) {
      console.log('saved', options);
      onSave({ options: [...newOptions] });
    }
  };

  onContextChanged = text => {
    console.log('TCL: ChoiceMaker -> onContextChanged -> text', text);

    const { onSave } = this.props;
    if (onSave) {
      onSave({ context: text });
    }
  };

  onAddOption = () => {
    const { options, onSave } = this.props;
    if (onSave) {
      onSave({
        options: [...options, null],
      });
    }
  };

  onDeleteOption = index => {
    const { options, onSave, answer } = this.props;
    if (options.length <= 2) {
      message.error('选项不得低于两项');
      return;
    }
    const str = String.fromCharCode(index + 65);

    if (onSave) {
      onSave({
        options: options.filter((_, i) => {
          return i !== index;
        }),
        answer: answer
          .filter(item => {
            return item && item !== str;
          })
          .map(item => {
            const asNum = item.charCodeAt(0) - 65;
            if (asNum >= index) {
              return String.fromCharCode(asNum + 65 - 1);
            }
            return item;
          }),
      });
    }
  };

  onForceChangeMode = e => {
    const { onSave, answer } = this.props;
    if (e.target.value === 'single' && answer.length > 1) {
      message.error('请取消部分选项后，再尝试将模式设置为单选');
      return;
    }
    if (onSave) {
      onSave({ mode: e.target.value });
    }
  };

  onForceChangeOptional = e => {
    const { onSave } = this.props;
    if (onSave) {
      onSave({ optional: e.target.value });
    }
  };

  onScoreChanged = value => {
    const { onSave } = this.props;

    if (onSave) {
      onSave({ score: value });
    }
  };

  render() {
    const { options, context, answer, mode, score, optional } = this.props;
    return (
      <>
        <Toolbar>
          <div className="n-choice-toolbar-left">
            <span className="item">
              <label className="tool-name">题目类型:</label>
              <Radio.Group
                value={mode}
                buttonStyle="solid"
                size="small"
                onChange={this.onForceChangeMode}
              >
                <Radio.Button value="single">单选题</Radio.Button>
                <Radio.Button value="multiple">多选题</Radio.Button>
              </Radio.Group>
            </span>
            <span className="item">
              <label className="tool-name">分值:</label>
              <span>
                <InputNumber
                  size="small"
                  min={1}
                  max={100000}
                  value={score}
                  onChange={this.onScoreChanged}
                />
              </span>
            </span>
            <span className="item">
              <label className="tool-name">必填项:</label>
              <Radio.Group
                value={optional}
                buttonStyle="solid"
                size="small"
                onChange={this.onForceChangeOptional}
              >
                <Radio.Button value={false}>必填项</Radio.Button>
                <Radio.Button value={true}>选填项</Radio.Button>
              </Radio.Group>
            </span>
          </div>
        </Toolbar>

        <Container>
          <header className="n-editable-context-container n-choice-context-container n-choice-title">
            <EditableHtml onSubmit={this.onContextChanged} text={context} editable>
              <div
                className="markdown-section n-editable-text-default-container"
                dangerouslySetInnerHTML={{
                  __html:
                    ((context === '<p></p>' || !context) &&
                      '<div style="font-weight:bold;border-bottom:1px solid #ccc;padding:1rem;line-height;2rem;font-size:1rem;">点击文本进行编辑。</div>') ||
                    context,
                }}
              />
            </EditableHtml>
          </header>
          <Divider orientation="left" className="n-choice-label">
            选项：
          </Divider>
          <ChoiceMain className="n-choice-main">
            <CheckboxGroup onChange={this.onChange} value={answer}>
              {options.map((item, index) => {
                return (
                  <div key={index} className="n-single-choice">
                    <Checkbox
                      disabled={this.state.disabled}
                      style={radioStyle}
                      value={String.fromCharCode(65 + index)}
                    >
                      <div>{String.fromCharCode(65 + index)}</div>
                    </Checkbox>
                    <div className="n-choice-container">
                      <div className="n-choice-content">
                        <EditableHtml editable onSubmit={this.onOptionChanged(index)} text={item}>
                          <div
                            className="n-editable-text-default-container"
                            dangerouslySetInnerHTML={{
                              __html:
                                ((item === '<p></p>' || !item) &&
                                  '<div style="font-weight:bold;padding-left:1rem;">点击文本进行编辑。</div>') ||
                                item,
                            }}
                          />
                        </EditableHtml>
                      </div>
                      <span className="n-choice-tool">
                        <Button
                          type="link"
                          shape="circle"
                          icon="delete"
                          onClick={() => {
                            this.onDeleteOption(index);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                );
              })}
            </CheckboxGroup>
          </ChoiceMain>
          <footer>
            <Button
              type="dashed"
              style={{
                width: '24.5rem',
                marginLeft: '1.6rem',
                marginBottom: '2rem',
              }}
              icon="plus"
              onClick={this.onAddOption}
            >
              新增选项
            </Button>
          </footer>
        </Container>
      </>
    );
  }
}
