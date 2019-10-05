import React from 'react';
import styled from 'styled-components';
import styles from './_layout.less';
import { PageHeader, Button } from 'antd';
import router from 'umi/router';

const ProblemContainer = styled.div`
  background: transparent;
  height: cacl(100vh - 450px);
  overflow: scroll;
`;
const routes = [
  {
    path: 'index',
    breadcrumbName: '控制台',
  },
  {
    path: 'first',
    breadcrumbName: '题库管理',
  },
  {
    path: 'second',
    breadcrumbName: '题目详情',
  },
];
export default class Layout extends React.Component {
  render() {
    const { props } = this;
    return (
      <div className={styles.contentContainer}>
        <ProblemContainer
          ref={_r => {
            this._problemRef = _r;
          }}
          className={styles.problemContainer}
        >
          <PageHeader
            onBack={() => router.goBack()}
            breadcrumb={{ routes }}
            extra={[
              <Button size="small" key="3">
                提交情况
              </Button>,
              <Button size="small" key="2">
                测试用例
              </Button>,
              <Button size="small" key="1" type="primary">
                编辑
              </Button>,
            ]}
          />
          <div className={styles.subrouterContainer}>{props.children}</div>
        </ProblemContainer>
      </div>
    );
  }
}
