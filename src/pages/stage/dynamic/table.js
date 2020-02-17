import React from 'react';

import { Pagination, Table, Row, Col } from 'antd';
import { connect } from 'dva';

import usePaginate from '@/components/Hooks/usePaginate';

const useTableExample = ({ request }) => {
  const config = {
    api: 'example.city',
    params: { exampleId: 1 },
    extra: {},
    page: 1,
    size: 10,
  };
  const [{ data, page, total, loading }, { setPage, setSize }] = usePaginate({
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
        columns={[
          {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render: text => <span>{text}</span>,
          },
          {
            title: 'type',
            dataIndex: 'type',
            key: 'type',
          },
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
