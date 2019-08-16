import React from 'react';
import Link from 'umi/link';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import classnames from 'classnames';
import Header from './header';
import styles from './_layout.less';
const ProblemContainer = styled.section``;
const CodeContainer = styled.section``;

export default function Layout(props) {
  const { id } = props.match.params;
  return (
    <section>
      <Header />
      <Row type="flex" justify="start" className={styles.functionRow}>
        <Col>
          <div className={styles.tabButton}>
            <Link to={`/problem/${id}`}>
              <Icon type="profile" />
              题目描述
            </Link>
          </div>
        </Col>
        <Col>
          <div className={classnames(styles.tabButton)}>
            <Link to={`/problem/${id}/description`}>
              <Icon type="message" />
              评论(3)
            </Link>
          </div>
        </Col>
        <Col className={styles.active}>
          <div className={classnames(styles.tabButton)}>
            <Link to={`/problem/${id}/discuss`}>
              <Icon type="experiment" /> 解决方案(40)
            </Link>
          </div>
        </Col>
        <Col>
          <div className={classnames(styles.tabButton)}>
            <Link to={`/problem/${id}/discuss`}>
              <Icon type="history" /> 提交记录
            </Link>
          </div>
        </Col>
      </Row>
      <ProblemContainer>{props.children}</ProblemContainer>
      <CodeContainer>
        <code>hello world!</code>
      </CodeContainer>
    </section>
  );
}
