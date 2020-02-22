import React, { useState } from 'react';
import { PageHeader, Divider, Button, Input, Spin, message, Affix } from 'antd';
import { connect } from 'dva';
import { cx, css } from 'emotion';

import router from 'umi/router';
import EditableHtml from '@/components/Dynamic/EditableHtml';
import { NAMESPACE, ACTIONS } from '../../../models/request';

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
    path: '/edu/topcics',
    breadcrumbName: '话题库',
  },

  {
    path: '/edu/topcics/create',
    breadcrumbName: '创建话题',
  },
];

const Topics = props => {
  const [content, setContent] = useState(null);
  const [topic, setTopic] = useState(null);
  const { loading, create } = props;
  return (
    <div style={{ background: '#fff', height: '100%' }}>
      <PageHeader
        onBack={() => {
          router.push('/edu/topics');
        }}
        title="创建话题"
        breadcrumb={{ routes }}
        subTitle="注意：编辑完内容请点击右侧同步至服务器"
        extra={[
          <Affix offsetTop={110} key="create-topic">
            <Button
              type="primary"
              icon="upload"
              onClick={() => {
                create(
                  { api: 'user.topic.create', params: { userId: 1 }, extra: { topic, content } },
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
      <div
        className={cx(
          'bf-container',
          css`
            height: 100%;
            max-height: 100%;
            background: #f8f8f8;
          `,
        )}
      >
        <section
          className="public-DraftEditor-content"
          style={{
            padding: '1rem',
            borderRadius: '3px',
            background: '#f8f8f8f',
          }}
        >
          <Spin tip="加载中..." spinning={!!loading ? loading.toString() : undefined}>
            <EditableHtml
              text={content}
              onSubmit={html => {
                setContent(html);
              }}
            />
          </Spin>
        </section>
      </div>
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
      create: ({ api = 'user.topic.create', params = {}, extra = {} }, callback) => {
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
)(Topics);
