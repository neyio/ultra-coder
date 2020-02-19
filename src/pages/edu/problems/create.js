import React, { useState } from 'react';
import { PageHeader, Tabs, Divider, Button, Input, Spin, message, Affix } from 'antd';
import { connect } from 'dva';
import { cx } from 'emotion';

import router from 'umi/router';
import { NAMESPACE, ACTIONS } from '../../../models/request';
import ChoiceMaker from '../../../components/Choice';
const { TabPane } = Tabs;
const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/edu',
    breadcrumbName: '库管理',
  },
  {
    path: '/edu/problems',
    breadcrumbName: '题库',
  },

  {
    path: '/edu/problems/create',
    breadcrumbName: '创建题目',
  },
];

const Problems = props => {
  const [title, setTitle] = useState(null);
  const [state, setState] = useState({
    options: [null, null],
    context: '<p>暂无内容</p>',
    answer: [],
    mode: 'single',
    score: 0,
    optional: false,
  });
  const { loading, create } = props;
  return (
    <div style={{ background: '#fff', height: '100%', overflow: 'auto' }}>
      <PageHeader
        onBack={() => {
          router.push('/edu/titles');
        }}
        title="创建题目"
        breadcrumb={{ routes }}
        subTitle="注意：编辑完内容请点击右侧同步至服务器"
        extra={[
          <Affix key="create-problem" offsetTop={110}>
            <Button
              type="primary"
              icon="upload"
              onClick={() => {
                create(
                  {
                    api: 'user.problem.create',
                    params: { userId: 1 },
                    extra: { title, content: state },
                  },
                  response => {
                    console.log('TCL: response', response);
                    message.success('创建成功', 3);
                    router.goBack();
                  },
                );
              }}
            >
              同步至服务器
            </Button>
          </Affix>,
        ]}
      >
        <div>
          <Input
            addonBefore="题目描述"
            onChange={e => {
              setTitle(e.target.value);
            }}
            defaultValue={title}
            placeholder="选填，方便索引"
          />
        </div>
      </PageHeader>
      <Divider type="horizontal" className={cx('mg-t-10', 'mg-b-10')}></Divider>
      <Spin spinning={!!loading}>
        <blockquote className="mg-l-20 mg-t-20 pd-l-10" style={{ borderLeft: '4px solid #ccc' }}>
          Tips：通过勾选选型前选择框，将选型设置为正确答案(如果选型不足两项，则自动转换为单选题，可再次人工设置为多选题)
        </blockquote>
        <div className="pd-20">
          <Tabs defaultActiveKey="1" size="default">
            <TabPane tab="Tab 1" key="1">
              Content of tab 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of tab 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of tab 3
            </TabPane>
          </Tabs>
          <ChoiceMaker
            {...state}
            onSave={(payload = {}) => {
              setState({
                ...state,
                ...payload,
              });
            }}
          />
        </div>
      </Spin>
    </div>
  );
};
export default connect(
  state => {
    return {
      request: state.request.restfulApiRequest,
      userId: state.user.id,
      loading: state.loading.effects[`${NAMESPACE}/${ACTIONS.FETCH_RESTFUL_API}`],
    };
  },
  dispatch => {
    return {
      create: ({ api = 'user.problem.create', params = {}, extra = {} }, callback) => {
        dispatch({
          type: `${NAMESPACE}/${ACTIONS.FETCH_RESTFUL_API}`,
          payload: {
            callback,
            config: [api, params, extra],
          },
        });
      },
    };
  },
)(Problems);
