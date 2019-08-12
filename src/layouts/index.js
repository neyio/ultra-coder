import classNames from 'classnames';
import { connect } from 'dva';
import React, { Component } from 'react';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import Media from 'react-media';
import query from './config/mediaQuery';
import Context from './context';

class DefaultLayout extends Component {
  static defaultProps = {
    appName: '请在common中对appName进行配置',
  };

  getContext = () => {
    return {};
  };

  render() {
    const { children, appName } = this.props;
    return (
      <React.Fragment>
        <DocumentTitle title={appName}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params, 'fullscreen', 'default-layout')}>{children}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

const stateMap = ({ common }) => {
  return {
    appName: common.appName,
  };
};

export default connect(stateMap)(props => {
  return (
    <Media query="(max-width: 599px)">
      {isMobile =>
        isMobile ? (
          <div> 移动端适配晚点再写 </div>
        ) : (
          <DefaultLayout {...props} isMobile={isMobile} />
        )
      }
    </Media>
  );
});
