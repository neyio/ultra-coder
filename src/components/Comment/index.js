import React from 'react';

import { Comment, Tooltip, List, Icon } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { Divider } from 'antd';
const data = Array.from({ length: 15 }).map(_ => {
  return {
    actions: [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {/* theme 'outlined' */}
          <Icon
            type="like"
            theme={'filled'}
            onClick={() => {
              console.log('like');
            }}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>4</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          {/* theme 'filled' */}
          <Icon
            type="dislike"
            theme={'filled'}
            onClick={() => {
              console.log('dislike');
            }}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>8</span>
      </span>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(1, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  };
});

export default class CommentList extends React.Component {
  render() {
    return (
      <List
        className="comment-list"
        header={<Divider className={styles.header}>{`共有 ${data.length} 回复`}</Divider>}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <Comment
            className={styles.comment}
            key={index}
            actions={item.actions}
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}
          />
        )}
      />
    );
  }
}
