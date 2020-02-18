import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { css } from 'emotion';
import {
  PageHeader,
  Button,
  Statistic,
  Alert,
  Input,
  Typography,
  Divider,
  Row,
  Col,
  Icon,
} from 'antd';

import { NAMESPACE } from '@/models/request';
import { connect } from 'dva';

const { TextArea } = Input;
const { Paragraph, Title } = Typography;

const mapState = state => {
  return {
    restfulApiRequest: state[NAMESPACE].restfulApiRequest,
  };
};
const mapActions = dispatch => {
  return {};
};

// @connect(mapState, mapActions)

const Welcome = () => {
  const [now, setNow] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 5) {
        clearInterval(timer);
      }
      setCount(now + 1);
      setNow(
        Moment()
          .locale('zh-CN')
          .format('LLL'),
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div>
      <PageHeader
        title="控制台"
        style={{ margin: '-1rem -2rem 1rem -2rem', borderBottom: '1px solid #ececec' }}
      />
      {count < 5 ? (
        <Alert
          message={<div className="content"> 欢迎回来，亲爱的板书用户</div>}
          description={`当前是${now}`}
          type="info"
          closable
        />
      ) : null}
      <Title level={4}>数据统计</Title>
      <Row
        gutter={16}
        className={css`
          min-height: 90px;
        `}
      >
        <Col span={6}>
          <Statistic title="教案数量" value={1} prefix={<Icon type="container" />} />
        </Col>
        <Col span={6}>
          <Statistic title="讲述次数" value={2} prefix={<Icon type="video-camera" />} />
        </Col>

        <Col span={6}>
          <Statistic title="授课群组" value={3} prefix={<Icon type="like" />} />
        </Col>
        <Col span={6}>4</Col>
      </Row>

      <Title level={4}>最近使用</Title>
      <div className="n-function-container n-tutorials">{5}</div>

      <Title level={4}>快速上手指南</Title>

      <Divider dashed />
      <Title level={4}>有其他需求？</Title>
      <Paragraph style={{ borderLeft: '3px solid #999', paddingLeft: '1rem' }}>
        我们真挚地希望用户您能对小板书[Tinyblackboard]提出宝贵的改进意见，让我们工程师使得它变得更好。我们也很乐意接受产品灵感，这些珍贵的需求，是让小板书不断服务好用户的持久动力源泉。
      </Paragraph>
      <div
        className="n-function-container"
        style={{ flexDirection: 'column', display: 'flex', marginTop: '1rem' }}
      >
        <TextArea rows={5} placeholder="请输入您对本款产品的建议" />
        <Divider />
        <Row gutter={8}>
          <Col span={8}>
            <Input addonBefore="联系方式" placeholder="如果可以，请留下您的联系方式" />
          </Col>
          <Col span={8}>
            <Button type="primary">提交建议</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default connect(mapState, mapActions)(Welcome);
