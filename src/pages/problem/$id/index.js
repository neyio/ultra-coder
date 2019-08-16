/**
 * title: 题目界面
 * Routes:
 *   - ./src/pages/problem/$id/index.js
 *   - ./src/pages/problem/$id/description.js
 *   - ./src/pages/problem/$id/discuss.js
 *   - ./src/pages/problem/$id/history.js
 */
import React from 'react';
export default function Index({ match }) {
  const { id } = match.params;
  return <div>Index- {id}</div>;
}
