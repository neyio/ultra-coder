import Cursor from '../cursor';
import { CLASS_OR_ID } from '../../config';

/**
 * This file is copy from [medium-editor](https://github.com/yabwe/medium-editor)
 * and customize for specialized use.
 */

import {
  isBlockContainer,
  traverseUp,
  getFirstSelectableLeafNode,
  getClosestBlockContainer,
  getCursorPositionWithinMarkedText,
  findNearestParagraph,
  getTextContent,
  getOffsetOfParagraph,
} from './dom';

const filterOnlyParentElements = node => {
  return isBlockContainer(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
};
/**
 * 选区服务(在下输了)，究竟是怎样的选区策略让这代码这么凶悍和丑陋
 */

class Selection {
  constructor(doc) {
    this.doc = doc; // 需要被注入 ，默认为 document
  }

  /**
   * 查找指定选区的父节点
   * @param {*} testElementFunction
   * @param {*} contentWindow
   * @return {element|false} 父亲节点
   */
  findMatchingSelectionParent(testElementFunction, contentWindow) {
    const selection = contentWindow.getSelection(); //获取指定contentWindow中的全部选区。一般来说只有一个range
    if (selection.rangeCount === 0) {
      return false;
    }
    const range = selection.getRangeAt(0); //第一个选区的对象（在常规浏览器中，默认为仅有一个选区）
    const current = range.commonAncestorContainer; // dom的操作，current为获取共有祖先的property实例，不是方法
    return traverseUp(current, testElementFunction);
  }

  // https://stackoverflow.com/questions/17678843/cant-restore-selection-after-html-modify-even-if-its-the-same-html
  // Tim Down
  //
  // {object} selectionState - 一个导入的选区
  // {DOMElement} root - 选区的父亲节点
  // {boolean} [favorLaterSelectionAnchor] - defaults to false. If true, import the cursor immediately
  //      subsequent to an anchor tag if it would otherwise be placed right at the trailing edge inside the
  //      anchor. This cursor positioning, even though visually equivalent to the user, can affect behavior
  //      in MS IE.不作翻译
  importSelection(selectionState, root, favorLaterSelectionAnchor) {
    if (!selectionState || !root) {
      throw new Error('your must provide a [selectionState] and a [root] element');
    }

    let range = this.doc.createRange(); //构建选区
    range.setStart(root, 0);
    range.collapse(true); //折叠选区到开头区间

    let node = root; //选中节点为根节点
    const nodeStack = []; //节点的栈或队列（需要观测）
    let charIndex = 0;
    let foundStart = false;
    let foundEnd = false;
    let trailingImageCount = 0;
    let stop = false;
    let nextCharIndex;
    let allowRangeToStartAtEndOfNode = false;
    let lastTextNode = null;
    // 当导入一个选区的时候，选区的点位可能是在一个 dom的开头也可能是末尾，从视觉上两者并没有区别，但是我们希望是在一个dom的开头
    // 当然这里有几种情况，我们不能这么做。
    // 1 我们尝试移动光标到结尾的时候，也就是参数 favorLaterSelectionAnchor 为 true的时候
    // 2 选区由一个图片构成图片开头的
    // 3 选区从一个空的block开始，但是具备特征selectionState.emptyBlocksIndex
    // 这些特殊情况我们是不希望它从dom结尾开始的。
    if (
      favorLaterSelectionAnchor ||
      selectionState.startsWithImage ||
      typeof selectionState.emptyBlocksIndex !== 'undefined'
    ) {
      allowRangeToStartAtEndOfNode = true; //标记允许推断结尾在dom的结束区域。
    }

    while (!stop && node) {
      // 只在elements and text nodes进行遍历（其他都是无关忽略项）
      if (node.nodeType > 3) {
        node = nodeStack.pop();
        continue;
      }

      // If we hit a text node, we need to add the amount of characters to the overall count
      if (node.nodeType === 3 && !foundEnd) {
        nextCharIndex = charIndex + node.length;
        // Check if we're at or beyond the start of the selection we're importing
        if (
          !foundStart &&
          selectionState.start >= charIndex &&
          selectionState.start <= nextCharIndex
        ) {
          // 选区允许从尾部开始的几种特殊情况
          if (allowRangeToStartAtEndOfNode || selectionState.start < nextCharIndex) {
            range.setStart(node, selectionState.start - charIndex);
            foundStart = true;
          } else {
            // We're at the end of a text node where the selection could start but we shouldn't
            // make the selection start here because allowRangeToStartAtEndOfNode is false.
            // However, we should keep a reference to this node in case there aren't any more
            // text nodes after this, so that we have somewhere to import the selection to
            lastTextNode = node;
          }
        }
        // We've found the start of the selection, check if we're at or beyond the end of the selection we're importing
        if (foundStart && selectionState.end >= charIndex && selectionState.end <= nextCharIndex) {
          if (!selectionState.trailingImageCount) {
            range.setEnd(node, selectionState.end - charIndex);
            stop = true;
          } else {
            foundEnd = true;
          }
        }
        charIndex = nextCharIndex;
      } else {
        if (selectionState.trailingImageCount && foundEnd) {
          if (node.nodeName.toLowerCase() === 'img') {
            trailingImageCount++;
          }
          if (trailingImageCount === selectionState.trailingImageCount) {
            // Find which index the image is in its parent's children
            let endIndex = 0;
            while (node.parentNode.childNodes[endIndex] !== node) {
              endIndex++;
            }
            range.setEnd(node.parentNode, endIndex + 1);
            stop = true;
          }
        }

        if (!stop && node.nodeType === 1) {
          //如果尚未遍历结束，则将所有的节点推入栈中（childNodes并不是数组，类数组对象，非数组实例，所以需要用while遍历）
          let i = node.childNodes.length - 1;
          while (i >= 0) {
            nodeStack.push(node.childNodes[i--]);
          }
        }
      }

      if (!stop) {
        node = nodeStack.pop(); //每次检测一个dom节点
      }
    }

    // 如果我们遍历了文本，但是找不到文本节点的开头，那么我们只能选择上一段文本节点的结尾作为开头了。
    if (!foundStart && lastTextNode) {
      range.setStart(lastTextNode, lastTextNode.length);
      range.setEnd(lastTextNode, lastTextNode.length);
    }

    //如果是
    if (typeof selectionState.emptyBlocksIndex !== 'undefined') {
      range = this.importSelectionMoveCursorPastBlocks(
        root,
        selectionState.emptyBlocksIndex,
        range,
      );
    }

    // If the selection is right at the ending edge of a link, put it outside the anchor tag instead of inside.
    if (favorLaterSelectionAnchor) {
      range = this.importSelectionMoveCursorPastAnchor(selectionState, range);
    }

    this.selectRange(range);
  }

  // Utility method called from importSelection only
  importSelectionMoveCursorPastAnchor(selectionState, range) {
    const nodeInsideAnchorTagFunction = function(node) {
      return node.nodeName.toLowerCase() === 'a';
    };
    if (
      selectionState.start === selectionState.end &&
      range.startContainer.nodeType === 3 &&
      range.startOffset === range.startContainer.nodeValue.length &&
      traverseUp(range.startContainer, nodeInsideAnchorTagFunction)
    ) {
      let prevNode = range.startContainer;
      let currentNode = range.startContainer.parentNode;
      while (currentNode !== null && currentNode.nodeName.toLowerCase() !== 'a') {
        if (currentNode.childNodes[currentNode.childNodes.length - 1] !== prevNode) {
          currentNode = null;
        } else {
          prevNode = currentNode;
          currentNode = currentNode.parentNode;
        }
      }
      if (currentNode !== null && currentNode.nodeName.toLowerCase() === 'a') {
        let currentNodeIndex = null;
        for (
          let i = 0;
          currentNodeIndex === null && i < currentNode.parentNode.childNodes.length;
          i++
        ) {
          if (currentNode.parentNode.childNodes[i] === currentNode) {
            currentNodeIndex = i;
          }
        }
        range.setStart(currentNode.parentNode, currentNodeIndex + 1);
        range.collapse(true);
      }
    }
    return range;
  }

  // Uses the emptyBlocksIndex calculated by getIndexRelativeToAdjacentEmptyBlocks
  // to move the cursor back to the start of the correct paragraph
  importSelectionMoveCursorPastBlocks(root, index = 1, range) {
    const treeWalker = this.doc.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT,
      filterOnlyParentElements,
      false,
    );
    const startContainer = range.startContainer;
    let startBlock;
    let targetNode;
    let currIndex = 0;
    // If index is 0, we still want to move to the next block

    // Chrome counts newlines and spaces that separate block elements as actual elements.
    // If the selection is inside one of these text nodes, and it has a previous sibling
    // which is a block element, we want the treewalker to start at the previous sibling
    // and NOT at the parent of the textnode
    if (startContainer.nodeType === 3 && isBlockContainer(startContainer.previousSibling)) {
      startBlock = startContainer.previousSibling;
    } else {
      startBlock = getClosestBlockContainer(startContainer);
    }

    // Skip over empty blocks until we hit the block we want the selection to be in
    while (treeWalker.nextNode()) {
      if (!targetNode) {
        // Loop through all blocks until we hit the starting block element
        if (startBlock === treeWalker.currentNode) {
          targetNode = treeWalker.currentNode;
        }
      } else {
        targetNode = treeWalker.currentNode;
        currIndex++;
        // We hit the target index, bail
        if (currIndex === index) {
          break;
        }
        // If we find a non-empty block, ignore the emptyBlocksIndex and just put selection here
        if (targetNode.textContent.length > 0) {
          break;
        }
      }
    }

    if (!targetNode) {
      targetNode = startBlock;
    }

    // We're selecting a high-level block node, so make sure the cursor gets moved into the deepest
    // element at the beginning of the block
    range.setStart(getFirstSelectableLeafNode(targetNode), 0);

    return range;
  }

  // https://stackoverflow.com/questions/4176923/html-of-selected-text
  // by Tim Down
  getSelectionHtml() {
    const sel = this.doc.getSelection();
    let i;
    let html = '';
    let len;
    let container;
    if (sel.rangeCount) {
      container = this.doc.createElement('div'); //是否可以使用createFragment
      for (i = 0, len = sel.rangeCount; i < len; i += 1) {
        container.appendChild(sel.getRangeAt(i).cloneContents());
      }
      html = container.innerHTML;
    }
    return html;
  }

  chopHtmlByCursor(root) {
    const { left } = this.getCaretOffsets(root);
    const markedText = root.textContent;
    const { type, info } = getCursorPositionWithinMarkedText(markedText, left);
    const pre = markedText.slice(0, left);
    const post = markedText.slice(left);
    switch (type) {
      case 'OUT':
        return {
          pre,
          post,
        };
      case 'IN':
        return {
          pre: `${pre}${info}`,
          post: `${info}${post}`,
        };
      case 'LEFT':
        return {
          pre: markedText.slice(0, left - info),
          post: markedText.slice(left - info),
        };
      case 'RIGHT':
        return {
          pre: markedText.slice(0, left + info),
          post: markedText.slice(left + info),
        };
      default:
    }
  }

  /**
   *  Find the caret position within an element irrespective of any inline tags it may contain.
   *
   *  @param {DOMElement} An element containing the cursor to find offsets relative to.
   *  @param {Range} A Range representing cursor position. Will window.getSelection if none is passed.
   *  @return {Object} 'left' and 'right' attributes contain offsets from beginning and end of Element
   */
  getCaretOffsets(element, range) {
    let preCaretRange;
    let postCaretRange;

    if (!range) {
      range = window.getSelection().getRangeAt(0);
    }

    preCaretRange = range.cloneRange();
    postCaretRange = range.cloneRange();

    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    postCaretRange.selectNodeContents(element);
    postCaretRange.setStart(range.endContainer, range.endOffset);

    return {
      left: preCaretRange.toString().length,
      right: postCaretRange.toString().length,
    };
  }

  selectNode(node) {
    const range = this.doc.createRange();
    range.selectNodeContents(node);
    this.selectRange(range);
  }

  select(startNode, startOffset, endNode, endOffset) {
    const range = this.doc.createRange();
    range.setStart(startNode, startOffset);
    if (endNode) {
      range.setEnd(endNode, endOffset);
    } else {
      range.collapse(true);
    }
    this.selectRange(range);
    return range;
  }

  setFocus(focusNode, focusOffset) {
    const selection = this.doc.getSelection();
    selection.extend(focusNode, focusOffset);
  }

  /**
   *  Clear the current highlighted selection and set the caret to the start or the end of that prior selection, defaults to end.
   *
   *  @param {boolean} moveCursorToStart  A boolean representing whether or not to set the caret to the beginning of the prior selection.
   */
  clearSelection(moveCursorToStart) {
    const { rangeCount } = this.doc.getSelection();
    if (!rangeCount) return;
    if (moveCursorToStart) {
      this.doc.getSelection().collapseToStart();
    } else {
      this.doc.getSelection().collapseToEnd();
    }
  }

  /**
   * Move cursor to the given node with the given offset.
   *
   * @param  {DomElement}  node    Element where to jump
   * @param  {integer}     offset  Where in the element should we jump, 0 by default
   */
  moveCursor(node, offset) {
    this.select(node, offset);
  }

  getSelectionRange() {
    const selection = this.doc.getSelection();
    if (selection.rangeCount === 0) {
      return null;
    }
    return selection.getRangeAt(0);
  }

  selectRange(range) {
    const selection = this.doc.getSelection();

    selection.removeAllRanges();
    selection.addRange(range);
  }

  // https://stackoverflow.com/questions/1197401/
  // how-can-i-get-the-element-the-caret-is-in-with-javascript-when-using-contenteditable
  // by You
  getSelectionStart() {
    const node = this.doc.getSelection().anchorNode;
    const startNode = node && node.nodeType === 3 ? node.parentNode : node;

    return startNode;
  }

  setCursorRange(cursorRange) {
    const { anchor, focus } = cursorRange;
    const anchorParagraph = document.querySelector(`#${anchor.key}`);
    const focusParagraph = document.querySelector(`#${focus.key}`);
    const getNodeAndOffset = (node, offset) => {
      if (node.nodeType === 3) {
        return {
          node,
          offset,
        };
      }

      const childNodes = node.childNodes;
      const len = childNodes.length;
      let i;
      let count = 0;
      for (i = 0; i < len; i++) {
        const child = childNodes[i];
        const textContent = getTextContent(child, [
          CLASS_OR_ID.AG_MATH_RENDER,
          CLASS_OR_ID.AG_RUBY_RENDER,
        ]);
        const textLength = textContent.length;
        if (child.classList && child.classList.contains(CLASS_OR_ID.AG_FRONT_ICON)) {
          continue;
        }
        // Fix #1460 - put the cursor at the next text node or element if it can be put at the last of /^\n$/ or the next text node/element.
        if (/^\n$/.test(textContent) ? count + textLength > offset : count + textLength >= offset) {
          if (child.classList && child.classList.contains('ag-inline-image')) {
            const imageContainer = child.querySelector('.ag-image-container');
            const hasImg = imageContainer.querySelector('img');

            if (!hasImg) {
              return {
                node: child,
                offset: 0,
              };
            }
            if (count + textLength === offset) {
              if (child.nextElementSibling) {
                return {
                  node: child.nextElementSibling,
                  offset: 0,
                };
              } else {
                return {
                  node: imageContainer,
                  offset: 1,
                };
              }
            } else if (count === offset && count === 0) {
              return {
                node: imageContainer,
                offset: 0,
              };
            } else {
              return {
                node: child,
                offset: 0,
              };
            }
          } else {
            return getNodeAndOffset(child, offset - count);
          }
        } else {
          count += textLength;
        }
      }
      return { node, offset };
    };

    let { node: anchorNode, offset: anchorOffset } = getNodeAndOffset(
      anchorParagraph,
      anchor.offset,
    );
    let { node: focusNode, offset: focusOffset } = getNodeAndOffset(focusParagraph, focus.offset);

    if (
      anchorNode.nodeType === 3 ||
      (anchorNode.nodeType === 1 && !anchorNode.classList.contains('ag-image-container'))
    ) {
      anchorOffset = Math.min(anchorOffset, anchorNode.textContent.length);
      focusOffset = Math.min(focusOffset, focusNode.textContent.length);
    }

    // First set the anchor node and anchor offset, make it collapsed
    this.select(anchorNode, anchorOffset);
    // Secondly, set the focus node and focus offset.
    this.setFocus(focusNode, focusOffset);
  }

  isValidCursorNode(node) {
    if (!node) return false;
    if (node.nodeType === 3) {
      node = node.parentNode;
    }

    return node.closest('span.ag-paragraph');
  }

  getCursorRange() {
    let { anchorNode, anchorOffset, focusNode, focusOffset } = this.doc.getSelection();
    const isAnchorValid = this.isValidCursorNode(anchorNode);
    const isFocusValid = this.isValidCursorNode(focusNode);
    let needFix = false;
    if (!isAnchorValid && isFocusValid) {
      needFix = true;
      anchorNode = focusNode;
      anchorOffset = focusOffset;
    } else if (isAnchorValid && !isFocusValid) {
      needFix = true;
      focusNode = anchorNode;
      focusOffset = anchorOffset;
    } else if (!isAnchorValid && !isFocusValid) {
      const editor = document.querySelector('#ag-editor-id').parentNode;
      editor.blur();

      return new Cursor({
        start: null,
        end: null,
        anchor: null,
        focus: null,
      });
    }

    // fix bug click empty line, the cursor will jump to the end of pre line.
    if (
      anchorNode === focusNode &&
      anchorOffset === focusOffset &&
      anchorNode.textContent === '\n' &&
      focusOffset === 0
    ) {
      focusOffset = anchorOffset = 1;
    }

    const anchorParagraph = findNearestParagraph(anchorNode);
    const focusParagraph = findNearestParagraph(focusNode);

    let aOffset = getOffsetOfParagraph(anchorNode, anchorParagraph) + anchorOffset;
    let fOffset = getOffsetOfParagraph(focusNode, focusParagraph) + focusOffset;

    // fix input after image.
    if (
      anchorNode === focusNode &&
      anchorOffset === focusOffset &&
      anchorNode.parentNode.classList.contains('ag-image-container') &&
      anchorNode.previousElementSibling &&
      anchorNode.previousElementSibling.nodeName === 'IMG'
    ) {
      const imageWrapper = anchorNode.parentNode.parentNode;
      const preElement = imageWrapper.previousElementSibling;
      aOffset = 0;
      if (preElement) {
        aOffset += getOffsetOfParagraph(preElement, anchorParagraph);
        aOffset += getTextContent(preElement, [
          CLASS_OR_ID.AG_MATH_RENDER,
          CLASS_OR_ID.AG_RUBY_RENDER,
        ]).length;
      }
      aOffset += getTextContent(imageWrapper, [
        CLASS_OR_ID.AG_MATH_RENDER,
        CLASS_OR_ID.AG_RUBY_RENDER,
      ]).length;
      fOffset = aOffset;
    }

    if (
      anchorNode === focusNode &&
      anchorNode.nodeType === 1 &&
      anchorNode.classList.contains('ag-image-container')
    ) {
      const imageWrapper = anchorNode.parentNode;
      const preElement = imageWrapper.previousElementSibling;
      aOffset = 0;
      if (preElement) {
        aOffset += getOffsetOfParagraph(preElement, anchorParagraph);
        aOffset += getTextContent(preElement, [
          CLASS_OR_ID.AG_MATH_RENDER,
          CLASS_OR_ID.AG_RUBY_RENDER,
        ]).length;
      }
      if (anchorOffset === 1) {
        aOffset += getTextContent(imageWrapper, [
          CLASS_OR_ID.AG_MATH_RENDER,
          CLASS_OR_ID.AG_RUBY_RENDER,
        ]).length;
      }
      fOffset = aOffset;
    }

    const anchor = { key: anchorParagraph.id, offset: aOffset };

    const focus = { key: focusParagraph.id, offset: fOffset };
    const result = new Cursor({ anchor, focus });

    if (needFix) {
      this.setCursorRange(result);
    }

    return result;
  }

  // topOffset is the line counts above cursor, and bottomOffset is line counts bellow cursor.
  getCursorYOffset(paragraph) {
    const { y } = this.getCursorCoords();
    const { height, top } = paragraph.getBoundingClientRect();
    const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight);
    const topOffset = Math.round((y - top) / lineHeight);
    const bottomOffset = Math.round((top + height - lineHeight - y) / lineHeight);

    return {
      topOffset,
      bottomOffset,
    };
  }

  getCursorCoords() {
    const sel = this.doc.getSelection();
    let range;
    let x = 0;
    let y = 0;
    let width = 0;

    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
        // range.collapse(true)
        let rects = range.getClientRects();
        if (rects.length === 0) {
          rects =
            range.startContainer && range.startContainer.nodeType === Node.ELEMENT_NODE
              ? range.startContainer.getClientRects()
              : [];
        }
        if (rects.length) {
          const { left, top, x: rectX, y: rectY, width: rWidth } = rects[0];
          x = rectX || left;
          y = rectY || top;
          width = rWidth;
        }
      }
    }

    return { x, y, width };
  }

  getSelectionEnd() {
    const node = this.doc.getSelection().focusNode;
    const endNode = node && node.nodeType === 3 ? node.parentNode : node;

    return endNode;
  }
}

export default new Selection(document);
