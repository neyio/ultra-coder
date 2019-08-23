import React, { Component } from 'react';
import { connect } from 'dva';
const mapState = ({ user }) => {
  return {
    user,
  };
};
const mapActions = dispatch => {
  return {};
};
@connect(
  mapState,
  mapActions,
)
class Index extends Component {
  render() {
    const {
      user: { nickname },
    } = this.props;
    return <div>{nickname} - 用户 排名或者解题 列表</div>;
  }
}
export default Index;
