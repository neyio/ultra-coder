import React from 'react';
import assert from 'assert';
import { Icon, Button, Input } from 'antd';

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

export const mixinSelection = (selectedRowKeys, setSelectedRowKeys, config = {}) => {
  return {
    rowSelection: {
      width: 80,
      fixed: true,
      type: 'checkbox',
      ...config,
      selectedRowKeys,
      onChange: selectedRowKeys => {
        console.log(selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
      },
    },
  };
};
