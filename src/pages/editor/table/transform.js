import { Editor, Transforms, Path, Node } from 'slate';
import { Table } from './index';
import {
  TABLE_TYPE,
  ROW_TYPE,
  CELL_TYPE,
  DEFAULT_CONTENT_TYPE,
  AVALIABLE_PARENT_TYPE,
} from './config';
import CQ from '../commonQuery';

const createTable = (
  rows,
  cols,
  contentGetXY = () => () => ({
    nodes: [Text.create('hello world')],
  }),
) => ({
  type: TABLE_TYPE,
  children: Array.from({ length: rows }).map((_, i) => createRow(cols, contentGetXY(i))),
});
const createRow = (cols, contentGetY) => ({
  type: ROW_TYPE,
  children: Array.from({ length: cols }).map((_, i) => createCell(contentGetY(i))),
});
const createCell = ({ text, ...others }) => ({
  type: CELL_TYPE,
  ...others,
  children: [
    {
      type: DEFAULT_CONTENT_TYPE,
      children: [{ text }],
    },
  ],
});

export default {
  // insertTable(editor, ...args) {
  //   const { startBlock } = editor.value;
  //   return editor.insertTableByKey(startBlock.key, ...args).focus();
  // },
  insertTable(editor, at, ...args) {
    at = at || editor.selection;
    const startPoint = Editor.start(editor, at);
    const [, parentElementPath = []] = CQ.closest(editor, startPoint.path, ([n, p]) =>
      AVALIABLE_PARENT_TYPE.includes(n.type),
    );
    const idx = Path.relative(startPoint.path, parentElementPath)[0];
    const nextPath = Path.next(parentElementPath.concat(idx));
    const newTableElement = createTable(...args);
    return Transforms.insertNodes(editor, newTableElement, { at: nextPath });
    // const { document } = editor.value;
    // const parentBlock =
    //   document.getClosest(key, block => tableParentTypes.includes(block.type)) || document;
    // const offset = parentBlock.getPath(key).first();
    // const newTableBlock = createTable(...args);
    // return editor
    //   .insertNodeByKey(parentBlock.key, offset + 1, newTableBlock)
    //   .moveToEndOfNode(newTableBlock);
  },
  insertColumn(editor, options) {
    const { pos, prefer = 'after' } = options;
    if (!Table.isTablePosition(pos)) {
      throw new Error('invalid table postion', pos);
    }
    const [tableP, rowP, cellP] = pos;
    const colIdx = CQ.ntd(rowP, cellP);
    if (!~colIdx) throw new Error('invalid table position', pos);
    const newColIdx = prefer === 'after' ? colIdx + 1 : colIdx;
    const tableElement = Node.get(editor, tableP);
    Editor.withoutNormalizing(editor, () =>
      tableElement.children.forEach((_, rowIdx) => {
        const newCellPath = tableP.concat(rowIdx, newColIdx);
        const newCellElement = createCell({ text: '' });
        return Transforms.insertNodes(editor, newCellElement, { at: newCellPath });
      }),
    );
  },
  // insertColumnBeforeAtPosition(editor, pos) {
  //   const [tableBlock, rowBlock, cellBlock] = pos;
  //   const cols = rowBlock.nodes.indexOf(cellBlock);
  //   if (!~cols) throw new Error('invalid table position');
  //   return editor.withoutNormalizing(() => {
  //     tableBlock.nodes.forEach(row => {
  //       const newCell = createCell('');
  //       editor.insertNodeByKey(row.key, cols, newCell);
  //     });
  //   });
  // },
  // insertColumnAfterAtPosition(editor, pos) {
  //   const [tableBlock, rowBlock, cellBlock] = pos;
  //   const cols = rowBlock.nodes.indexOf(cellBlock);
  //   if (!~cols) throw new Error('invalid table position');
  //   return editor.withoutNormalizing(() => {
  //     tableBlock.nodes.forEach(row => {
  //       const newCell = createCell('');
  //       editor.insertNodeByKey(row.key, cols + 1, newCell);
  //     });
  //   });
  // },
  insertRow(editor, options) {
    const { pos, prefer = 'after' } = options;
    if (!Table.isTablePosition(pos)) {
      throw new Error('invalid table postion', pos);
    }
    const [tableP, rowP] = pos;
    const rowIdx = CQ.ntd(tableP, rowP);
    if (!~rowIdx) throw new Error('invalid table position', pos);
    const newRowIdx = prefer === 'after' ? rowIdx + 1 : rowIdx;
    const rowElement = Node.get(editor, rowP);
    const contentGen = col => ({ 'text-align': rowElement.children[col]['text-align'], text: '' });
    const newRowElement = createRow(rowElement.children.length, contentGen);
    const newRowPath = tableP.concat(newRowIdx);
    return Transforms.insertNodes(editor, newRowElement, { at: newRowPath });
  },
  // insertRowBeforeAtPosition(editor, pos) {
  //   const [tableBlock, rowBlock] = pos;
  //   const rows = tableBlock.nodes.indexOf(rowBlock);
  //   const contentGen = col => {
  //     const cellBlock = rowBlock.nodes.get(col);
  //     return {
  //       data: cellBlock.data,
  //     };
  //   };
  //   const newRow = createRow(rowBlock.nodes.size, contentGen);
  //   return editor.insertNodeByKey(tableBlock.key, rows, newRow);
  // },
  // insertRowAfterAtPosition(editor, pos) {
  //   const [tableBlock, rowBlock] = pos;
  //   const rows = tableBlock.nodes.indexOf(rowBlock);
  //   const contentGen = col => {
  //     const cellBlock = rowBlock.nodes.get(col);
  //     return {
  //       data: cellBlock.data,
  //     };
  //   };
  //   const newRow = createRow(rowBlock.nodes.size, contentGen);
  //   return editor.insertNodeByKey(tableBlock.key, rows + 1, newRow);
  // },
  // insertColumnAfter(editor) {
  //   const { selection } = editor.value;
  //   const pos = editor.getTablePosition();
  //   editor.insertColumnAfterAtPosition(pos);
  //   const focusBlockKey = editor.value.document.getNode(selection.focus.path).key;
  //   const newPoint = selection.focus.setKey(focusBlockKey);
  //   const newRange = selection.setStart(newPoint).setEnd(newPoint);
  //   return editor.select(newRange).focus();
  // },
  // insertColumnBefore(editor) {
  //   const { selection } = editor.value;
  //   const pos = editor.getTablePosition();
  //   editor.insertColumnBeforeAtPosition(pos);
  //   const focusBlockKey = editor.value.document.getNode(selection.focus.path).key;
  //   const newPoint = selection.focus.setKey(focusBlockKey);
  //   const newRange = selection.setStart(newPoint).setEnd(newPoint);
  //   return editor.select(newRange).focus();
  // },
  // insertRowAfter(editor) {
  //   const { selection } = editor.value;
  //   const pos = editor.getTablePosition();
  //   editor.insertRowAfterAtPosition(pos);
  //   const focusBlockKey = editor.value.document.getNode(selection.focus.path).key;
  //   const newPoint = selection.focus.setKey(focusBlockKey);
  //   const newRange = selection.setStart(newPoint).setEnd(newPoint);
  //   return editor.select(newRange).focus();
  // },
  // insertRowBefore(editor) {
  //   const { selection } = editor.value;
  //   const pos = editor.getTablePosition();
  //   editor.insertRowBeforeAtPosition(pos);
  //   const focusBlockKey = editor.value.document.getNode(selection.focus.path).key;
  //   const newPoint = selection.focus.setKey(focusBlockKey);
  //   const newRange = selection.setStart(newPoint).setEnd(newPoint);
  //   return editor.select(newRange).focus();
  // },
  removeRow(editor, options) {
    const { pos } = options;
    if (!Table.isTablePosition(pos)) {
      throw new Error('invalid table postion', pos);
    }
    const [, rowP] = pos;
    return Transforms.removeNodes(editor, { at: rowP });
  },
  removeColumn(editor, options) {
    const { pos } = options;
    if (!Table.isTablePosition(pos)) {
      throw new Error('invalid table postion', pos);
    }
    const [tableP, rowP, cellP] = pos;
    const colIdx = CQ.ntd(rowP, cellP);
    if (!~colIdx) throw new Error('invalid table postion', pos);
    const tableElement = Node.get(editor, tableP);

    return Editor.withoutNormalizing(editor, () => {
      tableElement.children.forEach((_, rowIdx) => {
        const removePath = tableP.concat(rowIdx, colIdx);
        return Transforms.removeNodes(editor, { at: removePath });
      });
    });
  },
  // removeColumn(editor) {
  //   const pos = editor.getTablePosition();
  //   const [, rowBlock, cellBlock] = pos;
  //   if (rowBlock.nodes.size === 1) return editor.removeColumnAtPos(pos);
  //   const cols = rowBlock.nodes.indexOf(cellBlock);
  //   const newCol = cols === 0 ? cols + 1 : cols - 1;
  //   const newSelectedCell = rowBlock.nodes.get(newCol);
  //   return editor
  //     .removeColumnAtPos(pos)
  //     .moveToStartOfNode(newSelectedCell)
  //     .focus();
  // },
  // removeRow(editor) {
  //   const pos = editor.getTablePosition();
  //   const [tableBlock, rowBlock, cellBlock] = pos;
  //   if (tableBlock.nodes.size === 1) return editor.removeColumnAtPos(pos);
  //   const rows = tableBlock.nodes.indexOf(rowBlock);
  //   const cols = rowBlock.nodes.indexOf(cellBlock);
  //   const newRows = rows === 0 ? rows + 1 : rows - 1;
  //   const newSelectedCell = tableBlock.nodes.get(newRows).nodes.get(cols);
  //   return editor
  //     .removeRowAtPos(pos)
  //     .moveToStartOfNode(newSelectedCell)
  //     .focus();
  // },
  alignColumnText(editor, options) {
    const { pos, value = 'center' } = options;
    if (!Table.isTablePosition(pos)) {
      throw new Error('invalid table postion', pos);
    }
    const [tableP, rowP, cellP] = pos;
    const colIdx = CQ.ntd(rowP, cellP);
    if (!~colIdx) throw new Error('invalid table postion', pos);

    const tableElement = Node.get(editor, tableP);
    return Editor.withoutNormalizing(editor, () =>
      tableElement.children.forEach((_, rowIdx) => {
        const cellPath = tableP.concat(rowIdx, colIdx);
        return Transforms.setNodes(
          editor,
          {
            'text-align': value,
          },
          { at: cellPath },
        );
      }),
    );
  },
  // alignColumnText(editor, value) {
  //   const { selection } = editor.value;
  //   const pos = editor.getTablePosition();
  //   return editor
  //     .alignColumnTextAtPosition(pos, value)
  //     .select(selection)
  //     .focus();
  // },
};
