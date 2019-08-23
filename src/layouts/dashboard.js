import React, { createContext, Fragment } from 'react';
import router from 'umi/router';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import { PageHeader, Divider, Menu, Icon, LocaleProvider } from 'antd';
import classNames from 'classnames';
import query from './config/MediaQuery';
import { Debounce } from 'lodash-decorators';
import NotificationIcon from '../components/NotificationIcon';
import zhCN from 'antd/es/locale-provider/zh_CN';
import LoginButton from './account/components/AuthForm/LoginButton';
const SubMenu = Menu.SubMenu;
const Context = createContext({
  testKey: 'nothing',
});
class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.resizeListener();
  }

  @Debounce(200)
  resizeListener = () => {
    if (window.innerWidth >= 1367 && this.state.collapsed) {
      this.setState({
        collapsed: false,
      });
      console.log(this.state.collapsed);
    }
    if (window.innerWidth < 1367 && !this.state.collapsed) {
      this.setState({ collapsed: true });
      console.log(this.state.collapsed);
    }
  };
  handleClick = e => {
    console.log(e);
    const { key } = e;
    router.push('/dashboard' + key);
  };
  getContext = () => {
    return {
      testKey: 'key',
    };
  };
  render() {
    return (
      <DocumentTitle title="TinyBlakBoard">
        <LocaleProvider locale={zhCN}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div id="ultra-dashboard" className={classNames(params)}>
                  <header className="n-header">
                    <PageHeader
                      title={
                        <Fragment>
                          板书
                          <Divider type="vertical" />
                          TINYBLACKBOARD
                        </Fragment>
                      }
                      subTitle="控制面板"
                      extra={[
                        // <Icon type="edit" />,
                        <div
                          className="ultra-notification-icon"
                          style={{
                            margin: '0 1rem 0 2rem',
                            display: 'inline',
                            position: 'relative',
                            cursor: 'pointer',
                          }}
                          key="0"
                        >
                          <NotificationIcon />
                        </div>,
                        <LoginButton key={1} />,
                      ]}
                    />
                  </header>
                  <main>
                    <aside>
                      <Menu
                        onClick={this.handleClick}
                        style={{ width: this.state.collapsed ? 80 : 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['submenu1', 'submenu2']}
                        inlineCollapsed={this.state.collapsed}
                        mode="inline"
                      >
                        <SubMenu
                          key="submenu1"
                          title={
                            <span>
                              <Icon type="edit" />
                              <span>工作台</span>
                            </span>
                          }
                        >
                          <Menu.ItemGroup key="g1" title="教案中心">
                            <Menu.Item key="/">最近使用</Menu.Item>
                            <Menu.Item key="/my-grammers">我的教案</Menu.Item>
                            <Menu.Item key="/pre-create">创建教案</Menu.Item>
                          </Menu.ItemGroup>
                          <Menu.ItemGroup key="g2" title="授课管理">
                            <Menu.Item key="/groups">班级群组</Menu.Item>
                            <Menu.Item key="/statistic">统计信息</Menu.Item>
                          </Menu.ItemGroup>
                        </SubMenu>

                        <SubMenu
                          key="submenu2"
                          title={
                            <span>
                              <Icon type="setting" />
                              <span>个人中心</span>
                            </span>
                          }
                        >
                          <Menu.Item key="/account/setting">账户设置</Menu.Item>
                          <Menu.Item key="/notification">消息通知</Menu.Item>
                        </SubMenu>
                      </Menu>
                    </aside>
                    <section className="container">{this.props.children}</section>
                  </main>
                  <footer className="ultra-layout-footer">
                    Neyio's Coorperation Studio For Next Generation Teaching Plan.
                  </footer>
                </div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </LocaleProvider>
      </DocumentTitle>
    );
  }
}
export default Dashboard;
