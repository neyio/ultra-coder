import ExploreCard from '../../components/ExploreCard';
import { Row, Col } from 'antd';
import styles from './index.less';
const Explore = props => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>探索</h2>
      <Row gutter={10}>
        <Col span={5}>
          <ExploreCard />
        </Col>
        <Col span={5}>
          <ExploreCard />
        </Col>
        <Col span={5}>
          <ExploreCard />
        </Col>
        <Col span={5}>
          <ExploreCard />
        </Col>
      </Row>

      <h2 className={styles.title}>探索</h2>
      <Row gutter={10}>
        <Col span={5}>
          <ExploreCard />
        </Col>
        <Col span={5}>
          <ExploreCard />
        </Col>
        <Col span={5}>
          <ExploreCard />
        </Col>
        <Col span={5}>
          <ExploreCard />
        </Col>
      </Row>
      <h2 className={styles.title}>探索</h2>
      <Row gutter={10}>
        <Col span={5}>
          <ExploreCard />
        </Col>
        <Col span={5}>
          <ExploreCard />
        </Col>
        <Col span={5}>
          <ExploreCard />
        </Col>
        <Col span={5}>
          <ExploreCard />
        </Col>
      </Row>
    </div>
  );
};
export default Explore;
