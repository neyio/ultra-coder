import React, { useEffect } from 'react';
import { Button, Divider } from 'antd';
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
            { id: 1, text: '重置1', title: '题目1' },
            { id: 2, text: '重置2', title: '题目2' },
          ]);
        }}
      >
        重置
      </Button>

      <Divider />
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
            title: '题目1',
            text:
              'Write a cool JS library，Write a cool JS library,Write a cool JS library，Write a cool JS library,Write a cool JS library，Write a cool JS library',
          },
          {
            id: 2,
            title: '题目2',
            text:
              'Make it generic enough,Write a cool JS library，Write a cool JS library,Write a cool JS library，Write a cool JS library,Write a cool JS library，Write a cool JS library,Write a cool JS library，Write a cool JS library,Write a cool JS library，Write a cool JS library,Write a cool JS library，Write a cool JS library',
          },
          {
            id: 3,
            title: '题目3',
            text:
              'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.',
          },
          {
            id: 4,
            title: '题目4',
            text:
              'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.',
          },
          {
            id: 5,
            title: '题目5',
            text:
              'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.',
          },
        ]}
        showTreeView
      >
        <Wrapper rowKey="id" renderItem={record => <RenderItemDemo text={record.text} />} />
      </DragList>
    </div>
  );
}
