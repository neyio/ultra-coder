import { EVENTS, CLASS_LIST } from '../../constants';

// import { getLinkInfo } from '../utils/getLinkInfo'; FIXME: 请增补该内容

/**
 * 绑定鼠标移入、移除事件
 * @param {*} container 容器DOM
 * @param {*} eventService 事件服务对象
 */
export const mouseBinding = (container, eventService) => {
  const handler = event => {
    const target = event.target;
    const parent = target.parentNode;
    if (parent && parent.tagName === 'A' && parent.classList.contains('ag-inline-rule')) {
      const rect = parent.getBoundingClientRect();
      const reference = {
        getBoundingClientRect() {
          return rect;
        },
      };

      eventService.dispatch(EVENTS.LINK_TOOLS, {
        reference,
        //   linkInfo: getLinkInfo(parent),FIXME:需要增加这个内容
      });
    }
  };
  const leaveHandler = event => {
    const target = event.target;
    const parent = target.parentNode;

    if (parent && parent.tagName === 'A' && parent.classList.contains(CLASS_LIST.INLINE_RULE)) {
      eventService.dispatch(EVENTS.LINK_TOOLS, {
        reference: null,
      });
    }
  };

  eventService.attachDOMEvent(container, 'mouseover', handler);
  eventService.attachDOMEvent(container, 'mouseout', leaveHandler);
};

/**
 * 增加按钮点击事件
 * @param {*} container 容器DOM
 * @param {*} eventService 事件服务对象
 * @param {*} contentState FIXME:？？？
 */
export const mouseDown = (container, eventService, contentState) => {
  const handler = e => {
    const target = e.target;
    if (target.classList && target.classList.contains(CLASS_LIST.DRAG_HANDLER)) {
      contentState.handleMouseDown(e);
    } else if (target && target.closest('tr')) {
      contentState.handleCellMouseDown(e);
    }
  };
  eventService.attachDOMEvent(container, 'mousedown', handler);
};

export default {
  mouseBinding,
  mouseDown,
};
