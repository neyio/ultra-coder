import React, { useState, useEffect, forwardRef, Fragment } from 'react';

const getStore = () => {
  return (window || global).g_app;
};

const mountModelToDva = (model, mutiMark = false) => async callback => {
  if (!mutiMark) {
    await getStore().model(model);
  }
  callback(true);
};

const isModelExisted = namespace => getStore()._models.some(m => m.namespace === namespace);

const mountDvaModal = (model, Component) =>
  forwardRef((props, ref) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      if (isModelExisted(model.namespace)) {
        throw new Error(
          '已经多次挂载同一个namespace的模型，请检查namespace的传值,请勿在列表或表格中使用该方式挂载模型，你可以尝试shared方式',
        );
      } else {
        mountModelToDva(model)(() => setMounted(true));
        return () => isModelExisted(model.namespace) && getStore().unmodel(model.namespace);
      }
    }, []);
    return mounted ? <Component {...props} ref={ref} /> : <Fragment />;
  });

const mountSharedDvaModal = (model, Component) => {
  let referenceCount = 0;
  return forwardRef((props, ref) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      mountModelToDva(model, isModelExisted(model.namespace))(() => {
        ++referenceCount;
        setMounted(true);
      });
      return () => {
        --referenceCount;
        referenceCount === 0 &&
          isModelExisted(model.namespace) &&
          window.g_app.unmodel(model.namespace);
      };
    }, []);
    return mounted ? <Component {...props} ref={ref} /> : <Fragment />;
  });
};
export default {
  single: mountDvaModal,
  shared: mountSharedDvaModal,
};
