import React from 'react';
import ActionWrapper from '@/components/Dynamic/Action';
import { Button, Icon } from 'antd';

const ButtonAction = ActionWrapper(Button);
const IconAction = ActionWrapper(Icon);
export default function DynamicButton() {
  const title = '测试按钮';
  return (
    <div>
      <p>
        <code>import ActionWrapper from '@/components/Dynamic/Action</code> 会
        hack进原有组件的对应的eventtype，注意是小写，他会在调用原有时间后进行对action的操作，并在执行后默认执行callback
      </p>
      <ButtonAction
        eventtype="onClick"
        style={{ fontSize: '12px' }}
        icon="like"
        onClick={() => {
          console.log('Step1: EventAction');
        }}
        callback={(set, currentWrappedProps) => {
          set({ icon: currentWrappedProps.icon === 'like' ? 'dislike' : 'like' });
          console.log('Step2: callback', currentWrappedProps);
        }}
        shape="circle"
        type="link"
        action={{
          api: 'post.comment.get',
          params: { postId: 1, commentId: 1 },
        }}
      >
        {title}
      </ButtonAction>
      <div>
        <IconAction
          type="book"
          eventtype="onClick"
          onClick={() => {
            console.log('Step1: EventAction');
          }}
        />
      </div>
    </div>
  );
}
