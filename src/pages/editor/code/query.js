import detectIntent from 'detect-indent';

import { Node, Range, Path } from 'slate';

import { Code } from './index';

import { CODE_LINE_TYPE, CODE_TYPE, tabLength } from './config';

const DEFAULT_TABLENGTH = tabLength;
const DEFAULT_TABSPACE = ' '.repeat(DEFAULT_TABLENGTH);

export default {
  edgeBlock(editor) {
    const { selection } = editor;
    const [startPoint, endPoint] = Range.edges(selection);
    const startBlockPath = Path.parent(startPoint.path);
    const endBlockPath = Path.parent(endPoint.path);
    const startBlock = Node.get(editor, startBlockPath);
    const endBlock = Node.get(editor, endBlockPath);
    return [
      [startBlock, startBlockPath],
      [endBlock, endBlockPath],
    ];
  },
  isCodeBlock([element]) {
    return element.type === CODE_TYPE;
  },
  isCodeLine({ type }) {
    return type === CODE_LINE_TYPE;
  },
  closest(root, path) {
    for (const nodeEntry of Node.ancestors(root, path, { reverse: true })) {
      if (Code.isCodeBlock(nodeEntry)) {
        return nodeEntry;
      }
    }
  },
  codeLineIndent(codeLineBlock, tabSpace = DEFAULT_TABSPACE) {
    const text = Node.string(codeLineBlock);
    return detectIntent(text).indent.replace('/t', tabSpace);
  },

  prevCodeLineIndent(root, path, ...args) {
    const parentBlock = Node.parent(root, path);
    const idx = path[path.length - 1];
    return parentBlock.children.slice(0, idx).map(child => Code.codeLineIndent(child, ...args));
  },

  focusCharWhenCollapsed(editor) {
    const { selection } = editor;
    if (!Range.isCollapsed(selection)) return [false];
    const textElement = Node.get(editor, selection.focus.path);
    const text = textElement.text;
    return [true, text[selection.focus.offset - 1], text[selection.focus.offset]];
  },
};
