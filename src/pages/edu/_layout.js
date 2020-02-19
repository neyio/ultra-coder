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
    router.push('/edu' + key);
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
                          maxHeight: 'calc(100%-3rem)',
                          height: '100%',
                          overflow: 'scroll',
                        }}
                        defaultSelectedKeys={['/']}
                        defaultOpenKeys={['m1', 'm2']}
                        inlineCollapsed={this.state.collapsed}
                        mode="inline"
                      >
                        <SubMenu
                          key="m1"
                          title={
                            <span>
                              <Icon type="edit" />
                              <span>教学过程管理</span>
                            </span>
                          }
                        >
                          <Menu.Item key="/">最近使用</Menu.Item>
                          <Menu.ItemGroup key="g1" title="库管理">
                            <Menu.Item key="/materials">课件库</Menu.Item>
                            <Menu.Item key="/topics">话题库</Menu.Item>
                            <Menu.Item key="/problems">题库</Menu.Item>
                            <Menu.Item key="/exams">测验库</Menu.Item>
                          </Menu.ItemGroup>
                          <Menu.ItemGroup key="g2" title="授课管理">
                            <Menu.Item key="/atd">考勤情况</Menu.Item>
                            <Menu.Item key="/val">教学评价</Menu.Item>
                          </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu
                          key="m2"
                          title={
                            <span>
                              <Icon type="edit" />
                              <span>在线判题系统</span>
                            </span>
                          }
                        >
                          <Menu.ItemGroup key="gs2" title="基本信息">
                            <Menu.Item key="/oj/">个人中心</Menu.Item>
                            <Menu.Item key="/my-grammers">我的教案</Menu.Item>
                            <Menu.Item key="/pre-create">创建教案</Menu.Item>
                          </Menu.ItemGroup>
                          <Menu.ItemGroup key="gs4" title="授课管理">
                            <Menu.Item key="/groups">班级群组</Menu.Item>
                            <Menu.Item key="/statistic">统计信息</Menu.Item>
                          </Menu.ItemGroup>
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
