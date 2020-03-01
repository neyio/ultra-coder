import { css } from '@emotion/core';
import {} from './config';

export const tableStyle = css`
  padding: 0;
  margin: 0 auto;
  margin-top: 1rem;
  // margin-bottom: 1rem;
  // margin-right: 2rem;
  // margin-left: 2rem;
  position: relative;

  table {
    border-collapse: collapse;
    width: 100%;
    position: relative;
    th {
      background: var(--table-head-background-color, #f5f5f5);
      font-weight: bold;
    }
    th,
    td {
      border: 1px solid var(--table-border-color, #e5e5e5);
      padding: 0.5em;
      min-width: 10rem;
      position: relative;

      &.table-cell--align-center {
        text-align: center;
      }
      &.table-cell--align-left {
        text-align: left;
      }
      &.table-cell--align-right {
        text-align: right;
      }
    }
  }
`;

const menulHintStyle = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;
    background-color: var(--theme-color-text-lighten, #66666680);
  }
  &::before {
    content: '...';
  }
`;

export const tableMenuStyle = css`
  ${menulHintStyle}
  width: 1rem;
  top: 0;
  left: 0;
  margin-left: -1rem;
  &::before {
    transform: rotate(-90deg);
  }
`;

export const rowMenuStyle = css`
  ${menulHintStyle}
  width: 1rem;
  justify-content: center;
  align-items: center;
  &::before {
    transform: rotate(90deg);
  }
`;

export const colMenuStyle = css`
  ${menulHintStyle}
  margin-top: -1rem;
  height: 1rem;
`;

const iconBarStyle = css`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  li {
    padding: 0;
    margin: 0 auto;
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
      cursor: pointer;
      span {
        color: var(--theme-color-text-lighten, #66666680);
      }
    }
    span {
      color: var(--theme-color-text-primary, #666);
      font-size: 1.4rem;
    }
  }
`;

export const colIconBarStyle = css`
  ${iconBarStyle}
  li:first-of-type {
    flex: 2;
    &:after {
      // content: '|';
      color: var(--theme-color-text-primary, #666);
    }
  }

  li:last-of-type {
    flex: 2;
    &::before {
      content: ' ';
      height: ;
      color: var(--theme-color-text-primary, #666);
    }
  }
`;
export const rowIconBarStyle = css`
  ${iconBarStyle}
  flex-direction: column;
  li:last-of-type {
    flex: 2;
    display: flex;
    flex-direction: column;
    &::before {
      content: '---';
      color: var(--theme-color-text-primary, #666);
    }
  }
`;

// @block-name: s-table;

// .@{block-name} {
//   padding: 0;
//   margin: 0 auto;
//   margin-top: 1rem;
//   // margin-bottom: 1rem;
//   // margin-right: 2rem;
//   // margin-left: 2rem;
//   position: relative;
//   &__tool {
//     position: absolute;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     &:hover {
//       box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
//       cursor: pointer;
//       background-color: var(--theme-color-text-lighten, #66666680);
//     }
//     &::before {
//       content: '...';
//     }

//     &--table-menu {
//       width: 1rem;
//       top: 0;
//       left: 0;
//       margin-left: -1rem;
//       &::before {
//         transform: rotate(-90deg);
//       }
//     }
//     &--row-menu {
//       width: 1rem;
//       justify-content: center;
//       align-items: center;
//       &::before {
//         transform: rotate(90deg);
//       }
//     }
//     &--col-menu {
//       margin-top: -1rem;
//       height: 1rem;
//     }
//   }
//   table {
//     border-collapse: collapse;
//     width: 100%;
//     position: relative;
//     thead tr {
//       background: var(--table-head-background-color, #f5f5f5);
//       font-weight: bold;
//     }

//     td {
//       border: 1px solid var(--table-border-color, #e5e5e5);
//       padding: 0.5em;
//       min-width: 10rem;
//       position: relative;

//       &.table-cell--align-center {
//         text-align: center;
//       }
//       &.table-cell--align-left {
//         text-align: left;
//       }
//       &.table-cell--align-right {
//         text-align: right;
//       }
//     }
//   }
// }

// ul.@{block-name}__icon-bar {
//   list-style-type: none;
//   display: flex;
//   justify-content: space-between;
//   margin: 0;
//   padding: 0;
//   li {
//     padding: 0;
//     margin: 0 auto;
//     flex: 1;
//     text-align: center;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     &:hover {
//       box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
//       cursor: pointer;
//       span {
//         color: var(--theme-color-text-lighten, #66666680);
//       }
//     }
//     span {
//       color: var(--theme-color-text-primary, #666);
//       font-size: 1.4rem;
//     }
//   }
//   &--col {
//     li:first-of-type {
//       flex: 2;
//       &:after {
//         // content: '|';
//         color: var(--theme-color-text-primary, #666);
//       }
//     }

//     li:last-of-type {
//       flex: 2;
//       &::before {
//         content: ' ';
//         height: ;
//         color: var(--theme-color-text-primary, #666);
//       }
//     }
//   }
//   &--row,
//   &--table {
//     flex-direction: column;
//     li:last-of-type {
//       flex: 2;
//       display: flex;
//       flex-direction: column;
//       &::before {
//         content: '---';
//         color: var(--theme-color-text-primary, #666);
//       }
//     }
//   }
// }

// .@{block-name}__custom-rc--tooltip {
//   &.rc-tooltip-placement-right .rc-tooltip-arrow,
//   &.rc-tooltip-placement-rightTop .rc-tooltip-arrow,
//   &.rc-tooltip-placement-rightBottom .rc-tooltip-arrow {
//     border-right-color: var(--theme-color-light, #f5f5f5);
//   }

//   &.rc-tooltip-placement-left .rc-tooltip-arrow,
//   &.rc-tooltip-placement-leftTop .rc-tooltip-arrow,
//   &.rc-tooltip-placement-leftBottom .rc-tooltip-arrow {
//     border-left-color: var(--theme-color-light, #f5f5f5);
//   }

//   &.rc-tooltip-placement-bottom .rc-tooltip-arrow,
//   &.rc-tooltip-placement-bottomLeft .rc-tooltip-arrow,
//   &.rc-tooltip-placement-bottomRight .rc-tooltip-arrow {
//     top: 4px;
//     margin-left: -5px;
//     border-width: 0 5px 5px;
//     border-bottom-color: var(--theme-color-light, #f5f5f5);
//   }

//   &.rc-tooltip-placement-top .rc-tooltip-arrow,
//   &.rc-tooltip-placement-topLeft .rc-tooltip-arrow,
//   &.rc-tooltip-placement-topRight .rc-tooltip-arrow {
//     top: 4px;
//     margin-left: -5px;
//     border-width: 0 5px 5px;
//     border-top-color: var(--theme-color-light, #f5f5f5);
//   }

//   .rc-tooltip-inner {
//     background-color: var(--theme-color-light, #f5f5f5);
//   }
// }
