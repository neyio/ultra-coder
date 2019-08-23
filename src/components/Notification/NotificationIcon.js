import React, { Component } from 'react';
import { Popover, Badge, Icon, Tabs, List } from 'antd';
import demo from '@/assets/yay.jpg';
const { TabPane } = Tabs;
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `TinyBlackboard 教案 | ${'cds' + i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '漫不经心，是曾经。',
    content:
      '你就有如此不可多得的神色，你每种表情无需费力把我俘获。平静里带着谴责，谴责却没有愠火。你告别该有的脆弱，你放生无罪的困惑。你沿着真心一路上，化作未染的清澈。',
  });
}
const listData2 = Array.from({ length: 20 }).map(i => {
  return {
    href: 'http://ant.design',
    title: `TinyBlackboard 教案 | ${'kx' + i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '漫不经心，是曾经。',
    content:
      '你就有如此不可多得的神色，你每种表情无需费力把我俘获。平静里带着谴责，谴责却没有愠火。你告别该有的脆弱，你放生无罪的困惑。你沿着真心一路上，化作未染的清澈。',
  };
});
export default class NotificationIcon extends Component {
  callback = () => {};
  renderContent = () => {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="通知" key="1">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 4,
            }}
            dataSource={listData}
            footer={<br />}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text="156" />,
                  <IconText type="like-o" text="156" />,
                  <IconText type="message" text="2" />,
                ]}
                // extra={<img height={130} alt="logo" src={demo} />}
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="消息" key="2">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 4,
            }}
            dataSource={listData2}
            footer={<br />}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text="156" />,
                  <IconText type="like-o" text="156" />,
                  <IconText type="message" text="2" />,
                ]}
                extra={<img height={130} alt="logo" src={demo} />}
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    );
  };
  render() {
    return (
      <Popover placement="bottomRight" content={this.renderContent()} trigger="click">
        <Badge style={{ top: '3px', position: 'abosulte' }} count={94}>
          <Icon type="bell" style={{ fontSize: '1.25rem', fontWeight: 100 }} />
        </Badge>
      </Popover>
    );
  }
}
