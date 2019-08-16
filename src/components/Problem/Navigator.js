import React from 'react';

import { Col, Row, Button } from 'antd';
import classnames from 'classnames';
import styles from './navigator.less';
export default function Navigator() {
  return (
    <Row className={styles.navigator} type="flex" justify="space-between" align="middle">
      <Col>
        <Button icon="ordered-list">题目列表</Button>
      </Col>
      <Row
        className={classnames(styles.navigator, styles.navigatorController)}
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col>
          <Button icon="thunderbolt">随机刷新</Button>
        </Col>
        <Col>
          <Button icon="left">上一题</Button>
          <span className={styles.number}>100 / 994</span>
          <Button icon="right">下一题</Button>
        </Col>
      </Row>
    </Row>
  );
}
