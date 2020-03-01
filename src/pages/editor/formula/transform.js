import { Editor, Transforms } from 'slate';
// import { Formula } from './index';
import { ELEMENT_NAME } from './config';
// import CQ from '../commonQuery';

import { Code } from '../code/index';

export default {
  insertFormula(editor, { initialText = 'sum', at }) {
    return Editor.withoutNormalizing(editor, () => {
      Code.insertCodeBlock(editor, 'latex', { initialText, at });
      Transforms.wrapNodes(editor, { type: ELEMENT_NAME }, { at });
    });
  },
};
