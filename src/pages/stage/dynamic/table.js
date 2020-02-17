import React, { useState } from 'react';

import { Pagination, Table, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import usePaginate from '@/components/Hooks/usePaginate';
import { mixinFilter, mixinSelection } from '@/components/Dynamic/Table';

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

const useTableExample = ({ request }) => {
  const config = {
    api: 'example.city',
    params: { exampleId: 1 },
    extra: {},
    page: 1,
    size: 10,
  };
  const [filters, setFilters] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [{ data, page, total, loading }, { setPage, setSize, setSearch }] = usePaginate({
    request,
    ...config,
  });

  return (
    <figure style={{ background: '#fff' }}>
      <Table
        {...mixinSelection(selectedRowKeys, setSelectedRowKeys, {})}
        bordered
        dataSource={data || []}
        size="small"
        rowKey="title"
        scrollToFirstRowOnChange={true}
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
            <Row align="center">
              <Col span={3} style={{ width: 80 }}>
                操作:
              </Col>
              <Col span={21}>
                <Button
                  onClick={() => {
                    console.log(selectedRowKeys);
                  }}
                >
                  获取点击的行
                </Button>
              </Col>
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
