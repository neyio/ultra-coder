/**
 * title: 题目界面
 * Routes:
 *   - ./src/pages/problem/$id/index.js
 *   - ./src/pages/problem/$id/comment.js
 *   - ./src/pages/problem/$id/solution.js
 *   - ./src/pages/problem/$id/history.js
 */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd';

function Index(props) {
  const {
    match: {
      params: { id },
    },
    loadProblemById,
    problem,
  } = props;
  const { items } = problem;
  useEffect(() => {
    loadProblemById(id, response => {
      console.log('loaded', response);
    });
  }, [id, loadProblemById]);
  const item = items[id];
  if (item)
    return (
      <div>
        渲染一波吧{item.title} - {item.description}
      </div>
    );
  return <Skeleton active />;
}
export default connect(
  ({ problem, loading }) => ({ problem, loading }),
  dispatch => ({
    loadProblemById(id, callback = () => {}) {
      dispatch({
        type: 'problem/loadProblemById',
        payload: {
          id,
          callback,
        },
      });
    },
  }),
)(Index);
