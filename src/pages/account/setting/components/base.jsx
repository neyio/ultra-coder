import { Button, Form, Input, Select, Upload, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

const FormItem = Form.Item;
const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="account-setting.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">
          <FormattedMessage
            id="account-setting.basic.change-avatar"
            defaultMessage="Change avatar"
          />
        </Button>
      </div>
    </Upload>
  </Fragment>
);

const validatorGeographic = (_, value, callback) => {
  const { province, city } = value;

  if (!province.key) {
    callback('Please input your province!');
  }

  if (!city.key) {
    callback('Please input your city!');
  }

  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

@connect(({ accountSetting }) => ({
  currentUser: accountSetting.currentUser,
}))
class BaseView extends Component {
  view = undefined;

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;

    if (currentUser) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = currentUser[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handlerSubmit = event => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields(err => {
      if (!err) {
        message.success(
          formatMessage({
            id: 'account-setting.basic.update.success',
          }),
        );
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>
            <FormItem
              label={formatMessage({
                id: 'account-setting.basic.email',
              })}
            >
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'account-setting.basic.email-message',
                      },
                      {},
                    ),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'account-setting.basic.nickname',
              })}
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'account-setting.basic.nickname-message',
                      },
                      {},
                    ),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'account-setting.basic.profile',
              })}
            >
              {getFieldDecorator('profile', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'account-setting.basic.profile-message',
                      },
                      {},
                    ),
                  },
                ],
              })(
                <Input.TextArea
                  placeholder={formatMessage({
                    id: 'account-setting.basic.profile-placeholder',
                  })}
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'account-setting.basic.country',
              })}
            >
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'account-setting.basic.country-message',
                      },
                      {},
                    ),
                  },
                ],
              })(
                <Select
                  style={{
                    maxWidth: 220,
                  }}
                >
                  <Option value="China">中国</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'account-setting.basic.geographic',
              })}
            >
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'account-setting.basic.geographic-message',
                      },
                      {},
                    ),
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'account-setting.basic.address',
              })}
            >
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'account-setting.basic.address-message',
                      },
                      {},
                    ),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              label={formatMessage({
                id: 'account-setting.basic.phone',
              })}
            >
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage(
                      {
                        id: 'account-setting.basic.phone-message',
                      },
                      {},
                    ),
                  },
                  {
                    validator: validatorPhone,
                  },
                ],
              })(<PhoneView />)}
            </FormItem>
            <Button type="primary" onClick={this.handlerSubmit}>
              <FormattedMessage
                id="account-setting.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default Form.create()(BaseView);
