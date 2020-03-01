import { css } from '@emotion/core';
import {} from './config';

export const containerStyle = css`
  margin: 0 auto;
  position: relative;
`;

export const contentStyle = css`
  display: none;
  .formula-container--active & {
    display: block;
  }
`;

export const previewStyle = css`
  text-align: center;
  background-color: white;
  padding: 1em 0;
  .formula-container--active & {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 50%;
    width: 100%;
    box-sizing: border-box;
    z-index: 10000;
    transform: translateX(-50%);
    padding: 0.5rem;
    border: 1px solid grey;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  &.formula-preview--error {
    font-size: 14px;
    font-style: italic;
    font-family: monospace;
    &::after {
      content: '<Invalid Mathematical Formula>';
    }
    color: red;
  }
  &.formula-preview--empty {
    font-size: 14px;
    font-style: italic;
    font-family: monospace;
    &::after {
      content: '<Empty Mathematical Formula>';
    }
  }

  &:hover {
    cursor: pointer;
  }
`;
// .container-block {
//   margin: 0 auto;
//   position: relative;
//   .content {
//     display: none;
//   }
//   &.active {
//     .content {
//       display: block;
//     }
//     .preview {
//       position: absolute;
//       top: calc(100% + 0.5rem);
//       left: 50%;
//       width: 100%;
//       box-sizing: border-box;
//       z-index: 10000;
//       transform: translateX(-50%);
//       padding: 0.5rem;
//       border: 1px solid grey;
//       border-radius: 4px;
//       box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
//     }
//   }

//   .preview {
//     text-align: center;
//     background-color: white;
//     padding: 1em 0;
//     &.error {
//       font-size: 14px;
//       font-style: italic;
//       font-family: monospace;
//       &::after {
//         content: "<Invalid Mathematical Formula>";
//       }
//       color: red;
//     }

//     &.empty {
//       font-size: 14px;
//       font-style: italic;
//       font-family: monospace;
//       &::after {
//         content: "<Empty Mathematical Formula>";
//       }
//     }

//     &:hover {
//       cursor: pointer;
//     }
//   }
// }
