import React from 'react';
import { Comment, Tooltip, Icon, Button } from 'antd';
import moment from 'moment';
import DynamicList from '@/components/Dynamic/List';
import ActionWrapper from '@/components/Dynamic/Action';
import { ACTIONS, NAMESPACE } from '../../../../models/request';

const IconAction = ActionWrapper(Icon);
const ButtonAction = ActionWrapper(Button);

const Item = props => {
  const { data } = props;
  return (
    <Comment
      {...{
        actions: [
          <span key="comment-basic-moretest">
            <ButtonAction
              eventType="onClick"
              style={{ fontSize: '12px' }}
              icon="like"
              onClick={props => {
                console.log('ButtonAction', props);
              }}
              callback={(set, state) => {
                set({ icon: state.icon === 'like' ? 'dislike' : 'like' });
              }}
              shape="circle"
              type="link"
              action={{
                api: 'post.comment.get',
                params: { postId: 1, commentId: 1 },
              }}
            >
              {data.title}
            </ButtonAction>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>4</span>
          </span>,
          <span key="comment-basic-moretest">
            <IconAction
              type="like"
              theme={'filled'}
              onClick={() => {
                console.log('like');
              }}
              action={{
                api: 'post.comment.get',
                params: { postId: 1, commentId: 1 },
              }}
            />
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>4</span>
          </span>,
          <span key="comment-basic-like">
            <Icon
              type="like"
              theme={'filled'}
              onClick={() => {
                console.log('like');
              }}
            />
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>4</span>
          </span>,
          <span key="comment-basic-dislike">
            <Icon
              type="dislike"
              theme={'filled'}
              onClick={() => {
                console.log('dislike');
              }}
            />
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>8</span>
          </span>,
          <span key="comment-basic-reply-to">回复</span>,
        ],
        author: 'Han Solo' + data.title,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully
            and efficiently.
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
      }}
    />
  );
};

const History = props => {
  return (
    <DynamicList
      items={[]}
      action={{ api: 'post.comment.get', params: { postId: 1 }, extra: { size: 10, page: 1 } }}
      renderItem={(item, index) => {
        return <Item data={item} />;
      }}
    />
  );
};

export default History;
