import React, { useState } from 'react';
import { PageHeader, Divider, Button, Input, Spin, message, Affix } from 'antd';
import { connect } from 'dva';
import { cx } from 'emotion';

import router from 'umi/router';
import { NAMESPACE, ACTIONS } from '../../../models/request';
import ChoiceMaker from '../../../components/Choice';

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
  const [topic, setTopic] = useState(null);
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
          router.push('/edu/topics');
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
                    api: 'user.topic.create',
                    params: { userId: 1 },
                    extra: { topic, content: state },
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
            addonBefore="话题主题"
            onChange={e => {
              setTopic(e.target.value);
            }}
            defaultValue={topic}
            placeholder="请输入话题的主题以进行区分"
          />
        </div>
      </PageHeader>
      <Divider type="horizontal" className={cx('mg-t-10', 'mg-b-10')}></Divider>
      <Spin spinning={!!loading}>
        <div className="pd-20">
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
