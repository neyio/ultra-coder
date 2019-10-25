import SelectionService from './SelectionService';
import { consoleTableVar } from '../../../utils/debug';

//FIXME: 要注意很可能mouseUp在 编辑器外，此处为了实验，事实上也许应该在document上监听，值得探究，此处不再纠结

export const onMouseUp = function(e) {
  console.log(e.target);
  const service = new SelectionService();
  const { selection, range } = service;
  const { collapsed, startContainer, endContainer, commonAncestorContainer } = range;
  consoleTableVar({ collapsed, startContainer, endContainer, commonAncestorContainer });
  console.log(selection, range);
  if (range.collapsed === true) {
    //当前的选区为闭合选区，也就是空光标
    //此处应该什么也不做
  } else {
    const parentNode = service.getRootParentNode();
    // console.log(parentNode.nodeType, parentNode.nodeName);
    if (parentNode.nodeName === '#text') {
      //
      console.log('文本节点,返回e.target', e.target);
    } else {
      console.log('跨选区节点,dom=>', parentNode);
    }
    // range.collapse(false); //使得光标闭合，也就是取消选区，如果为true则为终止处的光标
  }
};

/**
 * 按键 事件
 * @param {event} e
 */
export function inputEventHandler(e) {
  console.log('input data=>', e.data);
  const service = new SelectionService();
  const { selection } = service;
  selection.collapseToEnd(); //selection折叠到尾部
  console.log('光标所在位置', service.getCursor());
}

/**
 * 菜单事件控制
 * @param {*} cmd
 * @param {*} type
 * @param {*} dom
 */
export const toolBarEventHandler = (cmd, type, dom = null) => {
  document.execCommand(cmd, false, type);
  dom && dom.focus();
  return true;
};
