import React, { useState } from 'react';

import assert from 'assert';
import { connect } from 'dva';
import { NAMESPACE } from '../../models/request';

const pickNotInKeys = (obj, keys) =>
  Object.keys(obj).reduce((pre, i) => {
    return keys.includes(i) ? { ...pre } : { ...pre, [i]: obj[i] };
  }, {});

const DynamicAction = WrappedComponent => {
  const Component = ({
    eventType = 'onClick',
    dispatch,
    action = {},
    reduxEvent = null,
    callback = r => {
      console.log(r);
    },
    restfulApiRequest,
    ...props
  }) => {
    const preProps = { eventType, reduxEvent, action, callback, ...props };
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
    const originEventHandler = props[eventType] || (() => {});
    const eventHandler = async () => {
      setLoading(true);
      await originEventHandler();
      try {
        if (reduxEvent) {
          assert(reduxEvent && reduxEvent.type, 'reduxEvent必须包含 type');
          const type = reduxEvent.type;
          const payload = reduxEvent.payload;
          await dispatch({
            type,
            payload: {
              ...payload,
              callback: () => {
                callback(reducer, newProps);
              },
            },
          });
        } else {
          if (action && typeof action === 'object') {
            const { api, params = {}, body = {}, extra = {} } = action;
            assert(api, 'action.api 必须输入，详见 @/apiMap');
            await restfulApiRequest(api, params, body, extra); // 发起请求
            callback(reducer, newProps);
          } else {
            throw new Error(
              'props.action is not an object with attributes [api,body={any queryBody},params={id:x},extra={any}] ',
            );
          }
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    const newProps = { ...preProps, ...observer, [eventType]: eventHandler };
    return (
      <WrappedComponent
        loading={loading ? loading : undefined}
        {...pickNotInKeys(newProps, ['callback', 'action', 'eventType', 'dispatch', 'reduxEvent'])}
        disabled={loading}
      />
    );
  };
  return connect(
    state => ({
      restfulApiRequest: state[NAMESPACE].restfulApiRequest,
    }),
    dispatch => {
      return { dispatch };
    },
  )(Component);
};

export default DynamicAction;
