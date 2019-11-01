export const events = {
  // 默认结构
  // click: [
  // {target:'target',listener:listener,useCapture:'useCapture'}
  // {target:'target',listener:othterlistener,useCapture:'useCapture'}
  // ]
};
export let customEvents = {};
export const listeners = {};

/**
 * 使用redux的方式对数据进行管理
 */
export default class Events {
  /**
   * 为目标增加所有的事件
   *
   * @memberof Events
   */
  attachAllEventsToElement = () => {};

  attachCustomEvent = (event, listener) => {
    customEvents[event] = (Array.isArray(customEvents[event]) ? customEvents[event] : []).concat({
      event,
      listener,
    });
    return {
      customEvents: { ...customEvents },
    };
  };
  /**
   * 为多个目标增加事件和监听
   * 并返回当前的events对象
   * @memberof Events
   */
  attachDOMEvent = (targets, event, listener, useCapture = false) => {
    if (!targets) throw new Error('targets must be dom or array<dom>');
    const newEvents = (Array.isArray(targets) ? targets : [targets]).map(target => {
      target.addEventListener(event, listener, useCapture);
      return { target, event, listener, useCapture };
    });
    //拷贝数据到events
    events[event] = ((Array.isArray(events[event]) && events[event]) || []).concat(newEvents);
    //返回的值为新的地址，所以可以放心被用在reducer中 .Tip：其实concat可以要求参数不为数组

    return {
      events: { ...events },
    };
  };
  attachToEachElement = () => {};
  attachToExecCommand = () => {};
  cleanupElement = () => {};
  destroy = () => {};
  detachAllCustomEvents = () => {
    customEvents = {};
    return {
      customEvents,
    };
  };
  /**
   * 移除所有事件绑定
   *
   * @memberof Events
   */
  detachAllDOMEvents = () => {
    Object.keys(events).forEach(eventName => {
      const eventArray = events[eventName] || [];
      eventArray.forEach(({ target, event, listener, useCapture = false }) => {
        target && target.removeEventListener(event, listener, useCapture);
      });
    });
    return { events: {} };
  };

  /**
   * 解除用户自定义的事件
   *
   * @memberof Events
   */
  detachCustomEvent = (event, listener) => {
    const pickedEvents = (customEvents[event] || []).filter(item => {
      return item.listener !== listener;
    });
    customEvents = {
      [event]: pickedEvents,
    };
    return {
      customEvents,
    };
  };

  /**
   * 移除特点的targets、event的对事件绑定
   *
   * @memberof Events
   */
  detachDOMEvent = (targets, event, listener, useCapture = false) => {
    if (!targets) throw new Error('targets must be dom or array<dom>');
    (Array.isArray(targets) || [targets]).forEach(target => {
      events[event] = events[event].filter(evt => {
        if (evt.target === target && evt.event === event) {
          evt.target.removeEventListener(evt.event, listener, useCapture);
          return false; //从数组中排除这些被移除事件的 对象
        }
        return true;
      });
    });
    return { events: { ...events } };
  };

  detachExecCommand = () => {};
  disableCustomEvent = () => {};
  enableCustomEvent = () => {};
  focusElement = () => {};
  handleBlur = () => {};
  handleBodyClick = () => {};
  handleBodyFocus = () => {};
  handleBodyMouseDown = () => {};
  handleDocumentExecCommand = () => {};
  handleDocumentSelectionChange = () => {};
  handleDragging = () => {};
  handleDrop = () => {};
  handleInput = () => {};
  handleKeydown = () => {};
  handleKeypress = () => {};
  handleKeyup = () => {};
  handleMouseover = () => {};
  handlePaste = () => {};
  indexOfCustomListener = () => {};
  setupListener = () => {};
  triggerCustomEvent = (event, data) => {
    const callbackData = (customEvents[event] || []).map(
      item => item.listener && item.listener(data),
    );
    return { callbackData: callbackData.length ? callbackData : null };
  };

  unwrapExecCommand = () => {};
  updateFocus = () => {};
  updateInput = () => {};
  wrapExecCommand = () => {};
}
//
