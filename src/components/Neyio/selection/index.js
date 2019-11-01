import Range from './range';
/**
 * 选区的服务
 */
export default class Selection {
  constructor(doc = document) {
    this.doc = doc;
  }
  /**
   * 获取选区的range对象
   *
   * @memberof Selection
   */
  getSelectionRange = () => {
    const selection = this.doc.getSelection();
    if (selection.rangeCount === 0) {
      return null;
    }
    return new Range(selection.getRangeAt(0));
  };

  /**
   * 清除选区并移动光标位置
   * @param {boolean} moveCursorToStart
   */
  clearSelection(moveCursorToStart = false) {
    if (moveCursorToStart) {
      this.doc.getSelection().collapseToStart();
    } else {
      this.doc.getSelection().collapseToEnd();
    }
  }
}
