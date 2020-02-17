import React from 'react';

import { Pagination, List, Typography } from 'antd';
import { connect } from 'dva';

import usePaginate from '../../../components/Hooks/usePaginate';

const usePaginateExample = ({ request }) => {
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
    <div>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data || []}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark>[City]</Typography.Text> {item.title}
          </List.Item>
        )}
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
        defaultCurrent={1 || page}
        total={total}
        disabled={loading}
      />
    </div>
  );
};

export default connect(
  state => {
    return {
      request: state.request.restfulApiRequest,
    };
  },
  () => ({}),
)(usePaginateExample);
