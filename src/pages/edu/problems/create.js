import React, { useState } from 'react';
import { PageHeader, Tabs, Divider, Button, Input, Spin, message } from 'antd';
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
    content: '<p>暂无内容</p>',
    answers: [],
    mode: 'single',
    score: 0,
    optional: false,
  },
  fillable: {
    cutDownArray: [],
    answers: [],
  },
  subjective: {
    content: null,
  },
};

const Problems = props => {
  const {
    showToolbar = true,
    onCallback = () => {
      router.push('/edu/problems');
    },
  } = props;
  const [title, setTitle] = useState(null);
  const [type, setType] = useState('choice');
  const [state, setState] = useState(initialState.choice);
  const { loading, create } = props;
  return (
    <div style={{ background: '#fff', height: '100%', overflow: 'auto' }}>
      <PageHeader
        onBack={
          showToolbar
            ? () => {
                router.push('/edu/problems');
              }
            : undefined
        }
        title="创建题目"
        breadcrumb={showToolbar ? { routes } : null}
        subTitle="注意：编辑完内容请点击右侧同步至服务器"
        extra={[
          <Button
            type="primary"
            icon="upload"
            key="create-problem"
            onClick={() => {
              create(
                {
                  api: 'user.problem.create',
                  params: { userId: 1 },
                  extra: { title, ...state, type },
                },
                response => {
                  console.log('TCL: response', response);
                  message.success('创建成功', 3);
                  onCallback(response);
                },
              );
            }}
          >
            提交创建
          </Button>,
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

              switch (key) {
                case 'choice':
                  setType(key);
                  setState(initialState.choice);
                  break;
                case 'fillable':
                  setType(key);
                  setState(initialState.fillable);
                  break;
                case 'subjective':
                  setType(key);
                  setState(initialState.subjective);
                  break;
                default:
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
                    console.log('show choiceMarker', { ...state, ...payload });
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
              {type === 'subjective' && (
                <EditableHtml
                  onSubmit={content => setState({ ...state, content })}
                  text={state.content}
                  editable
                >
                  <div
                    className="markdown-section n-editable-text-default-container"
                    dangerouslySetInnerHTML={{
                      __html:
                        ((state.content === '<p></p>' || !state.content) &&
                          '<div style="font-weight:bold;border-bottom:1px solid #ccc;padding:1rem;line-height;2rem;font-size:1rem;">点击文本进行编辑。</div>') ||
                        state.content,
                    }}
                  />
                </EditableHtml>
              )}
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
