import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import Context from './_context';
import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/footer';
import { Divider } from '../../components/layout/Divider';
import { connect } from 'dva';
@connect()
class ProblemLayout extends Component {
  componentDidMount() {
    const { loadProblemStatistics } = this.props;
    loadProblemStatistics &&
      loadProblemStatistics(() => {
        console.log('loaded ok!');
      });
  }
  render() {
    const { problem } = this.props;
    return (
      <React.Fragment>
        <ConfigProvider locale={zhCN}>
          <Header />
          {/* Header中可以插入children 作为 Header的内容补充，为单独的block区块 */}
          <Divider />
          {/* 题目区块 前往 $id文件夹中找寻答案吧 */}
          <main className="ultra-problem-main">
            <section className="ultra-container">
              <Context.Provider value={problem}>{this.props.children}</Context.Provider>
            </section>
          </main>
          {/* <Footer /> */}
        </ConfigProvider>
      </React.Fragment>
    );
  }
}
export default ProblemLayout;
