import React, { useEffect } from 'react';
import { Button } from 'antd';
import DragList from '@/components/DragList';
import Wrapper from '@/components/DragList/Wrapper';

const RenderItemDemo = ({ text }) => {
  useEffect(() => {
    return () => {
      console.log('clean RenderItemDemo');
    };
  }, []);
  return <div>示例：{text} 随便来点啥</div>;
};

//必须包含id
export default function DragPanelDemo() {
  let resetDataSource = null;
  return (
    <div>
      <Button
        onClick={() => {
          resetDataSource([
            { id: 1, text: '重置1' },
            { id: 2, text: '重置2' },
          ]);
        }}
      >
        重置
      </Button>
      <DragList
        onChange={data => {
          console.log('dragList=>', data);
        }}
        resetDataSource={e => {
          resetDataSource = e;
        }}
        dataSource={[
          {
            id: 1,
            text: 'Write a cool JS library',
          },
          {
            id: 2,
            text: 'Make it generic enough',
          },
          {
            id: 3,
            text: 'Write README',
          },
          {
            id: 4,
            text: 'Create some examples',
          },
          {
            id: 5,
            text:
              'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
          },
          {
            id: 6,
            text: '???',
          },
          {
            id: 7,
            text: 'PROFIT',
          },
        ]}
      >
        <Wrapper rowKey="id" renderItem={record => <RenderItemDemo text={record.text} />} />
      </DragList>
    </div>
  );
}
