import React, { useState, useEffect, useCallback } from 'react';
import { List, message } from 'antd';
import { cx } from 'emotion';
import { connect } from 'dva';
import { NAMESPACE } from '@/models/request';
import styles from './dynamic.less';
/**
 * DaynamicList
 */
export default connect(state => {
  return {
    request: state[NAMESPACE].restfulApiRequest,
  };
})(
  ({
    items = [],
    action = [],
    itemLayout = 'horizontal',
    renderItem = () => null,
    page: initPage = 1,
    size: initSize = 10,
    itemClassName = '',
    itemStyle = {},
    header = () => {
      return null;
    },
    request,
  }) => {
    const { api = null, params = {}, extra = {} } = action;

    const [data, setData] = useState(items);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(initPage);
    const [size, setSize] = useState(initSize);

    const momCallback = useCallback(async () => {
      console.log(`page:${page},size:${size}`);
      if (api) {
        try {
          setLoading(true);
          const response = await request(api, params, {
            ...extra,
            page,
            size,
          });
          setLoading(false);
          const {
            data: currentData,
            size: currentSize,
            page: currentPage,
            total: currentTotal,
          } = response;
          currentData && setData(currentData);
          currentSize && setSize(size);
          currentPage && setPage(page);
          currentTotal && setTotal(currentTotal);
        } catch (e) {
          message.error('获取数据失败');
          console.error(e);
        }
      }
    }, [params, extra, api, page, size, request]);

    useEffect(() => {
      momCallback();
      return () => {};
    }, [momCallback]);

    return (
      <List
        className={styles.dynamicList}
        loading={loading}
        itemLayout={itemLayout}
        dataSource={data}
        header={header(total)}
        pagination={{
          size: 'small',
          total: total,
          onChange: (p, s) => {
            page !== p && setPage(p);
            size !== s && setSize(s);
          },
          pageSize: size,
        }}
        renderItem={(item, index) => (
          <figure className={cx(styles.dynamicListItem, itemClassName)} style={itemStyle}>
            {renderItem(item, index)}
          </figure>
        )}
      />
    );
  },
);
