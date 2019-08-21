import React, { useState } from 'react';
import request from '@/utils/routes';
import assert from 'assert';
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

    return (
      <WrappedComponent
        {...props}
        onClick={async () => {
          setLoading(true);
          await onClick();
          try {
            if (action && typeof action === 'object') {
              const { keyChain, params = {}, body = {}, extra = {} } = action;
              assert(action.keyChain, 'action.keyChain 必须输入，详见 @/utils/routes');
              await request(keyChain, params, body, extra); // 发起请求

              callback(props);
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
