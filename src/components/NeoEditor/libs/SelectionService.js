export default class SelectionService {
  selection = null; //选区
  range = null; //范围
  constructor(selection = null, range = null) {
    if (!selection) {
      this.selection = selection || window.getSelection(); //获取选区
      this.range = range || this.selection.getRangeAt(0); //只存在一个节点，默认不可能多选区，所以直接取0,获取范围
    }
  }
  /**
   * 折叠光标，如果为true则转移至光标的开头出
   * @param {*} toStart 是否将光标移动到开始选区处,默认为结尾处
   *
   */
  collapse(toStart = false) {
    this.range.collapse(toStart);
  }

  /**
   * 获取选区的公约祖先节点
   */
  getRootParentNode() {
    return this.range.commonAncestorContainer;
  }

  /**
   * 获取光标所在位置的节点以及偏移量
   * @return {object} {anchorNode:element,offset:number }
   */
  getCursor() {
    return {
      anchorNode: this.selection.anchorNode,
      offset: this.selection.anchorOffset,
    };
  }
}
