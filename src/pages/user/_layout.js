import React, { createContext } from 'react';
import router from 'umi/router';
import { ContainerQuery } from 'react-container-query';
import { Menu, Icon, ConfigProvider } from 'antd';
import classNames from 'classnames';
import Header from '../../components/layout/Header';
import query from '../../layouts/config/mediaQuery';
import Debounce from 'lodash-decorators/debounce';
import zhCN from 'antd/es/locale-provider/zh_CN';
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
      <ConfigProvider locale={zhCN}>
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider value={this.getContext()}>
              <>
                <Header />
                <div id="ultra-dashboard" className={classNames(params)}>
                  <main>
                    <aside>
                      <Menu
                        onClick={this.handleClick}
                        style={{
                          width: this.state.collapsed ? 80 : 256,
                          maxHeight: '100%',
                          overflow: 'scroll',
                        }}
                        defaultSelectedKeys={['/my-grammers']}
                        defaultOpenKeys={['s1', 's2', 's3', 's4']}
                        inlineCollapsed={this.state.collapsed}
                        mode="inline"
                      >
                        <SubMenu
                          key="s1"
                          title={
                            <span>
                              <Icon type="edit" />
                              <span>个人中心</span>
                            </span>
                          }
                        >
                          <Menu.ItemGroup key="g1" title="基本信息">
                            <Menu.Item key="/">个人中心</Menu.Item>
                            <Menu.Item key="/my-grammers">我的教案</Menu.Item>
                            <Menu.Item key="/pre-create">创建教案</Menu.Item>
                          </Menu.ItemGroup>
                          <Menu.ItemGroup key="g2" title="授课管理">
                            <Menu.Item key="/groups">班级群组</Menu.Item>
                            <Menu.Item key="/statistic">统计信息</Menu.Item>
                          </Menu.ItemGroup>
                        </SubMenu>

                        <SubMenu
                          key="s2"
                          title={
                            <span>
                              <Icon type="setting" />
                              <span>做题进展</span>
                            </span>
                          }
                        >
                          <Menu.Item key="/account/setting">账户设置</Menu.Item>
                          <Menu.Item key="/notification">消息通知</Menu.Item>
                        </SubMenu>
                        <SubMenu
                          key="s3"
                          title={
                            <span>
                              <Icon type="setting" />
                              <span>收藏列表</span>
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
                              <Icon type="setting" />
                              <span>比赛列表</span>
                            </span>
                          }
                        >
                          <Menu.Item key="/account/setting">账户设置</Menu.Item>
                          <Menu.Item key="/notification">消息通知</Menu.Item>
                        </SubMenu>
                      </Menu>
                    </aside>

                    <section className="container">
                      {this.props.children}
                      <footer className="ultra-layout-footer">
                        Neyio's Coorperation Studio For Next Generation Teaching Plan.
                      </footer>
                    </section>
                  </main>
                </div>
              </>
            </Context.Provider>
          )}
        </ContainerQuery>
      </ConfigProvider>
    );
  }
}
export default Dashboard;
