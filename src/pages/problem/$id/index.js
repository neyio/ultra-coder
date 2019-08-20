/**
 * title: 题目界面
 * Routes:
 *   - ./src/pages/problem/$id/index.js
 *   - ./src/pages/problem/$id/comment.js
 *   - ./src/pages/problem/$id/solution.js
 *   - ./src/pages/problem/$id/history.js
 */
import React from 'react';
import req, { routeMap } from '@/utils/routes';
export default function Index({ match }) {
  req('post.comment.show', { postId: 1, commentId: 2 }, { name: '3' });
  console.log(routeMap);
  const { id } = match.params;
  return <div>Index- {id}</div>;
}
