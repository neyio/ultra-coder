/** @jsx jsx */
import { useState, Fragment } from 'react';
import { useSlate, useSelected, ReactEditor } from 'slate-react';
import { Transforms, Path } from 'slate';
import { Table } from './index';

import { jsx } from '@emotion/core';

import useDebounce from '@/hooks/useDebounce';
import useResizeDetecter from '@/hooks/useResizeDetecter';
import useWatch from '@/hooks/useWatch';

import { IconBar, Icon } from '../tmpComponent';

import {
  tableStyle,
  tableMenuStyle,
  colMenuStyle,
  rowMenuStyle,
  colIconBarStyle,
  rowIconBarStyle,
} from './style';

import { TABLE_TYPE, ROW_TYPE, CELL_TYPE } from './config';

const STable = ({ children, element, attributes }) => {
  const [tableHeight, setTableHeight] = useState(0);
  const rawHandler = ({ contentRect }) => {
    setTableHeight(contentRect.height);
  };
  const { ref, ...othersAttrs } = attributes;
  const [handler] = useDebounce(rawHandler);
  useResizeDetecter(handler, ref);
  const editor = useSlate();
  const isSelected = useSelected();
  return (
    <figure css={tableStyle}>
      {renderTableMenu()}
      {renderBody()}
      {renderRowMenu()}
      {renderColMenu()}
    </figure>
  );

  function renderBody() {
    // <thead>{children[0]}</thead>
    // <tbody>{children.slice(1)}</tbody>
    return (
      <table {...othersAttrs} ref={ref}>
        <tbody>{children}</tbody>
      </table>
    );
  }

  function renderRowMenu() {
    const pos = element.rowMenuPos;
    if (!isSelected) return <Fragment />;
    if (!pos) return <Fragment />;
    const style = {
      left: pos.left,
      top: pos.top,
      height: `${pos.height}px`,
    };
    return (
      <IconBar
        css={rowMenuStyle}
        placement="right"
        trigger={['hover']}
        innerStyle={style}
        // popupClassName={TOOLTIP}
      >
        <ul css={rowIconBarStyle}>
          <li onClick={handleInsert('row', 'before')}>
            <Icon type="add_row_before" />
          </li>
          <li onClick={handleInsert('row', 'after')}>
            <Icon type="add_row_after" />
          </li>
          <li onClick={handleRemove('row')}>
            <Icon type="delete" />
          </li>
        </ul>
      </IconBar>
    );
  }
  function renderColMenu() {
    const pos = element.colMenuPos;
    const isInHead = element.isInHead;
    if (!isInHead) return <Fragment />;
    if (!isSelected) return <Fragment />;
    if (!pos) return <Fragment />;
    const style = {
      left: pos.left,
      top: pos.top,
      width: `${pos.width}px`,
    };
    return (
      <IconBar
        css={colMenuStyle}
        placement="top"
        trigger={['hover']}
        innerStyle={style}
        // popupClassName={TOOLTIP}
      >
        <ul css={colIconBarStyle}>
          <li onClick={handleInsert('column', 'before')}>
            <Icon type="add_col_before" />
          </li>
          <li onClick={handleAlign('left')}>
            <Icon type="align-left" />
          </li>
          <li onClick={handleAlign('center')}>
            <Icon type="align-center" />
          </li>
          <li onClick={handleAlign('right')}>
            <Icon type="align-right" />
          </li>
          <li onClick={handleRemove('column')}>
            <Icon type="delete" />
          </li>
          <li onClick={handleInsert('column', 'after')}>
            <Icon type="add_col_after" />
          </li>
        </ul>
      </IconBar>
    );
  }

  function renderTableMenu() {
    if (!tableHeight) return <Fragment />;
    if (!isSelected) return <Fragment />;
    const style = {
      height: `${tableHeight}px`,
    };

    return (
      <IconBar
        css={tableMenuStyle}
        placement="left"
        trigger={['hover']}
        innerStyle={style}
        // popupClassName={TOOLTIP}
      >
        <ul css={rowIconBarStyle}>
          <li>
            <Icon type="table" />
          </li>
          <li onClick={handleRemoveTable}>
            <Icon type="delete" />
          </li>
        </ul>
      </IconBar>
    );
  }

  function handleAlign(direction) {
    return () => {
      const pos = element.pos;
      Table.alignColumnText(editor, { pos, value: direction });
    };
  }

  function handleInsert(type, prefer) {
    const pos = element.pos;
    if (type === 'row')
      return () => {
        console.log(pos);
        Table.insertRow(editor, { pos, prefer });
      };
    if (type === 'column') return () => Table.insertColumn(editor, { pos, prefer });
  }

  function handleRemove(type) {
    const pos = element.pos;
    if (type === 'row') return () => Table.removeRow(editor, { pos });
    if (type === 'column') return () => Table.removeColumn(editor, { pos });
  }
  function handleRemoveTable() {
    const tablePath = ReactEditor.findPath(editor, element);
    return Transforms.removeNodes(editor, { at: tablePath });
  }
};
const SRow = ({ attributes, children, element }) => {
  // const self = useRef(null);
  const editor = useSlate();
  const { ref, ...othersAttrs } = attributes;
  const rowPath = ReactEditor.findPath(editor, element);
  if (rowPath.length === 0) console.error('ERROR');
  const isFocused = useSelected();
  const [handler] = useDebounce(({ target }) => {
    if (isFocused && !!target) {
      const tablePath = Path.parent(rowPath);
      // const [tablePath, rowPath] = Table.tablePos(editor);
      // const tableElement = Node.get(editor,tablePath);
      const { offsetTop, offsetHeight, offsetWidth, offsetLeft } = target;
      const menuTop = offsetTop;
      const menuLeft = offsetLeft + offsetWidth;
      const isInHead = rowPath[rowPath.length - 1] === 0;
      const newTableData = {
        rowMenuPos: {
          top: menuTop,
          height: offsetHeight,
          left: menuLeft,
        },
        isInHead,
      };
      Transforms.setNodes(editor, newTableData, { at: tablePath });
    }
    console.log('unFocused');
  });
  useResizeDetecter(handler, ref);
  useWatch(() => {
    handler({ target: ref.current });
  }, [isFocused]);
  return (
    <tr {...othersAttrs} ref={ref}>
      {children}
    </tr>
  );
};
const SCell = ({ attributes, children, element }) => {
  // const alignClass = `table-cell--align-${element['text-align']}`;
  const { ref, ...othersAttrs } = attributes;
  const isFocused = useSelected();
  const editor = useSlate();
  const cellPath = ReactEditor.findPath(editor, element);
  if (cellPath.length === 0) console.error('ERROR');
  const [handler] = useDebounce(({ target }) => {
    if (isFocused && ref.current) {
      const rowPath = Path.parent(cellPath);
      const tablePath = Path.parent(rowPath);
      // const [tablePath, rowPath] = Table.tablePos(editor);
      const isHead = rowPath[rowPath.length - 1] === 0;
      let newTableData = {};
      if (isHead) {
        const { offsetTop, offsetWidth, offsetLeft } = target;
        newTableData = {
          ...newTableData,
          colMenuPos: {
            top: offsetTop,
            width: offsetWidth,
            left: offsetLeft,
          },
        };
      }
      newTableData = {
        ...newTableData,
        pos: [tablePath, rowPath, cellPath],
      };
      Transforms.setNodes(editor, newTableData, { at: tablePath });
    }
  });
  useResizeDetecter(handler, ref);
  useWatch(() => {
    handler({ target: ref.current });
  }, [isFocused]);
  return (
    <td {...othersAttrs} ref={ref}>
      {children}
    </td>
  );
};

export function renderElement(props, next) {
  const { element } = props;
  if (element.type === TABLE_TYPE) return <STable {...props} />;
  if (element.type === ROW_TYPE) return <SRow {...props} />;
  if (element.type === CELL_TYPE) return <SCell {...props} />;

  return next();
}
