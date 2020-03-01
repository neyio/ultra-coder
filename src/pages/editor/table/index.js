import { Transforms } from 'slate';

import queries from './query';
import transforms from './transform';

import { onKeyDown } from './handler';
import { renderElement } from './render';

export const Table = {
  ...queries,
  ...transforms,
};
export const TableReact = {
  onKeyDown,
  renderElement,
};
export const withTable = editor => {
  const { normalizeNode } = editor;
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (Table.isTable(node)) {
      if (node.children.length === 0) Transforms.removeNodes(editor, { at: path });
      return;
    }
    if (Table.isRow(node)) {
      if (node.children.length === 0) Transforms.removeNodes(editor, { at: path });
      return;
    }
    if (Table.isCell(node)) {
      if (node.children.length === 0) Transforms.removeNodes(editor, { at: path });
      return;
    }
    normalizeNode(entry);
  };

  return editor;
};
