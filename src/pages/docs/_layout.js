import React, { createContext } from 'react';
import router from 'umi/router';
import { ContainerQuery } from 'react-container-query';
import { Menu, Icon, ConfigProvider, PageHeader, Button, Descriptions } from 'antd';
import classNames from 'classnames';
import Header from '../../components/layout/Header';
import query from '../../layouts/config/mediaQuery';
import Debounce from 'lodash-decorators/debounce';
import zhCN from 'antd/es/locale-provider/zh_CN';
const SubMenu = Menu.SubMenu;
const Context = createContext({});
const routes = [
  {
    path: 'dashboard',
    breadcrumbName: '工作台',
  },
  {
    breadcrumbName: '我的教案',
  },
];
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
              <React.Fragment>
                <Header />
                <div id="ultra-dashboard" className={classNames(params)}>
                  <main style={{ overflow: 'hidden' }}>
                    <aside>
                      <Menu
                        onClick={this.handleClick}
                        style={{
                          width: this.state.collapsed ? 80 : 256,
                          maxHeight: '100%',
                          overflowY: 'scroll',
                          overflowX: 'hidden',
                        }}
                        defaultSelectedKeys={['/my-grammers']}
                        defaultOpenKeys={['s1', 's2', 's3', 's4']}
                        inlineCollapsed={this.state.collapsed}
                        mode="inline"
                      >
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
                    <section>
                      <PageHeader
                        ghost={false}
                        title="欢迎您"
                        subTitle="控制台数据"
                        breadcrumb={{ routes }}
                        extra={[
                          <Button key="3">Operation</Button>,
                          <Button key="2">Operation</Button>,
                          <Button key="1" type="primary">
                            Primary
                          </Button>,
                        ]}
                      >
                        <Descriptions size="small" column={3}>
                          <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                          <Descriptions.Item label="Association">333</Descriptions.Item>
                          <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                          <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                          <Descriptions.Item label="Remarks">
                            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                          </Descriptions.Item>
                        </Descriptions>
                      </PageHeader>

                      <section
                        className="container"
                        style={{ margin: 0, padding: 0, overflow: 'auto' }}
                      >
                        {this.props.children}
                      </section>

                      <footer className="ultra-layout-footer">
                        Neyio's Coorperation Studio For Next Generation Teaching Plan.
                      </footer>
                    </section>
                  </main>
                </div>
              </React.Fragment>
            </Context.Provider>
          )}
        </ContainerQuery>
      </ConfigProvider>
    );
  }
}
export default Dashboard;
