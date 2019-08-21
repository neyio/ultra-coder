import React, { useState } from 'react';
import request from '@/utils/routes';
import assert from 'assert';

const pickNotInKeys = (obj, keys) =>
  Object.keys(obj).reduce((pre, i) => {
    return keys.includes(i) ? { ...pre } : { ...pre, [i]: obj[i] };
  }, {});

const DynamicAction = WrappedComponent => {
  const Component = ({
    eventtype = 'onClick',
    action,
    callback = r => {
      console.log(r);
    },
    ...props
  }) => {
    const preProps = { eventtype, action, callback, ...props };
    const [loading, setLoading] = useState(false);
    const [observer, setObserver] = useState({});
    const reducer = async arg => {
      if (typeof arg === 'object') {
        setObserver(pre => ({ ...pre, ...arg }));
      }
      if (typeof arg === 'function') {
        setObserver(await arg());
      }
    };
    const originEventHandler = props[eventtype] || (() => {});
    const eventHandler = async () => {
      setLoading(true);
      await originEventHandler();
      try {
        if (action && typeof action === 'object') {
          const { keyChain, params = {}, body = {}, extra = {} } = action;
          assert(action.keyChain, 'action.keyChain 必须输入，详见 @/utils/routes');
          await request(keyChain, params, body, extra); // 发起请求
          callback(reducer, newProps);
        } else {
          throw new Error(
            'props.action is not an object with attributes [keyChain,body={any queryBody},params={id:x},extra={any}] ',
          );
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    const newProps = { ...preProps, ...observer, [eventtype]: eventHandler };
    return (
      <WrappedComponent {...pickNotInKeys(newProps, ['callback', 'action'])} disabled={loading} />
    );
  };
  return Component;
};

export default DynamicAction;
