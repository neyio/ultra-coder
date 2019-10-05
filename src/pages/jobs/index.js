import React, { Component } from 'react';

import styles from './index.less';
import styled from 'styled-components';
import { Card, Icon, Avatar, Row, Col } from 'antd';

const { Meta } = Card;
const Container = styled.section`
  padding: 0;
`;
const Ad = styled.div`
  background: url(${props => props.url}) no-repeat;
  //   background-size: contain;
  margin: 2rem 0 1rem 0;
  height: 60px;
  width: 1280px;
  background-position: center;
  background-clip: content-box;
`;
export default class index extends Component {
  render() {
    const data = Array.from({
      length: 6,
    });
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>工作机会</h2>
        <h5 className={styles.subTitle}>了解相关合作企业的职位信息</h5>
        <Ad
          url={
            'https://hbimg-other.huabanimg.com/img/promotion/990b0e533748d952dd23b302ad97a3235989dedf241d4'
          }
        />
        <Container>
          <Row gutter={15}>
            {data.map((_, i) => {
              return (
                <Col span={6} key={i}>
                  <Card
                    className={styles.card}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <Icon type="setting" key="setting" />,
                      <Icon type="edit" key="edit" />,
                      <Icon type="ellipsis" key="ellipsis" />,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}
