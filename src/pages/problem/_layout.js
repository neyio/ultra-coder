import React, { Component } from 'react';
import Context from './_context';
import Header from '../../components/layout/header';
// import Footer from '../../components/layout/footer';
import { Divider } from '../../components/layout/divider';
export default class ProblemLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        {/* Header中可以插入children 作为 Header的内容补充，为单独的block区块 */}
        <Divider />
        {/* 题目区块 前往 $id文件夹中找寻答案吧 */}
        <main className="ultra-problem-main">
          <section className="ultra-container">
            <Context.Provider value={{}}>{this.props.children}</Context.Provider>
          </section>
        </main>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}
