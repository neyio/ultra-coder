import React from 'react';
import Wrapper from './Wrapper';
import { css } from 'emotion';
import { Affix } from 'antd';
const RenderViewItem = props => {
  return (
    <span
      className={css`
        max-width: 150px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1rem;
      `}
    >
      {props.title}
    </span>
  );
};
export default function TreeViewer({ targetRef = null, rowKey = 'id', titleIndex = 'title' }) {
  return (
    <Affix target={() => targetRef}>
      <Wrapper
        className={css`
          margin-left: 14px;
        `}
        style={{
          border: 'none',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        rowKey={rowKey}
        renderItem={record => <RenderViewItem title={record[titleIndex]} />}
      />
    </Affix>
  );
}
