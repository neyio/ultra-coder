import styles from './index.less';
import { Icon } from 'antd';
import LabelButton from './components/LabelButton';
import ArticleList from './components/ArticleList';
const labelButtonMaps = Array.from({ length: 14 }).map((_, i) => ({
  label: '全部话题' + i,
  linkTo: '',
  icon() {
    return <Icon type="appstore" style={{ fontSize: '1.5rem' }}></Icon>;
  },
}));
const Circle = props => {
  return (
    <div className={styles.container}>
      <section className={styles.contentContainer}>
        <h2 className={styles.contentTitle}>兴趣标签</h2>
        <div className={styles.labelContainer}>
          {labelButtonMaps.map(item => {
            return (
              <LabelButton
                key={item.label}
                label={item.label}
                linkTo={item.linkTo}
                icon={item.icon}
              ></LabelButton>
            );
          })}
        </div>
        <ArticleList />
      </section>
      <aside className={styles.asideContainer}>这里是其他这里是其他这里是其他这里是其他</aside>
    </div>
  );
};
export default Circle;
