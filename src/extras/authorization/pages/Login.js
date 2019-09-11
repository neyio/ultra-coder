/**
 * title:"登录页面"
 */
import React from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Link from 'umi/link';
import AuthLayout from './_layout';
class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <AuthLayout>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h2 className="title">登录</h2>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <span>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
              <Link to="/forgot-password" className="login-form-forgot">
                忘记密码
              </Link>
            </span>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登 录
            </Button>
            或 <Link to="/register">注册</Link>
          </Form.Item>
        </Form>
      </AuthLayout>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
export default WrappedLoginForm;
