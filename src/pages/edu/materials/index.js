import React, { useState } from 'react';
import { PageHeader, Divider, Table, Pagination, Row, Breadcrumb, Icon, Col, Button } from 'antd';
import usePaginate from '@/components/Hooks/usePaginate';
import { mixinFilter, mixinSelection } from '@/components/Dynamic/Table';
import Upload from '@/components/Dynamic/Upload';
import { connect } from 'dva';
import { cx, css } from 'emotion';
const ButtonGroup = Button.Group;

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/edu',
    breadcrumbName: '教学过程',
  },
  {
    path: '/edu/materials',
    breadcrumbName: '课件库',
  },
];

const Libs = ({ userId, request }) => {
  const config = {
    api: 'user.material.get',
    params: { userId },
    extra: {},
    page: 1,
    size: 30,
  };
  const [filters, setFilters] = useState({}); //过滤
  const [path, setPath] = useState([]); //面包屑
  const [files, setFiles] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [
    { data, page, total, size, loading, fetchData, sorter = {} },
    { setPage, setSize, setSearch, setSorter, setApi, setParams, setExtra },
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
      <PageHeader title="课件库" breadcrumb={{ routes }} subTitle="请选择您的课程再进行课件管理" />
      <Divider type="horizontal" className={cx('mg-t-10', 'mg-b-10')}></Divider>
      <section className={cx('pd-18', 'pd-t-10')}>
        <Breadcrumb
          className={cx(
            'mg-b-18',
            'pd-l-10',
            css`
              border-left: 3px solid #999;
              &::before {
                content: '路径：';
              }
            `,
          )}
          onClick={e => {
            console.log(e);
          }}
        >
          <Breadcrumb.Item
            className={css`
              &:hover {
                cursor: pointer;
                color: #666;
                font-weight: bold;
              }
            `}
            onClick={() => {
              setPath([]);
              setApi('user.material.get');
              setParams({ userId });
              setExtra({});
              setPage(1);
              setFilters({});
            }}
          >
            <Icon type="home" /> 根目录
          </Breadcrumb.Item>

          {path.length ? (
            <React.Fragment>
              <Breadcrumb.Item
                className={css`
                  &:hover {
                    cursor: pointer;
                    color: #666;
                    font-weight: bold;
                  }
                `}
                onClick={() => {
                  const pathNotEmpty = path && path.length - 1 > 0 && path;
                  const api = pathNotEmpty ? 'user.material.show' : 'user.material.get';
                  const params = Object.assign(
                    { userId },
                    { materialId: pathNotEmpty ? path[path.length - 1].id : undefined },
                  );
                  setPath(path.slice(0, -1));
                  setApi(api);
                  setParams(params);
                  setExtra({});
                  setPage(1);
                  setFilters({});
                }}
              >
                <Icon type="left" />
                <span>返回上一级</span>
              </Breadcrumb.Item>
            </React.Fragment>
          ) : null}

          {path.reduce((acc, i) => {
            return i ? (
              <React.Fragment>
                {acc}
                <Breadcrumb.Item
                  onClick={() => {
                    setPath([]);
                  }}
                >
                  {i.title}
                </Breadcrumb.Item>
              </React.Fragment>
            ) : (
              acc
            );
          }, null)}
        </Breadcrumb>

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
              render: (text, record) => {
                return record.folder ? (
                  <span
                    className={css`
                      &:hover {
                        cursor: pointer;
                        color: #fff;
                      }
                    `}
                    onClick={() => {
                      setPath([...path, record]);
                      setApi('user.material.show');
                      setParams({ userId, materialId: record.id });
                      setExtra({});
                      setPage(1);
                      setFilters({});
                    }}
                  >
                    {text}
                  </span>
                ) : (
                  <span>{text}</span>
                );
              },
            })(filters, setFilters, setSearch),
            {
              title: '文件大小',
              dataIndex: 'size',
              key: 'size',
            },
            {
              title: '修改日期',
              dataIndex: 'updated_at',
              key: 'updated_at',
            },
            {
              title: '操作',
              key: 'actions',
              render: (_, record) => {
                return (
                  <ButtonGroup>
                    <Button
                      shape="round"
                      onClick={() => {
                        download(record);
                      }}
                      icon="download"
                      size="small"
                    >
                      下载
                    </Button>

                    <Button
                      icon="delete"
                      shape="round"
                      size="small"
                      onClick={() => {
                        destroy(record);
                      }}
                    >
                      删除
                    </Button>
                  </ButtonGroup>
                );
              },
            },
          ]}
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
                    icon="download"
                    onClick={() => {
                      console.log(selectedRowKeys);
                    }}
                  >
                    下载
                  </Button>
                  <span className="mg-r-10"></span>
                  <Button
                    size="small"
                    onClick={() => {
                      fetchData();
                    }}
                    icon="sync"
                    spin={loading}
                  >
                    刷新
                  </Button>
                  <span className="mg-r-10"></span>
                  <Upload
                    size="small"
                    value={files}
                    onChange={files => {
                      console.log('TCL: Libs -> e ', files);
                      setFiles(files);
                    }}
                    uploadSuccess={file => {
                      console.log('上传成功', file);
                    }}
                  />
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
)(Libs);
