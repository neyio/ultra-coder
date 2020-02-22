import React, { useState, useCallback } from 'react';
import Viewer from './Viewer';
import { Input } from 'antd';
import { cutDown } from './utils';
import debounce from 'lodash.debounce';
export default function Fillable({ onChange = () => {} }) {
  const [value, setValue] = useState('');
  const debounceOnChange = useCallback(
    debounce(function(content) {
      onChange(cutDown(content));
    }, 200),
    [onChange],
  );
  return (
    <div>
      <h5 className="mg-b-10">题目内容：</h5>
      <Input.TextArea
        allowClear
        autoSize={{ minRows: 5, maxRows: 15 }}
        placeholder="请在此处输入题目内容"
        value={value}
        onChange={e => {
          setValue(e.target.value);
          debounceOnChange(e.target.value);
        }}
      />
      <h5 className="mg-t-10 mg-b-20">预览区域：</h5>
      <Viewer
        content={value}
        showAnswer
        onChange={content => {
          setValue(content);
          debounceOnChange(content);
        }}
      />
    </div>
  );
}
