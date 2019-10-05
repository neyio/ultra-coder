import React from 'react';
import Header from '../../../../components/Problem/Header';
import styles from './index.less';
import classnames from 'classnames';
export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className={styles.problemContentContainer}>
          <h3 className={styles.subTitle}>题目描述</h3>
          <div className={styles.caseContent} style={{ marginBottom: '3rem' }}>
            这里是题目内容
          </div>
          <h3 className={styles.subTitle}>输入 :</h3>
          <pre className={classnames(styles.caseContent, styles.bgGray)}>输入5个数字</pre>
          <h3 className={styles.subTitle}>输出 :</h3>
          <pre className={classnames(styles.caseContent, styles.bgGray)}>输出5个helloworld</pre>
          <h3 className={styles.subTitle}>输入样例 :</h3>
          <pre className={classnames(styles.caseContent, styles.bgGray)}>1 2 3 4 ddd</pre>
          <h3 className={styles.subTitle}>输出样例 :</h3>
          <pre className={classnames(styles.caseContent, styles.bgGray)}></pre>
          <h3 className={styles.subTitle}>备注 </h3>
          <pre className={classnames(styles.caseContent, styles.bgGray)}></pre>
        </div>
      </div>
    );
  }
}
