import React from 'react';
import { Divider as AntdDivider } from 'antd';
import classnames from 'classnames';

export function Divider() {
  return <AntdDivider className={classnames('ultra-divider')} />;
}
