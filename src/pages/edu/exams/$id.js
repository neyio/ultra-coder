import React, { useState, useCallback, useEffect } from 'react';
import { PageHeader, Divider, Button, Modal, Input, Spin, message, Affix, Empty } from 'antd';
import { connect } from 'dva';
import { cx } from 'emotion';

import router from 'umi/router';
import { NAMESPACE, ACTIONS } from '../../../models/request';
import ProblemCreate from '../problems/create';
import ProblemIndex from '../problems/index';
import DragList from '@/components/DragList';
import Wrapper from '@/components/DragList/Wrapper';
import ExamItemRender from '@/components/Dynamic/ExamItemRender';

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
    path: '/edu/exams',
    breadcrumbName: '测验库',
  },
  {
    breadcrumbName: '编辑测验',
  },
];
const CreateExam = props => {
  const { userId, show, loading, update } = props;
  const {
    match: {
      params: { id },
    },
  } = props;
  const [title, setTitle] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [indexModalVisible, setIndexModalVisible] = useState(false);
  const [content, setContent] = useState([]);
  let resetDataSource = null;
  const fetchData = useCallback(() => {
    show(
      {
        api: 'user.exam.show',
        params: {
          userId,
          examId: id,
        },
        extra: {},
      },
      response => {
        const { title, content } = response;
        setTitle(title);
        setContent(content);
        resetDataSource(content);
      },
    );
  }, [show, userId, id, resetDataSource]);
  useEffect(() => {
    fetchData();
    return () => {
      console.log('umount');
    };
  }, [id, fetchData]);
  return (
    <div style={{ background: '#fff', height: '100%', overflow: 'auto' }}>
      <PageHeader
        onBack={() => {
          router.push('/edu/exams');
        }}
        title="编辑测验"
        breadcrumb={{ routes }}
        subTitle="注意：编辑完内容请点击右侧同步至服务器"
        extra={[
          <Affix key="create-exam" offsetTop={110}>
            <Button
              type="info"
              icon="import"
              onClick={() => {
                setIndexModalVisible(true);
              }}
              loading={loading}
            >
              批量导入题目
            </Button>
            <span className="mg-r-10"></span>
            <Button
              loading={loading}
              icon="plus"
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
              创建题目
            </Button>
            <span className="mg-r-10"></span>
            <Button
              loading={loading}
              type="primary"
              icon="upload"
              onClick={() => {
                update(
                  {
                    api: 'user.exam.create',
                    params: { userId: 1, problemId: id },
                    extra: { title, content },
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
            addonBefore="测验名称"
            onChange={e => {
              setTitle(e.target.value);
            }}
            defaultValue={title}
            placeholder="必填项"
          />
        </div>
      </PageHeader>
      <Divider type="horizontal" className={cx('mg-t-10', 'mg-b-10')}></Divider>
      <Modal
        width="98%"
        style={{ top: 10, height: '100%', paddingBottom: 0 }}
        bodyStyle={{ paddingTop: 0 }}
        title="创建题目"
        visible={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setCreateModalVisible(false);
            }}
          >
            取消
          </Button>,
        ]}
      >
        <ProblemCreate
          pageMode={false}
          onCallback={response => {
            setContent([...content, response]);
            resetDataSource([...content, response]);
            setCreateModalVisible(false);
          }}
        />
      </Modal>
      <Modal
        width="98%"
        style={{ top: 10, height: '100%', paddingBottom: 0 }}
        bodyStyle={{ paddingTop: 0 }}
        title="题目列表"
        visible={indexModalVisible}
        onCancel={() => {
          setIndexModalVisible(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIndexModalVisible(false);
            }}
          >
            取消
          </Button>,
        ]}
      >
        <ProblemIndex
          pageMode={false}
          onExport={data => {
            setContent([...content, ...data]);
            resetDataSource([...content, ...data]);
            setIndexModalVisible(false);
          }}
        />
      </Modal>
      <Spin spinning={!!loading}>
        <section className="pd-20" style={{ paddingTop: 10 }}>
          <DragList
            onChange={data => {
              console.log('dragList=>', data);
              setContent(data);
            }}
            resetDataSource={e => {
              resetDataSource = e;
            }}
            initialDataSource={content}
            showTreeView
          >
            <Wrapper
              rowKey="id"
              renderItem={record => {
                return <ExamItemRender data={record} />;
              }}
            />
          </DragList>
          {content.length === 0 && <Empty />}
        </section>
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
      update: ({ api = 'user.exam.update', params = {}, extra = {} }, callback) => {
        dispatch({
          type: `${NAMESPACE}/${ACTIONS.FETCH_RESTFUL_API}`,
          payload: {
            callback,
            config: [api, params, extra],
          },
        });
      },
      show: ({ api = 'user.exam.show', params = {}, extra = {} }, callback) => {
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
)(CreateExam);
