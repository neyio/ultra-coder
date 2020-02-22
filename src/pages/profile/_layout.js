import React, { createContext } from 'react';
import router from 'umi/router';
import { ContainerQuery } from 'react-container-query';
import { ConfigProvider, Menu, Icon } from 'antd';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import zhCN from 'antd/es/locale-provider/zh_CN';
import Header from '../../components/layout/Header';
import query from '../../layouts/config/mediaQuery';
import LayoutMenu from '../../components/layout/Menu';
const Context = createContext({
  testKey: 'nothing',
});

const { SubMenu } = Menu;
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
    if (window.innerWidth >= 1366 && this.state.collapsed) {
      this.setState({
        collapsed: false,
      });
      console.log(this.state.collapsed);
    }
    if (window.innerWidth < 1366 && !this.state.collapsed) {
      this.setState({ collapsed: true });
      console.log(this.state.collapsed);
    }
  };
  handleClick = e => {
    const { key } = e;
    router.push(key);
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
                      <LayoutMenu collapsed={this.state.collapsed} onClick={this.handleClick}>
                        <React.Fragment>
                          <SubMenu
                            key="s1"
                            title={
                              <React.Fragment>
                                <Icon type="user" />
                                <span>个人中心</span>
                              </React.Fragment>
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
                        </React.Fragment>
                      </LayoutMenu>
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
