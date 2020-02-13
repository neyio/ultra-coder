import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
const { Content, Sider } = Layout;

const { SubMenu } = Menu;

const StageMenu = () => {
  return (
    <Menu
      onClick={e => {
        console.log('click ', e);
      }}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="mail" />
            <span>混合组件</span>
          </span>
        }
      >
        <Menu.ItemGroup key="g1" title="列表和表格">
          <Menu.Item key="1">
            <Link to="/stage/dynamic/list">Dynamic List</Link>
          </Menu.Item>
          <Menu.Item key="2">Dynamic Table</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="appstore" />
            <span>Navigation Two</span>
          </span>
        }
      >
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu
        key="sub4"
        title={
          <span>
            <Icon type="setting" />
            <span>Navigation Three</span>
          </span>
        }
      >
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default function Stage() {
  return (
    <Layout>
      <Sider style={{ maxWidth: 200 }}>
        <StageMenu style={{ maxWidth: 200 }}></StageMenu>
      </Sider>
      <Content>container</Content>
    </Layout>
  );
}
