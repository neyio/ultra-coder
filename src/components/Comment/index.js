import React from 'react';

import CommentItem from './CommentItem';
export default class CommentList extends React.Component {
  render() {
    return [1, 2, 3, 4, 5, 6, 7].map(item => <CommentItem key={item} />);
  }
}
