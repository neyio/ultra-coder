import React from 'react';
const ConditionRenderComponent = props => {
  const { condition, children, otherwise } = props;
  if (typeof condition === 'function') {
    return <>{condition() ? children : otherwise}</>;
  }
  return <>{(condition && children) || otherwise}</>;
};

export default ConditionRenderComponent;
