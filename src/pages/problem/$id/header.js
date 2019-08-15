import React, { Component } from 'react';
import { Row, Col } from 'antd';

export default class Header extends Component {
  render() {
    return (
      <Row type="flex">
        <Col span={16}>1</Col>
        <Col span={8}>2</Col>
      </Row>
    );
  }
}
