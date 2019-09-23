import React, { useState } from 'react';
import { Tag, Button, Badge } from 'antd';
import styles from './index.less';
const ToggleContainer = props => {
  const [toggleHandler, setToggleHandler] = useState(false);
  return (
    <>
      <div className={styles.fakeMask}>
        <div
          style={{
            maxHeight: toggleHandler ? '100%' : 300,
          }}
          className={styles.toggleContainer}
        >
          {props.children}
        </div>
        <span className={styles.loadMoreButton}>
          <Button size="small" onClick={() => setToggleHandler(!toggleHandler)}>
            {!toggleHandler ? '显示全部' : '折叠显示'}
          </Button>
        </span>
      </div>
    </>
  );
};
const GroupTag = props => {
  const {
    items = [
      {
        id: 1,
        title: '动态规划',
        count: 13,
      },
    ],
  } = props;
  const arr = items.map(item => {
    return (
      <Tag className={styles.aTag}>
        {item.title}
        <Badge
          count={item.count}
          style={{
            backgroundColor: '#fff',
            color: '#999',
            boxShadow: '0 0 0 1px #d9d9d9 inset',
            marginLeft: '0.5rem',
            float: 'right',
            marginBottom: '2px',
          }}
        />
      </Tag>
    );
  });
  return <ToggleContainer>{arr}</ToggleContainer>;
};
export default GroupTag;
