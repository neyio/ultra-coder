import React, { useState } from 'react';
import { PageHeader, Divider, Table, Pagination, Descriptions, Row, Col, Button } from 'antd';
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
    path: '/edu/problem',
    breadcrumbName: '题库',
  },
];

const Libs = ({ userId, request, pageMode = true, onExport = () => {} }) => {
  const config = {
    api: 'user.problem.get',
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
  const destroy = record => {
    console.log('TCL: destroy -> record', record);
  };
  const download = record => {
    console.log('TCL: download -> record', record);
  };
  return (
    <div style={{ background: '#fff' }}>
      {pageMode ? (
        <React.Fragment>
          <PageHeader
            title="题库"
            breadcrumb={{ routes }}
            extra={[
              <Button
                type="primary"
                key="1"
                icon="plus"
                onClick={() => router.push('/edu/problems/create')}
              >
                创建题目
              </Button>,
            ]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="题目数量">20</Descriptions.Item>
              <Descriptions.Item label="最后一次更新日期">2017-10-10</Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <Divider type="horizontal" className={cx('mg-t-10', 'mg-b-10')}></Divider>
        </React.Fragment>
      ) : (
        <div className="pd-20">
          <Button
            type="primary"
            onClick={() => {
              onExport(
                data.filter(i => {
                  return new Set(selectedRowKeys).has(i.id);
                }),
              );
            }}
          >
            导入选中题目
          </Button>
        </div>
      )}
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
          ]
            .concat(
              pageMode
                ? {
                    title: '操作',
                    key: 'actions',
                    width: 120,
                    render: (_, record) => {
                      return (
                        <ButtonGroup>
                          <Button
                            shape="round"
                            onClick={() => {
                              download(record);
                            }}
                            icon="edit"
                            size="small"
                          ></Button>

                          <Button
                            icon="delete"
                            shape="round"
                            size="small"
                            onClick={() => {
                              destroy(record);
                            }}
                          ></Button>
                        </ButtonGroup>
                      );
                    },
                  }
                : null,
            )
            .filter(Boolean)}
          pagination={false}
          loading={loading}
          onChange={(_p, _f, s) => {
            console.log('TCL: sorter', sorter);
            const { field, order } = s;
            setSorter({ field, order });
          }}
          footer={
            pageMode
              ? () => {
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
                          spin={!!loading ? loading.toString() : undefined}
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
                          spin={!!loading ? loading.toString() : undefined}
                        >
                          创建
                        </Button>
                      </Col>
                    </Row>
                  );
                }
              : null
          }
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
)(Libs);
