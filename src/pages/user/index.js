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
    return <div>{nickname} - index.js</div>;
  }
}
export default Index;
