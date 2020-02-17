import React, { useState } from 'react';
import assert from 'assert';
import { Pagination, Table, Row, Col, Icon, Button, Input } from 'antd';
import { connect } from 'dva';
import usePaginate from '@/components/Hooks/usePaginate';

const allowZeroAndFalse = cb => (data = {}) => {
  return cb(
    typeof data === 'object' &&
      Object.keys(data).reduce((pre, i) => {
        if (data[i] || data[i] === 0 || data[i] === false) return { ...pre, [i]: data[i] };
        else {
          return pre;
        }
      }, {}),
  );
};

export const mixinFilter = (config = {}) => (
  filters,
  setFilters,
  callback = filterData => {
    console.log(filterData);
  },
) => {
  const { dataIndex } = config;
  assert(dataIndex, 'dataIndex must be set here.');
  return filters
    ? {
        ...config,
        onFilterDropdownVisibleChange: visible => {},
        filterIcon: () => (
          <Icon type="search" style={{ color: filters[dataIndex] ? '#1890ff' : undefined }} />
        ),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={'输入过滤值'}
              value={selectedKeys[dataIndex]}
              onChange={e => {
                const nextFilters = {
                  ...filters,
                  [dataIndex]: e.target.value,
                };

                if (e.target.value === '') {
                  delete nextFilters[dataIndex];
                }
                setSelectedKeys({ ...selectedKeys, [dataIndex]: e.target.value });
                setFilters({ ...filters, [dataIndex]: e.target.value });
                console.log('TCL: nextFilters', nextFilters);
              }}
              onPressEnter={() => {
                callback(filters);
                confirm();
              }}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => {
                callback(filters);
                confirm();
              }}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              查找
            </Button>
            <Button
              onClick={() => {
                const nextFilters = { ...filters, [dataIndex]: null };
                setFilters(nextFilters);
                setSelectedKeys(nextFilters);
                callback(nextFilters);
                confirm();
              }}
              size="small"
              style={{ width: 90 }}
            >
              重置
            </Button>
          </div>
        ),
      }
    : config;
};

const useTableExample = ({ request }) => {
  const config = {
    api: 'example.city',
    params: { exampleId: 1 },
    extra: {},
    page: 1,
    size: 10,
  };
  const [filters, setFilters] = useState({});
  const [{ data, page, total, loading }, { setPage, setSize, setSearch }] = usePaginate({
    request,
    ...config,
  });

  return (
    <figure>
      <Table
        rowSelection={{ width: 80, fixed: true, type: 'checkbox' }}
        bordered
        dataSource={data || []}
        size="small"
        rowKey="title"
        columns={[
          mixinFilter({
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render: text => <span>{text}</span>,
          })(filters, setFilters, data => allowZeroAndFalse(setSearch)(data)),
          mixinFilter({
            title: 'type',
            dataIndex: 'type',
            key: 'type',
          })(filters, setFilters, setSearch),
        ]}
        pagination={false}
        loading={loading}
        footer={() => {
          return (
            <Row align="top">
              <Col span={3} style={{ width: 80 }}>
                操作:
              </Col>
              <Col span={21}>col-8</Col>
            </Row>
          );
        }}
      />
      <Pagination
        showSizeChanger
        showTotal={total => `共有 ${total} 项`}
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
    </figure>
  );
};

export default connect(
  state => {
    return {
      request: state.request.restfulApiRequest,
    };
  },
  () => ({}),
)(useTableExample);
