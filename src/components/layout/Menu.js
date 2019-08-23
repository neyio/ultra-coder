import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const LayoutMenu = ({
  onClick = e => {
    console.log(e);
  },
  collapsed = 256,
  defaultSelectedKeys = ['s1'],
  defaultOpenKey = ['s1', 's2', 's3', 's4'],
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
      <SubMenu
        key="s1"
        title={
          <>
            <Icon type="user" />
            <span>个人中心</span>
          </>
        }
      >
        <Menu.ItemGroup key="g1" title="生涯进展">
          <Menu.Item key="/career/statistic">统计信息</Menu.Item>
          <Menu.Item key="/career/collection">收藏列表</Menu.Item>
          <Menu.Item key="/career/unpassed">未通过题目</Menu.Item>
          <Menu.Item key="/career/accept">AC题目</Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup key="g2" title="基本信息">
          <Menu.Item key="/profile">个人资料</Menu.Item>
          <Menu.Item key="/profile/account">账号信息</Menu.Item>
          <Menu.Item key="/profile/privacy">隐私信息</Menu.Item>
          <Menu.Item key="/profile/notification">通知设置</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>

      <SubMenu
        key="s2"
        title={
          <span>
            <Icon type="history" />
            <span>做题进展</span>
          </span>
        }
      >
        <Menu.Item key="/history/accept">已通过验证</Menu.Item>
        <Menu.Item key="/history/failed">尝试失败</Menu.Item>
        <Menu.Item key="/history/lost">屡战屡败</Menu.Item>
      </SubMenu>
      <SubMenu
        key="s3"
        title={
          <span>
            <Icon type="calendar" />
            <span>训练班组</span>
          </span>
        }
      >
        <Menu.Item key="/account/setting">账户设置</Menu.Item>
        <Menu.Item key="/notification">消息通知</Menu.Item>
      </SubMenu>
      <SubMenu
        key="s4"
        title={
          <span>
            <Icon type="thunderbolt" />
            <span>比赛记录</span>
          </span>
        }
      >
        <Menu.Item key="/account/setting">账户设置</Menu.Item>
        <Menu.Item key="/notification">消息通知</Menu.Item>
      </SubMenu>
    </Menu>
  );
};
export default LayoutMenu;
