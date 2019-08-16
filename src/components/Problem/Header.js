import React, { Component } from 'react';
import { Row, Col, Button, Divider } from 'antd';
import styles from './header.less';
// import styled from 'styled-components';
const Label = props => {
  return <div className={styles.headerLabel}>{props.children}</div>;
};
const Counter = props => {
  return <div className={styles.headerCounter}>{props.number}</div>;
};
export default class Header extends Component {
  render() {
    return (
      <Row type="flex" className={styles.header}>
        <Col span={16}>
          <h4 className={styles.headerTitle}>1071.字符串的最大公因子</h4>
          <div className={styles.headerContent}>
            <span>难度</span>
            <span className={styles.success}>简单</span>
            <Button icon="like" size="small" type="link">
              37
            </Button>
            <Button icon="dislike" size="small" type="link">
              0
            </Button>
            <Button icon="heart" size="small" type="link">
              收藏
            </Button>
            <Button icon="share-alt" size="small" type="link">
              分享
            </Button>
          </div>
        </Col>
        <Col span={8}>
          <Row type="flex" justify="end" align="middle" style={{ height: '100%' }}>
            <Col align="center">
              <Label>通过次数</Label>
              <Counter number={'11,234'} />
            </Col>
            <Divider type="vertical" className={styles.verticalDivider} />
            {/* <div className={styles.verticalDivider} /> */}
            <Col align="center">
              <Label>提交次数</Label>
              <Counter number={'11,456'} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
