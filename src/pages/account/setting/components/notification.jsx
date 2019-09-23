import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

class NotificationView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({
          id: 'account-setting.settings.open',
        })}
        unCheckedChildren={formatMessage({
          id: 'account-setting.settings.close',
        })}
        defaultChecked
      />
    );
    return [
      {
        title: formatMessage(
          {
            id: 'account-setting.notification.password',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'account-setting.notification.password-description',
          },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage(
          {
            id: 'account-setting.notification.messages',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'account-setting.notification.messages-description',
          },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage(
          {
            id: 'account-setting.notification.todo',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'account-setting.notification.todo-description',
          },
          {},
        ),
        actions: [Action],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default NotificationView;
