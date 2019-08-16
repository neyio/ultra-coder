import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import Link from 'umi/link';
import styles from './problemTabs.less';
export default class ProblemTabs extends Component {
  static defaultProps = {
    comment: 32,
    solution: 10,
    history: 3,
  };
  render() {
    const {
      id,
      comment = 0,
      solution = 40,
      history = 9,
      tabs = [
        {
          icon: 'profile',
          title: '题目描述',
          link: `/problem/${id}`,
        },
        {
          icon: 'message',
          title: `评论(${comment})`,
          link: `/problem/${id}/description`,
        },
        {
          icon: 'experiment',
          title: `解决方案(${solution})`,
          link: `/problem/${id}/discuss`,
        },
        {
          icon: 'history',
          title: `提交记录(${history})`,
          link: `/problem/${id}/history`,
        },
      ],
    } = this.props;
    return (
      <Row type="flex" justify="start" className={styles.functionRow}>
        {tabs.map((tab, index) => {
          return (
            <Col key={index}>
              <div className={styles.tabButton}>
                <Link to={tab.link}>
                  <Icon type={tab.icon} />
                  {tab.title}
                </Link>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
}
