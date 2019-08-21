import React, { useState, useEffect, useCallback } from 'react';
import { List, message } from 'antd';
import req from '../../utils/routes';
import styles from './dynamic.less';
import classnames from 'classnames';
/**
 * DaynamicList
 */
export default function DynamicList({
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
}) {
  const { keyChain = null, params = {}, extra = {} } = action;
  const [data, setData] = useState(items);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initPage);
  const [size, setSize] = useState(initSize);

  const momCallback = useCallback(async () => {
    console.log(`page:${page},size:${size}`);
    if (keyChain) {
      try {
        setLoading(true);
        const response = await req(keyChain, params, {
          ...extra,
          page,
          size,
        });
        setLoading(false);
        console.log('response: ', response);
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
  }, [params, extra, keyChain, page, size]);

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
        <figure
          className={classnames(styles.dynamicListItem, itemClassName || '')}
          style={itemStyle}
        >
          {renderItem(item, index)}
        </figure>
      )}
    />
  );
}
