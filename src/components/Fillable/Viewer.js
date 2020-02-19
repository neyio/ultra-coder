import React, { useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';
import { css } from 'emotion';
//split(/[(_|——){2,10}(^_)?(\s)+(_|——){2,10}]/); //split(/[_|——]{2,}/);
export default function FillableViewer({ showAnswer, content = '', onChange = () => {} }) {
  //    var reg = /_{2,}([\s\S]*?)_{2,}/g;
  //reg.exec("题__答案1__题目内容2__答案2__");
  // '题__答案1__题目内容2__答案2__'.replace(/_{2,}([\s\S]*?)_{2,}/g, '---').split('---');
  const [answers, setAnswers] = useState([]);
  const [spArray, setSpArray] = useState([]);
  const resetAnswer = useCallback(() => {
    const reg = /_{2,}([\s\S]*?)_{2,}/g;
    let temp = [];
    const tempAnswers = [];
    while ((temp = reg.exec(content)) !== null) {
      tempAnswers.push(temp[1]);
    }
    setAnswers(tempAnswers);
    const getContent = (str = '') => {
      return str.replace(/_{2,}([\s\S]*?)_{2,}/g, '::@content::').split('::@content::');
    };
    setSpArray(getContent(content));
  }, [content]);

  useEffect(() => {
    resetAnswer();
    return () => {
      console.log('clean FillableViewer');
    };
  }, [resetAnswer]);

  return (
    <div
      className={css`
        background: #f5f5f5;
        border-radius: 4px;
        padding: 10px 10px;
        &:empty {
          &::after {
            content: '暂无内容。';
          }
        }
      `}
    >
      {spArray.reduce((acc, item, index) => {
        return (
          <React.Fragment>
            {acc}
            {index > 0 ? (
              <Input
                size="small"
                style={{
                  border: 'none',
                  borderBottom: '2px solid rgb(15, 39, 73)',
                  outline: 'none',
                  display: 'inline',
                  background: 'transparent',
                  width: 'auto',
                  fontSize: '14px',
                }}
                value={answers[index - 1]}
                defaultValue={answers[index - 1]}
                onChange={e => {
                  const nextAnswers = [...answers];
                  nextAnswers[index - 1] = (e.target.value || '').replace(/[\r\n]/g, '');
                  setAnswers(nextAnswers);
                }}
                onPressEnter={() => {
                  onChange(
                    spArray.reduce((acc, item, i) => {
                      return `${acc}${item ? item : ''}${
                        answers[i] ? '__' + answers[i] + '__' : ''
                      }`;
                    }, ''),
                  );
                }}
              />
            ) : null}
            {item && <span style={{ fontSize: '14px' }}>{item}</span>}
          </React.Fragment>
        );
      }, null)}
      {showAnswer && <div>答案：{answers.join(',')}</div>}
    </div>
  );
}
