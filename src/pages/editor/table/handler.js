import { Editor, Node, Path, Transforms } from 'slate';
import { ifFlow } from '@/utils/functional';

// import { ELEMENT_NAME} from './config';

import { Table } from './index';

import CQ from '../commonQuery';
import { isModE, isEnter, isShiftEnter, isTab } from '../hotkey';

const tableReg = /^(?:\|\s*(\S+)\s*)+\|$/;
const alwaysTrue = () => true;
const isOutCellBlock = (event, editor, next) => {
  const [, , cellBlock] = Table.tablePos(editor);
  if (!cellBlock) return true;
  return false;
};
const isEnterWhenOutCellBlock = (...args) => isOutCellBlock(...args) && isEnter(...args);

export const onKeyDown = (event, editor, next) =>
  ifFlow(
    [isModE, handleModE],
    [isEnterWhenOutCellBlock, handleModE],
    [isOutCellBlock, next],
    [isShiftEnter, handleShiftEnter],
    [isTab, handleTab],
    [alwaysTrue, defaultHander],
  )(event, editor, next);

function defaultHander(event, editor, next) {
  return next();
}

function handleModE(event, editor, next) {
  const [[startElement, startElementPath]] = CQ.edgeElement(editor, { edge: 'start' });
  if (startElement.type !== 'paragraph') return next();
  // if (!document.nodes.includes(startBlock)) return next();
  const text = Node.string(startElement);
  const result = tableReg.exec(text);
  if (!result) return next();
  event.preventDefault();
  const heads = result[1].replace(/\s/, '').split('|');
  return Editor.withoutNormalizing(editor, () => {
    Table.insertTable(editor, null, 2, heads.length, () => col => ({
      text: heads[col],
    }));
    Transforms.removeNodes(editor, startElementPath);
  });
}

function handleShiftEnter(event, editor, next) {
  event.preventDefault();
  const [tablePath] = Table.tablePos(editor);
  return Transforms.insertNodes(
    editor,
    { type: 'paragraph', children: [{ text: '' }] },
    { at: Path.next(tablePath) },
  );
}

function handleTab(event, editor, next) {
  event.preventDefault();
  const pos = Table.tablePos(editor);
  const [tablePath, rowPath, cellPath] = pos;
  const tableElement = Node.get(editor, tablePath);
  const rowElement = Node.get(editor, rowPath);
  const rows = rowPath[rowPath.length - 1];
  const cols = cellPath[cellPath.length - 1];
  const isNextRow = rowElement.children.length === cols + 1;
  const isLastRow = tableElement.children.length === rows + 1;
  if (isNextRow && isLastRow)
    return Editor.withoutNormalizing(editor, () => {
      Table.insertRow(editor, { pos });
    });
  // return editor
  //   .insertRowAfterAtPosition(pos)
  //   .moveToEndOfNode(cellBlock)
  //   .moveForward(1);
  if (isNextRow) {
    const nextCellPath = tablePath.concat(rows + 1, 0);
    return Transforms.select(editor, nextCellPath);
  } else {
    const nextCellPath = tablePath.concat(rows, cols + 1);
    return Transforms.select(editor, nextCellPath);
  }
}
