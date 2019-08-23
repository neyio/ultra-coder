import React from 'react';

const UserIndex = props => {
  const {
    match: {
      params: { id },
    },
  } = props;
  return <div>用户 {id}</div>;
};

export default UserIndex;
