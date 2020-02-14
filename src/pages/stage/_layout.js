import React, { Component } from 'react';
import { ConfigProvider, Layout, Menu, Icon } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { connect } from 'dva';
import Link from 'umi/link';
import Header from '../../components/layout/Header';
import { Divider } from '../../components/layout/Divider';
const { Content, Sider } = Layout;

const { SubMenu } = Menu;

const StageMenu = () => {
  return (
    <Menu
      onClick={e => {
        console.log('click ', e);
      }}
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
            <Link to="/stage/dynamic/list">自动列表</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/stage/dynamic/actor">自动触发器</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Hooks">
          <Menu.Item key="3">
            <Link to="/stage/hooks/usePaginate">usePaginate </Link>
          </Menu.Item>
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

const Stage = ({ children }) => {
  return (
    <Layout>
      <Sider>
        <StageMenu></StageMenu>
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
};

@connect(
  () => {
    return {};
  },
  dispatch => {
    return {};
  },
)
class StageLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <ConfigProvider locale={zhCN}>
          <Header />
          <Divider />
          <main>
            <section>
              <Stage>{this.props.children}</Stage>
            </section>
          </main>
        </ConfigProvider>
      </React.Fragment>
    );
  }
}
export default StageLayout;
