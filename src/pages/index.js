import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
const Home = props => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homepage}>
        <div className={styles.container}>
          <h3 className={styles.welcome}>欢迎</h3>
          <h5 className={styles.title}>
            <span className={styles.decorator}> UltraCode</span>
            智慧互动式教育倡导者
          </h5>
          <p className={styles.description}>
            老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。
            酒酣胸胆尚开张。鬓微霜，又何妨！持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。
          </p>
          <div>
            <Button
              type="success"
              className={styles.enterButton}
              onClick={() => {
                if (props.token) {
                  router.push({
                    pathname: '/dashboard/',
                  });
                } else {
                  router.push({
                    pathname: '/login',
                  });
                }
              }}
            >
              进入极扣
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapState = ({ user }) => {
  return {
    token: user.token,
  };
};
export default connect(mapState)(Home);
