import queries from './query';
import transforms from './transform';
import { Transforms, Editor, Node } from 'slate';

import { onKeyDown } from './handler';
import { renderElement } from './render';

import { Code } from '../code/index';

export const Formula = {
  ...queries,
  ...transforms,
};
export const FormulaReact = {
  onKeyDown,
  renderElement,
};
export const withFormula = editor => {
  const { normalizeNode } = editor;
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (Formula.isFormula(node)) {
      const pathRefs = [];
      let flag = false;
      for (const [child, childPath] of Node.children(editor, path)) {
        if (!flag && Code.isCodeBlock([child])) {
          flag = true;
          continue;
        }
        const tmp = Editor.pathRef(editor, childPath);

        pathRefs.push(tmp);
      }
      pathRefs.forEach(pathRef => {
        const curr = pathRef.unref();
        curr && Transforms.liftNodes(editor, { at: curr });
      });
      return;
    }
    normalizeNode(entry);
  };

  return editor;
};
