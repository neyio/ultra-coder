import { Path, Editor } from 'slate';
import { Table } from './index';
import CQ from '../commonQuery';
import { TABLE_TYPE, ROW_TYPE, CELL_TYPE } from './config';

export default {
  isTablePosition(pos) {
    return pos.reduce((curr, p) => curr && Path.isPath(p));
  },
  isTable(element) {
    return element.type === TABLE_TYPE;
  },
  isRow(element) {
    return element.type === ROW_TYPE;
  },
  isCell(element) {
    return element.type === CELL_TYPE;
  },
  tablePos(editor, at) {
    at = at || editor.selection;
    const startPoint = Editor.start(editor, at);
    const [, closestTablePath = []] = CQ.closest(editor, startPoint.path, ([n]) =>
      Table.isTable(n),
    );
    if (closestTablePath.length === 0) return [];
    // throw new Error(`Can't find any table element from this position ${at}`);
    const relative = Path.relative(startPoint.path, closestTablePath);
    if (relative.length === 0) return [closestTablePath];
    const rowPath = closestTablePath.concat(relative[0]);
    if (relative.length === 1) return [closestTablePath, rowPath];
    const cellPath = rowPath.concat(relative[1]);
    return [closestTablePath, rowPath, cellPath];
  },
};
