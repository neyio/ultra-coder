import React, { useState, useEffect, useCallback } from 'react';
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
    breadcrumbName: '题目编辑',
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
  const { loading, update, show, userId } = props;
  const {
    match: {
      params: { id },
    },
  } = props;
  const fetchData = useCallback(() => {
    show(
      {
        api: 'user.problem.show',
        params: {
          userId,
          problemId: id,
        },
        extra: {},
      },
      response => {
        const { content, title } = response;
        setTitle(title);
        setState(content);
      },
    );
  }, [show, userId, id]);
  useEffect(() => {
    fetchData();
    return () => {};
  }, [id, fetchData]);
  return (
    <div style={{ background: '#fff', height: '100%', overflow: 'auto' }}>
      <PageHeader
        onBack={() => {
          router.push('/edu/titles');
        }}
        title="题目编辑"
        breadcrumb={{ routes }}
        subTitle="注意：编辑完内容请点击右侧同步至服务器"
        extra={[
          <Affix key="create-problem" offsetTop={110}>
            <Button
              type="primary"
              icon="upload"
              onClick={() => {
                update(
                  {
                    api: 'user.title.create',
                    params: { userId: 1, problemId: props.match.params.id },
                    extra: { title, content: state },
                  },
                  response => {
                    console.log('TCL: response', response);
                    message.success('修改完成', 3);
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
            addonBefore="题目标题"
            onChange={e => {
              setTitle(e.target.value);
            }}
            value={title}
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
      update: ({ api = 'user.problem.update', params = {}, extra = {} }, callback) => {
        dispatch({
          type: `${NAMESPACE}/${ACTIONS.FETCH_RESTFUL_API}`,
          payload: {
            callback,
            config: [api, params, extra],
          },
        });
      },
      show: ({ api = 'user.problem.show', params = {}, extra = {} }, callback) => {
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
