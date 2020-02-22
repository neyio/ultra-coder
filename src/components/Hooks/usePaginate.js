import { useState, useEffect, useCallback } from 'react';

const usePaginate = (
  {
    api: initialApi,
    params: initialParams,
    extra: initialExtra,
    request,
    page: initialPage,
    size: initialSize,
    search: initialSearch,
    sorter: initialSorter,
  } = {
    page: 1,
    size: 10,
    search: null,
    sorter: null,
    api: null,
    params: {},
    extra: {},
    request: null,
  },
) => {
  if (!request) {
    throw new Error('request lost in usePaginate!');
  }
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [api, setApi] = useState(initialApi);
  const [params, setParams] = useState(initialParams);
  const [extra, setExtra] = useState(initialExtra);
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(initialSearch || null);
  const [sorter, setSorter] = useState(initialSorter || null);
  const fetchData = useCallback(async () => {
    console.log('TCL: fetchData -> api, params', api, params);
    setLoading(true);
    const response = await request(api, params, { ...extra, page, size, search, sorter });
    setData(response.data);
    setTotal(response.total);
    setLoading(false);
  }, [api, extra, page, params, request, search, size, sorter]);
  useEffect(() => {
    fetchData();
    return () => {
      console.log('unmount usepaginate');
    };
  }, [fetchData]);
  return [
    { data, page, size, total, loading, sorter, fetchData },
    { setData, setPage, setSize, setSearch, setParams, setExtra, setApi, setSorter },
  ];
};

export default usePaginate;
