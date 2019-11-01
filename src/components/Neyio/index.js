import React, { useState, useEffect, useReducer, useRef } from 'react';
import { eventReducer, stateReducer } from './reducer';
import Content from './components/content';
import { bindingKeydownEvent, bindingMouseupEvent } from './events/core';
const mockClickListener = () => {
  console.log('click is added');
  return 'hello mockClickListener';
};

const clickEventHandler = e => {
  console.log(e.target);
};
const NeoEditor = props => {
  const { container } = props;
  const [count, setCount] = useState(0);
  const [, dispatchEvent] = useReducer(eventReducer, {});
  const [state, dispatch] = useReducer(stateReducer, {});
  const testButtonRef = useRef();
  const ref = useRef();
  const onClick = () => {
    setCount(count + 1);
    dispatch({ type: 'test' });
    dispatchEvent({ type: 'testEvent' });
  };
  const onBindingClick = () => {
    dispatchEvent({
      type: 'attachDOMEvent',
      payload: [testButtonRef.current, 'click', mockClickListener],
      callback: state => {
        setCount(count + 1);
      },
    });
  };
  const onBindingCustomEvent = () => {
    dispatchEvent({
      type: 'attachCustomEvent',
      payload: ['customEventName', mockClickListener],
      callback: state => {
        console.log(state);
      },
    });
  };
  const triggerCustomEvent = () => {
    dispatchEvent({
      type: 'triggerCustomEvent',
      payload: ['customEventName'],
      callback: state => {
        console.log(state.callbackData);
      },
    });
  };
  const offBindingClick = () => {
    dispatchEvent({
      type: 'detachDOMEvent',
      payload: [testButtonRef.current, 'click', mockClickListener],
    });
  };

  const offAllBindingEvents = () => {
    dispatchEvent({
      type: 'detachAllDOMEvents',
    });
  };
  const offAllBindingCustomEvent = () => {
    dispatchEvent({
      type: 'detachAllCustomEvents',
    });
  };
  const offBindingCustomEvent = () => {
    dispatchEvent({
      type: 'detachCustomEvent',
      payload: ['customEventName', mockClickListener],
    });
  };
  useEffect(() => {
    console.log('inited!');
    dispatchEvent({
      type: 'attachDOMEvent',
      payload: [ref.current, 'click', clickEventHandler],
    });
    const offBindings = [
      bindingMouseupEvent(dispatchEvent, ref.current),
      bindingKeydownEvent(dispatchEvent, ref.current),
    ];
    return () => {
      console.log('cleanUp');
      offAllBindingEvents();
      offBindings.forEach(item => item());
    };
  }, [container]);
  return (
    <div>
      <p>hello,{count}</p>
      <button ref={testButtonRef}>被绑定事件的按钮</button>
      <button onClick={onBindingClick}>绑定事件</button>
      <button onClick={offBindingClick}>解除绑定事件</button>
      <button onClick={offAllBindingEvents}>移除所有事件绑定</button>
      <br />
      <button onClick={onBindingCustomEvent}>绑定用户自定义事件</button>
      <button onClick={triggerCustomEvent}>触发用户自定义事件</button>
      <button onClick={offBindingCustomEvent}>解除用户自定义事件</button>
      <button onClick={offAllBindingCustomEvent}>解除用户所有自定义事件</button>
      <button onClick={onClick}>countUp</button>
      <p>state - redux: {state.test} </p>
      <p>
        <button
          onClick={() => {
            dispatchEvent({
              type: 'triggerCustomEvent',
              payload: ['subChildCustomTest'],
            });
          }}
        >
          子成员事件触发
        </button>
      </p>

      <Content dispatchEvent={dispatchEvent} ref={ref} />
    </div>
  );
};
export default NeoEditor;
