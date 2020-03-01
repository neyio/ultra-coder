import { Editor, Node, Path, Transforms } from 'slate';
import { ifFlow, Condition } from '@/utils/functional';

// import { ELEMENT_NAME} from './config';

import { Formula } from './index';
// import { Code } from '../code/index';

import CQ from '../commonQuery';
import { isSpace, isEnter, isModE } from '../hotkey';

export const onKeyDown = (event, editor, next) =>
  ifFlow([Condition.or(isSpace, isEnter, isModE), handleSpace], [() => true, next])(
    event,
    editor,
    next,
  );

const MathBlockRegex = /^\$\$(\s)*$/;

function handleSpace(event, editor, next) {
  const [[startElement, startElementPath]] = CQ.edgeElement(editor, { edge: 'start' });
  // const startBlock = editor.value.startBlock;
  const text = Node.string(startElement);
  if (MathBlockRegex.test(text) && startElement.type === 'paragraph') {
    event.preventDefault();
    const pathRef = Editor.pathRef(editor, startElementPath);
    Formula.insertFormula(editor, { at: Path.next(pathRef.current) });
    const nowPath = pathRef.unref();
    nowPath && Transforms.removeNodes(editor, { at: nowPath });
    Transforms.move(editor);
  }
  return next();
}
