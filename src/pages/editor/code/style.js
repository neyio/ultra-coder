import { css } from '@emotion/core';

export const buttonStyle = css`
  display: none;
  .code-block--selected & {
    z-index: 1;
    cursor: pointer;
    display: inline-block;
    font-weight: 700;
    line-height: 1.6;
    outline: 0;
    padding: 2px 6px;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    vertical-align: middle;
    white-space: nowrap;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    color: #fff;
    font-size: 14px;
    right: 0;
    top: 2px;
  }
`;

export const codeContainerStyle = css`
  display: block;
  position: relative;
  margin: 0px;
  padding: 0px;
  margin-bottom: 1.6em;
  padding-top: 30px;
  background: #183055;
  border-radius: 5px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.4);
  &::before {
    background: #fc625d;
    border-radius: 50%;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
    content: ' ';
    height: 12px;
    left: 12px;
    margin-top: -20px;
    position: absolute;
    width: 12px;
  }
`;

export const exitHintStyle = css`
  .code-block--selected & {
    display: none;
  }
  display: block;
  position: absolute;
  bottom: 0;
  right: 3px;
  color: rgb(157, 170, 182);
  font-size: 12px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  line-height: 1.5;
  z-index: 1;
`;

export const codeAreaStyle = css`
  color: rgb(230, 236, 241);
  display: block;
  hyphens: none;
  tab-size: 2;
  direction: ltr;
  font-size: 14px;
  text-align: left;
  word-break: normal;
  font-family: 'Fira Code', consolas, Menlo, 'PingFang SC', 'Microsoft YaHei', monospace;
  line-height: 1.4;
  white-space: pre;
  word-spacing: normal;
  margin: 0;
  padding: 10px 0px 15px 10px;
  overflow: auto;
  background: rgb(24, 48, 85);
  border-radius: 3px;
`;

export const codeLineStyle = css`
  position: relative;
  overflow-wrap: normal;
  white-space: pre;
  counter-increment: line 1;
  font: inherit;
  padding: 0px 14px 0px 44px;

  &:not(:only-child)::before {
    top: 2px;
    left: 4px;
    color: rgb(92, 105, 117);
    width: 24px;
    bottom: 0px;
    content: counter(line);
    display: inline-block;
    position: absolute;
    font-size: 12px;
    text-align: right;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: transparent;
    user-select: none;
    overflow: hidden;
  }
`;
