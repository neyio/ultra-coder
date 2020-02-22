import React, { useEffect } from 'react';
import { Menu } from 'antd';
import router from 'umi/router';

const SubMenu = Menu.SubMenu;

const useMenu = ({
  menu = [
    {
      key: '/stage/dynamic',
      title: '列表和表格',
      children: [
        { key: '/stage/dynamic/list', title: '自动列表', group: 'neo' },
        { key: '/stage/dynamic/actor', title: '触发器', group: 'neo' },
      ],
    },
    {
      key: '/stage/test',
      title: '测试',
      children: [
        { key: '/test/list', title: '测试1' },
        { key: '/test/actor', title: '测试2' },
      ],
    },
  ],
  defaultOpenKeys = [],
  defaultSelectedKeys = [],
  inlineCollapsed = false,
} = {}) => {
  const onClickHandler = e => {
    const { key } = e;
    router.push(key);
  };

  const traversal = children => {
    if (children && children.length) {
      return children.map(item => {
        return item && item.children && item.children.length ? (
          <SubMenu key={item.key} title={item.title}>
            {item.group ? (
              <Menu.ItemGroup key={item.group + '_g'} title={item.group}>
                {traversal(item.children)}
              </Menu.ItemGroup>
            ) : (
              traversal(item.children)
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key}>{item.title}</Menu.Item>
        );
      });
    }
  };
  useEffect(() => {
    console.log('init menu');
    return () => {
      console.log('clean menu');
    };
  }, []);
  return {
    render: (
      <Menu
        onClick={onClickHandler}
        style={{
          width: inlineCollapsed ? 80 : 256,
          maxHeight: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        inlineCollapsed={inlineCollapsed}
        mode="inline"
      >
        {traversal(menu)}
      </Menu>
    ),
  };
};
export default useMenu;
