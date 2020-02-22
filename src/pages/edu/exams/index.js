import React, { useState } from 'react';
import {
  PageHeader,
  Divider,
  Table,
  Pagination,
  Descriptions,
  Affix,
  Row,
  Col,
  Button,
} from 'antd';
import usePaginate from '@/components/Hooks/usePaginate';
import { mixinFilter, mixinSelection } from '@/components/Dynamic/Table';
import { connect } from 'dva';
import { cx } from 'emotion';
import router from 'umi/router';
const ButtonGroup = Button.Group;

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
    breadcrumbName: '测验库',
  },
];

const Exams = ({ userId, request, showToolbar = true }) => {
  const config = {
    api: 'user.exam.get',
    params: { userId },
    extra: {},
    page: 1,
    size: 10,
  };
  const [filters, setFilters] = useState({}); //过滤
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [
    { data, page, total, size, loading, fetchData, sorter = {} },
    { setPage, setSize, setSearch, setSorter },
  ] = usePaginate({
    request,
    ...config,
    size: 30,
  });
  const start = record => {
    console.log('TCL: start -> record', record);
  };
  const destroy = record => {
    console.log('TCL: destroy -> record', record);
  };
  const share = record => {
    console.log('TCL: share -> record', record);
  };
  const edit = record => {
    router.push(`/edu/exams/${record.id}`);
  };
  return (
    <div style={{ background: '#fff' }}>
      <PageHeader
        title="测验库"
        subTitle="[在此进行话题创建后，可以分配到对应的课程中]"
        breadcrumb={{ routes }}
        extra={[
          <Affix key="create-top" offsetTop={110}>
            <Button
              type="primary"
              key="create-top"
              icon="plus"
              onClick={() => router.push('/edu/exams/create')}
            >
              创建测验
            </Button>
          </Affix>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="教师姓名">王全蛋</Descriptions.Item>
          <Descriptions.Item label="话题数量">20</Descriptions.Item>
          <Descriptions.Item label="累计使用次数">309次</Descriptions.Item>
          <Descriptions.Item label="最后一次更新日期">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="课程数量"> 5</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Divider type="horizontal" className={cx('mg-t-10', 'mg-b-10')}></Divider>

      <section className={cx('pd-18', 'pd-t-10')}>
        <Table
          {...mixinSelection(selectedRowKeys, setSelectedRowKeys, {})}
          dataSource={data || []}
          size="small"
          rowKey="id"
          scrollToFirstRowOnChange={true}
          columns={[
            mixinFilter({
              title: '标题',
              dataIndex: 'title', //列数据在数据项中对应的 key，支持 a.b.c、a[0].b.c[1] 的嵌套写法
              key: 'title', //dataIndex定义的情况下可忽略，参上，用于react
              sorter: true, //ANTD 不支持多重排序
              render: text => <span>{text}</span>,
            })(filters, setFilters, setSearch),

            {
              title: '修改日期',
              dataIndex: 'updated_at',
              key: 'updated_at',
              width: 190,
            },
          ].concat(
            (showToolbar && {
              title: '操作',
              key: 'actions',
              width: 180,
              render: (_, record) => {
                return (
                  <ButtonGroup>
                    <Button
                      shape="round"
                      onClick={() => {
                        start(record);
                        //<Icon type="pause" />
                      }}
                      icon="caret-right"
                      size="small"
                    />
                    <Button
                      shape="round"
                      onClick={() => {
                        edit(record);
                      }}
                      icon="edit"
                      size="small"
                    />

                    <Button
                      icon="delete"
                      shape="round"
                      size="small"
                      onClick={() => {
                        destroy(record);
                      }}
                    />

                    <Button
                      icon="share-alt"
                      shape="round"
                      size="small"
                      onClick={() => {
                        share(record);
                      }}
                    />
                  </ButtonGroup>
                );
              },
            }) ||
              undefined,
          )}
          pagination={false}
          loading={loading}
          onChange={(_p, _f, s) => {
            console.log('TCL: sorter', sorter);
            const { field, order } = s;
            setSorter({ field, order });
          }}
          footer={() => {
            return (
              <Row align="middle">
                <Col span={24}>
                  <span className="mg-r-18">操作:</span>
                  <Button
                    size="small"
                    type="primary"
                    icon="delete"
                    onClick={() => {
                      console.log(selectedRowKeys);
                    }}
                  >
                    删除
                  </Button>
                  <span className="mg-r-10"></span>
                  <Button
                    size="small"
                    onClick={() => {
                      fetchData();
                    }}
                    icon="sync"
                    loading={loading}
                  >
                    刷新
                  </Button>
                  <span className="mg-r-10"></span>
                  <Button
                    size="small"
                    onClick={() => {
                      fetchData();
                    }}
                    icon="plus"
                    loading={loading}
                  >
                    创建
                  </Button>
                </Col>
              </Row>
            );
          }}
        />
        <Pagination
          style={{ marginTop: '1rem' }}
          showSizeChanger
          showTotal={total => `共有 ${total} 项`}
          pageSize={size}
          onShowSizeChange={(current, size) => {
            setSize(size);
          }}
          onChange={(current, size) => {
            setPage(current);
          }}
          defaultCurrent={page}
          total={total}
          disabled={loading}
        />
      </section>
    </div>
  );
};
export default connect(
  state => {
    return {
      request: state.request.restfulApiRequest,
      userId: state.user.id,
    };
  },
  () => ({}),
)(Exams);
