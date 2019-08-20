/**
 * title: 题目界面
 * Routes:
 *   - ./src/pages/problem/$id/index.js
 *   - ./src/pages/problem/$id/comment.js
 *   - ./src/pages/problem/$id/solution.js
 *   - ./src/pages/problem/$id/history.js
 */
import React from 'react';
// import { req } from '@/utils/request';
export default function Index({ match }) {
  // req('post.comment.get', { postId: 1 }, { name: 'name' });
  const { id } = match.params;
  return <div>Index- {id}</div>;
}
