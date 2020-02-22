import React from 'react';
import { Menu } from 'antd';

const LayoutMenu = ({
  onClick = e => {
    console.log(e);
  },
  collapsed = 256,
  defaultSelectedKeys = ['s1'],
  defaultOpenKey = ['s1', 's2', 's3', 's4'],
  children,
}) => {
  return (
    <Menu
      onClick={onClick}
      style={{
        width: collapsed ? 80 : 256,
        maxHeight: '100%',
        overflow: 'scroll',
      }}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKey}
      inlineCollapsed={collapsed}
      mode="inline"
    >
      {children}
    </Menu>
  );
};
export default LayoutMenu;
