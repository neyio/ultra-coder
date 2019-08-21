import React, { useState, useEffect, useCallback, useMemo } from 'react';
import request from '@/utils/routes';
import assert from 'assert';
const pickNotInKeys = (obj, keys) =>
  Object.keys(obj).reduce((pre, i) => {
    return keys.includes(i) ? { ...pre } : { ...pre, [i]: obj[i] };
  }, {});

const DynamicAction = WrappedComponent => {
  const Component = ({
    onClick,
    action,
    callback = r => {
      console.log(r);
    },
    ...props
  }) => {
    const [loading, setLoading] = useState(false);
    const [proxy, setProxy] = useState({ onClick, action, callback, ...props });
    const reducer = state => setProxy(pre => ({ ...pre, ...state }));

    return (
      <WrappedComponent
        {...pickNotInKeys(proxy, ['callback'])}
        onClick={async () => {
          setLoading(true);
          await onClick();
          try {
            if (action && typeof action === 'object') {
              const { keyChain, params = {}, body = {}, extra = {} } = action;
              assert(action.keyChain, 'action.keyChain 必须输入，详见 @/utils/routes');
              await request(keyChain, params, body, extra); // 发起请求
              callback(reducer, proxy);
            } else {
              throw new Error(
                'props.action is not an object with attributes [keyChain,body={any queryBody},params={id:x},extra={any}] ',
              );
            }
          } catch (e) {
            console.error(e);
          }
          setLoading(false);
        }}
        disabled={loading}
      />
    );
  };
  return Component;
};

export default DynamicAction;
