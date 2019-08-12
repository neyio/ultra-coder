import React, { Component } from 'react';

export default class Problem extends Component {
  componentDidMount() {
    console.log('当前获取到的参数为', this.props.match.params.id);
  }

  render() {
    const { id } = this.props.match.params;
    return <div>当前题目编号为:{id} </div>;
  }
}
