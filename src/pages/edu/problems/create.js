import React, { useState } from 'react';
import { PageHeader, Tabs, Divider, Button, Input, Spin, message, Affix } from 'antd';
import { connect } from 'dva';
import { cx } from 'emotion';

import router from 'umi/router';
import { NAMESPACE, ACTIONS } from '../../../models/request';
import ChoiceMaker from '../../../components/Choice';
import Fillable from '../../../components/Fillable';

import FillableViewer from '../../../components/Fillable/Viewer';
import EditableHtml from '../../../components/Dynamic/EditableHtml';
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
const initialState = {
  choice: {
    options: [null, null],
    context: '<p>暂无内容</p>',
    answer: [],
    mode: 'single',
    score: 0,
    optional: false,
  },
};

const Problems = props => {
  const [title, setTitle] = useState(null);
  const [type, setType] = useState('choice');
  const [state, setState] = useState(initialState.choice);
  const [subjectiveContent, setSubjectiveContent] = useState(null);
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
                    extra: { title, content: state, type },
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
        <div className="pd-20" style={{ paddingTop: 0 }}>
          <Tabs
            onChange={key => {
              console.log('active key', key);
              setType(key);
              switch (key) {
              }
            }}
            activeKey={type}
            size="default"
            forceRender={true}
            animated={false}
          >
            <TabPane tab="选择题" key="choice">
              <blockquote className="pd-l-10" style={{ borderLeft: '4px solid #ccc' }}>
                Tips：通过勾选选型前选择框，将选型设置为正确答案(如果选型不足两项，则自动转换为单选题，可再次人工设置为多选题)
              </blockquote>
              {type === 'choice' && (
                <ChoiceMaker
                  {...state}
                  onSave={(payload = {}) => {
                    setState({
                      ...state,
                      ...payload,
                    });
                  }}
                />
              )}
            </TabPane>
            <TabPane tab="填空题" key="fillable">
              <blockquote className="pd-l-10" style={{ borderLeft: '4px solid #ccc' }}>
                Tips：当你输入超过 「 两个及以上下划线(_)+答案文本+两个及以上下划线(_)
                」的结构式时，系统将自动插入一个填空框，并以下划线内部的文字作为答案。当完成题目时，下方会显示答案。
                <strong>
                  如果在预览中修改了答案，请务必按下回车键以同步上方文本，上方的文本会作为最终的结果存入服务器。
                </strong>
              </blockquote>

              {type === 'fillable' && (
                <Fillable
                  {...state}
                  onChange={content => {
                    console.log('TCL: content', content);
                    setState({
                      ...state,
                      ...content,
                    });
                  }}
                />
              )}
              <Divider type="horizontal" />
              <div className="pd-b-20 pd-t-10">
                例如：我国的首都是
                <code>__</code>北京<code>__</code>市。
              </div>
              <FillableViewer content="我国的首都是__北京__市" showAnswer />
            </TabPane>
            <TabPane tab="主观题" key="subjective">
              <EditableHtml
                onSubmit={t => setSubjectiveContent(t)}
                text={subjectiveContent}
                editable
              >
                <div
                  className="markdown-section n-editable-text-default-container"
                  dangerouslySetInnerHTML={{
                    __html:
                      ((subjectiveContent === '<p></p>' || !subjectiveContent) &&
                        '<div style="font-weight:bold;border-bottom:1px solid #ccc;padding:1rem;line-height;2rem;font-size:1rem;">点击文本进行编辑。</div>') ||
                      subjectiveContent,
                  }}
                />
              </EditableHtml>
            </TabPane>
          </Tabs>
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
