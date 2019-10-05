import React, { Fragment } from 'react';
import { Form, Select, Button, Rate, Input, PageHeader, Empty, Modal, Result } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Editor from '../../../../components/Editor/index';
import Wrapper from '../../../../components/Wrapper';
import styles from './index.less';
import router from 'umi/router';
const WrapperEditor = Wrapper(Editor);
const { Option } = Select;

class Demo extends React.Component {
  state = {
    description: null,
    status: 'inEditing' || 'successed' || 'failed',
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('wrapper editor组件自行维护状态');
        Modal.success({
          title: '创建成功',
          width: '800px',
          okText: '关闭',
          content: (
            <Result
              status="success"
              title="保存成功，接下来只需要为你的题目添加测试用例。"
              // subTitle="测试用例是必要输入(in后缀)和输出(out后缀)文件"
              extra={[
                <Button
                  type="primary"
                  key="console"
                  onClick={() => router.push('/admin/problem/1/tests')}
                >
                  创建测试用例
                </Button>,
              ]}
            />
          ),
        });
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  onHandleTagChange = e => {
    console.log('tags change', e);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Fragment>
        <PageHeader title="创建题目" style={{ position: 'sticky', top: 0 }}>
          为题库增加一题
        </PageHeader>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="标题" hasFeedback>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入题目名称,且长度符合2到80个字符',
                  min: 2,
                  max: 80,
                },
              ],
            })(<Input type="text" />)}
          </Form.Item>
          <Form.Item label="限定时间" hasFeedback>
            {getFieldDecorator('timeLimit', {
              initialValue: 1000,
              rules: [{ required: true, message: '请选择时间限制' }],
            })(
              <Select placeholder="请选择时间限制">
                <Option value={1000}>1000ms</Option>
                <Option value={2000}>2000ms</Option>
                <Option value={5000}>2000ms</Option>
                <Option value={10000}>10000ms</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="限定内存" hasFeedback>
            {getFieldDecorator('memoryLimit', {
              initialValue: 32,
              rules: [{ required: true, message: '请选择内存大小' }],
            })(
              <Select placeholder="请选择内存限制">
                <Option value={32}>32MB</Option>
                <Option value={16}>16MB</Option>
                <Option value={64}>64Mb</Option>
                <Option value={128}>128Mb</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="选择算法标签">
            {getFieldDecorator('select-tags', {
              rules: [
                { required: true, message: '请选择你的题目的类型标签(可多选)', type: 'array' },
              ],
            })(
              <Select mode="tags" placeholder="选择算法类型" onChange={this.onHandleTagChange}>
                <Option value="red">模拟题</Option>
                <Option value="green">动态规划</Option>
                <Option value="blue">线性代数</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="难度">
            {getFieldDecorator('rate', {
              initialValue: 3.5,
            })(<Rate />)}
          </Form.Item>
          <Form.Item label="题目描述">
            {/* {getFieldDecorator('description', {
              initialValue: this.state.description,
              rules: [{ required: true, message: '请输入正确的题目描述', min: 10 }],
            })( */}
            <WrapperEditor
              style={{ border: '1px solid #e8e8e8', borderRadius: '4px' }}
              initialValue={this.state.description}
              onChange={content => {
                console.log(content);
                this.setState({
                  description: content,
                });
              }}
            >
              {toggle => {
                return this.state.description ? (
                  <div
                    className={styles.descriptionContainer}
                    onClick={() => toggle(false)}
                    dangerouslySetInnerHTML={{ __html: this.state.description || '' }}
                  ></div>
                ) : (
                  <Empty onClick={() => toggle(false)} />
                );
              }}
            </WrapperEditor>
            {/* )} */}
          </Form.Item>
          <Form.Item label="输入[描述]">
            {getFieldDecorator('input', {
              initialValue: null,
            })(<TextArea autosize={{ minRows: 6, maxRows: 16 }} />)}
          </Form.Item>
          <Form.Item label="输入[描述]">
            {getFieldDecorator('output', {
              initialValue: null,
            })(<TextArea autosize={{ minRows: 6, maxRows: 16 }} />)}
          </Form.Item>

          <Form.Item label="输出[样例]">
            {getFieldDecorator('outputDemo', {
              initialValue: null,
            })(<TextArea autosize={{ minRows: 6, maxRows: 16 }} />)}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('lint', {
              initialValue: null,
            })(<TextArea autosize={{ minRows: 6, maxRows: 16 }} />)}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              创建题目
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);

export default WrappedDemo;
