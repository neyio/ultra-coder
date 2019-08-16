import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import classnames from 'classnames';
import Link from 'umi/link';
import styles from './problemTabs.less';
export default class index extends Component {
  render() {
    const { id } = this.props;
    return (
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
            <Link to={`/problem/${id}/history`}>
              <Icon type="history" /> 提交记录
            </Link>
          </div>
        </Col>
      </Row>
    );
  }
}
