import React from 'react';
import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap.css';

export const Icon = ({ type, message }) => {
  const className = `iconfont icon-${type}`;
  // return <span>{className}</span>;
  return <span className={className} />;
};

export const IconBar = ({ children, className, innerStyle, ...others }) => {
  return (
    <Tooltip {...others} overlay={children}>
      <div contentEditable={false} className={className} style={innerStyle} />
    </Tooltip>
  );
};
