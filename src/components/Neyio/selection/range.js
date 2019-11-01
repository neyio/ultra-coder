export default class Range {
  constructor(range, doc) {
    this.range = range;
    this.doc = doc || document;
  }

  startWithImages() {
    const { range, doc } = this;
    if (range.startOffset !== 0 || range.startContainer.nodeType !== 1) {
      return false;
    }
    if (range.startContainer.nodeName.toLowerCase() === 'img') {
      return true;
    }
    const img = range.startContainer.querySelector('img');
    if (!img) {
      return false;
    }

    const treeWalker = doc.createTreeWalker(range.startContainer, NodeFilter.SHOW_ALL, null, false);
    while (treeWalker.nextNode()) {
      const next = treeWalker.currentNode;
      // If we hit the image, then there isn't any text before the image so
      // the image is at the beginning of the range
      if (next === img) {
        break;
      }
      // If we haven't hit the iamge, but found text that contains content
      // then the range doesn't start with an image
      if (next.nodeValue) {
        return false;
      }
    }

    return true;
  }
}
