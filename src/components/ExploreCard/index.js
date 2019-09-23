import { Progress, Card, Icon } from 'antd';
import styles from './index.less';

export default function(props) {
  const {
    description = '暂无描述',
    label = '默认标签',
    url = 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    style = {},
    progress = 7, //进度
    part = 5, //章节
    categroy = 28, //栏目
  } = props;
  return (
    <div className={styles.exploreCard}>
      <Card className={styles.labelContainer} hoverable>
        <div
          className={styles.bgContainer}
          style={{
            backgroundImage: `url(${url})`,
            backgroundRepeat: 'no-repeat',
            height: style.height || 200,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <h5 className={styles.description}>{description}</h5>
          <h2 className={styles.label}>{label}</h2>
        </div>
        <figure className={styles.figure}>
          <ul className={styles.figureContent}>
            <li className={styles.figureItem}>
              <Progress
                type="circle"
                percent={progress}
                width={40}
                format={percent => {
                  if (percent >= 100) return <Icon type="check"></Icon>;
                  else return <Icon type="caret-right"></Icon>;
                }}
              ></Progress>
            </li>
            <li className={styles.figureItem}>
              <span className={styles.count}>{part}</span>
              <span className={styles.part}>章节</span>
            </li>
            <li className={styles.figureItem}>
              <span className={styles.count}>{categroy}</span>
              <span className={styles.part}>栏目</span>
            </li>
          </ul>
        </figure>
      </Card>
    </div>
  );
}
