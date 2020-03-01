import { Node, Range, Path } from 'slate';

export default {
  edgeElement(editor, option) {
    const { edge = 'both' } = option;
    const { selection } = editor;
    const [startPoint, endPoint] = Range.edges(selection);
    let startElement = null;
    let startElementPath = null;
    if (edge === 'start') {
      startElementPath = Path.parent(startPoint.path);
      startElement = Node.get(editor, startElementPath);
      return [[startElement, startElementPath]];
    }
    let endElement = null;
    let endElementPath = null;
    if (edge === 'end') {
      endElementPath = Path.parent(endPoint.path);
      endElement = Node.get(editor, endElementPath);
      return [[endElement, endElementPath]];
    }
    return [
      [startElement, startElementPath],
      [endElement, endElementPath],
    ];
  },

  closest(root, path, match) {
    for (const elementEntry of Node.ancestors(root, path, { reverse: true })) {
      if (match(elementEntry)) return elementEntry;
    }
    return [void 0, void 0];
  },

  ntd(root, path) {
    try {
      return Path.relative(path, root)[0];
    } catch (e) {
      console.warn(e);
      return -1;
    }
  },
};
