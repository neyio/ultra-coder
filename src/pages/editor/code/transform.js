import { Editor, Range, Node, Transforms } from 'slate';
import { CODE_TYPE, CODE_LINE_TYPE, tabLength } from './config';
import { Code } from './index';

const DEFAULT_TABLENGTH = tabLength;

const insertCharAtOffset = (str, offset, ch) => {
  const leftStr = str.slice(0, offset);
  const rightStr = str.slice(offset);
  return Array.prototype.join.call([leftStr, ch, rightStr], '');
};

const commentReg = /^(\s*)\/\//;
// const emptyReg = /^(\s*)/;
// const tabSpace = ' '.repeat(option.tabLength);

export default {
  moveRange(range, opt) {
    const { start, end } = Object.assign({ start: 0, end: 0 }, opt);
    const [startPoint, endPoint] = Range.edges(range);
    const newStartPoint = { ...startPoint, offset: startPoint.offset + start };
    const newEndPoint = { ...endPoint, offset: endPoint.offset + end };
    return Range.isForward(range)
      ? { anchor: newStartPoint, focus: newEndPoint }
      : { anchor: newEndPoint, focus: newStartPoint };
  },
  insertCodeBlock(editor, language, { initialText = 'const', at }) {
    return Transforms.insertNodes(
      editor,
      {
        type: CODE_TYPE,
        language,
        children: [
          {
            type: CODE_LINE_TYPE,
            children: [{ text: initialText, marks: [] }],
          },
        ],
      },
      { at },
    );
  },
  // moveNodeAfterAnotherNode(editor, node, anotherNode) {
  //   const parentBlock = editor.value.document.getParent(anotherNode.key);
  //   const offset = parentBlock.nodes.indexOf(anotherNode);
  //   return Transforms.moveNodeByKey(node.key, parentBlock.key, offset + 1);
  // },
  exitCodeBlock(editor) {
    const { selection } = editor;
    const [startPoint] = Range.edges(selection);
    const [, path] = Code.closest(editor, startPoint.path);
    const len = path.length;
    const newPath = [...path.slice(0, -1), path[len - 1] + 1];
    Editor.withoutNormalizing(editor, () => {
      Transforms.insertNodes(
        editor,
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
        {
          at: newPath,
        },
      );
      return Transforms.select(editor, newPath);
    });
  },
  compensateBrackets(editor, startCh, endCh) {
    const { selection } = editor;
    const [startPoint, endPoint] = Range.edges(selection);
    const startText = Node.get(editor, startPoint.path);
    const endText = Node.get(editor, endPoint.path);

    const startOffset = startPoint.offset;
    const endOffset = endPoint.offset;
    if (startText === endText) {
      const newStartText = insertCharAtOffset(startText.text, startOffset, startCh);
      const newEndText = insertCharAtOffset(newStartText, endOffset + 1, endCh);
      Editor.insertText(editor, newEndText, { at: startPoint.path });
      return Transforms.select(editor, {
        anchor: {
          path: selection.anchor.path,
          offset: selection.anchor.offset + 1,
        },
        focus: {
          path: selection.focus.path,
          offset: selection.focus.offset + 1,
        },
      });
    }
    const newStartText = insertCharAtOffset(startText.text, startOffset, startCh);
    const newEndText = insertCharAtOffset(endText.text, endOffset, endCh);
    Editor.insertText(editor, newStartText, { at: startPoint.path });
    Editor.insertText(editor, newEndText, { at: endPoint.path });
    return Transforms.select(editor, {
      anchor: {
        path: startPoint.path,
        offset: startPoint.offset + 1,
      },
      focus: endPoint,
    });
  },

  addIndent(editor, { at: range, tabLength = DEFAULT_TABLENGTH }) {
    const allTexts = Array.from(Editor.texts(editor, range));
    const newRange = {
      anchor: {
        path: range.anchor.path,
        offset: range.anchor.offset + tabLength,
      },
      focus: {
        path: range.focus.path,
        offset: range.focus.offset + tabLength,
      },
    };
    const tabSpace = ' '.repeat(tabLength);
    return Editor.withoutNormalizing(editor, () => {
      allTexts.forEach(([text, path]) => {
        const textStr = text.text;
        const newStr = tabSpace + textStr;
        Editor.insertText(editor, newStr, { at: path });
      });
      Transforms.select(editor, newRange);
    });
  },

  deleteIndent(editor, { at: range, tabLength = DEFAULT_TABLENGTH }) {
    const allTexts = Array.from(Editor.texts(editor, range));
    const tabSpace = ' '.repeat(tabLength);
    const startText = allTexts[0][0];
    const endText = allTexts[allTexts.length - 1][0];
    let startStep = 0;
    let endStep = 0;
    return Editor.withoutNormalizing(editor, () => {
      allTexts.forEach(([text, path]) => {
        const textStr = text.text;
        const indentLen = Code.codeLineIndent(text, tabSpace).length;
        let newIndentLen = indentLen - tabLength;
        if (newIndentLen < 0) newIndentLen = 0;
        const sliceIdx = indentLen - newIndentLen;
        const newStr = textStr.slice(sliceIdx);
        if (text === startText) startStep = sliceIdx;
        if (text === endText) endStep = sliceIdx;
        Editor.insertText(editor, newStr, { at: path });
      });
      const newRange = Range.isCollapsed(range)
        ? Code.moveRange(range, { start: -startStep, end: -startStep })
        : Code.moveRange(range, { start: -startStep, end: -endStep });
      Transforms.select(editor, newRange);
    });
  },

  toggleCommentCodeLine(editor, { at: range }) {
    const allTexts = Array.from(Editor.texts(editor, range));
    const startText = allTexts[0][0];
    const endText = allTexts[allTexts.length - 1][0];
    const isAllCommenLine = allTexts
      .map(([text]) => commentReg.test(text.text))
      .reduce((acc, has) => acc && has);
    const [startPoint, endPoint] = Range.edges(range);
    if (!isAllCommenLine) {
      const indentNum = Math.min(...allTexts.map(([text]) => Code.codeLineIndent(text).length));
      const indent = ' '.repeat(indentNum);
      // add comment
      const startStep = indentNum >= startPoint.offset ? 0 : 2; // '//'.length ===3
      const endStep = indentNum >= endPoint.offset ? 0 : 2;
      const newRange = Range.isCollapsed(range)
        ? Code.moveRange(range, { start: startStep, end: startStep })
        : Code.moveRange(range, { start: startStep, end: endStep });
      allTexts.forEach(([text, path]) => {
        const textStr = text.text;
        const newStr = textStr.replace(indent, `${indent}//`);
        return Editor.insertText(editor, newStr, { at: path });
      });
      return Transforms.select(editor, newRange);
    } else {
      const a = commentReg.exec(startText.text)[1].length;
      const b = commentReg.exec(endText.text)[1].length;
      // const startStep = a >= startPoint.offset ? 0 : 2;
      const c = a >= startPoint.offset ? 0 : 2;
      // const endStep = b >= endPoint.offset ? 0 : 2;
      const d = b >= endPoint.offset ? 0 : 2;
      const newRange = Code.moveRange(range, { start: -c, end: -d });
      allTexts.forEach(([text, path]) => {
        const textStr = text.text;
        const newStr = textStr.replace(commentReg, '$1');
        return Editor.insertText(editor, newStr, { at: path });
      });
      return Transforms.select(editor, newRange);
    }
  },
};
