import React, { useEffect, useState } from 'react';
import { Comment, Tooltip, Icon, Button } from 'antd';
import moment from 'moment';
import DynamicList from '@/components/Dynamic/List';
import ActionWrapper from './../../../components/Dynamic/Action';
const IconAction = ActionWrapper(Icon);
const ButtonAction = ActionWrapper(Button);

const Item = props => {
  const { data } = props;
  return (
    <Comment
      {...{
        actions: [
          <span key="comment-basic-moretest">
            <Tooltip title="Like">
              <ButtonAction
                icon="like"
                onClick={props => {
                  console.log('ButtonAction', props);
                }}
                callback={setProxy => {
                  setProxy({ icon: 'dislike' });
                }}
                shape="circle"
                type="link"
                action={{
                  keyChain: 'post.comment.get',
                  params: { postId: 1, commentId: 1 },
                }}
              >
                {data.title}
              </ButtonAction>
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>4</span>
          </span>,
          <span key="comment-basic-moretest">
            <Tooltip title="Like">
              {/* theme 'outlined' */}
              <IconAction
                type="like"
                theme={'filled'}
                onClick={() => {
                  console.log('like');
                }}
                action={{
                  keyChain: 'post.comment.get',
                  params: { postId: 1, commentId: 1 },
                }}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>4</span>
          </span>,
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
          <span key="comment-basic-dislike">
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
  const [test, setTitle] = useState({ title: 'helo' });
  useEffect(() => {
    setTimeout(() => {
      setTitle({ title: 'xxx' });
    }, 1000);
  }, []);
  return (
    <DynamicList
      items={['a', 'b']}
      request={['post.comment.get', { postId: 1 }, { size: 10, page: 1 }]}
      renderItem={(item, index) => {
        return <Item data={test} />;
      }}
    />
  );
};

export default History;
