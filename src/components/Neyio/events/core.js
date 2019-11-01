import Selection from '../selection';
//# 1. 首先要绑定的几个CORE事件 ， 键盘按下去的时候，和鼠标up的时候
//  获取光标选区的位置可以在此被测试

const onKeydownHandler = e => {
  console.log('keydown');

};

const onMouseupHandler = e => {
  console.log('mouse up');
  const selection = new Selection();
  console.log(selection.getSelectionRange());
};

export const bindingEvent = (event, eventHandler) => (dispatchEvent, dom) => {
  const payload = [dom, event, eventHandler];
  dispatchEvent({
    type: 'attachDOMEvent',
    payload: payload,
  });
  return () => {
    dispatchEvent({
      type: 'detachDOMEvent',
      payload: payload,
    });
  };
};

export const bindingKeydownEvent = bindingEvent('keydown', onKeydownHandler);
export const bindingMouseupEvent = bindingEvent('mouseup', onMouseupHandler);
