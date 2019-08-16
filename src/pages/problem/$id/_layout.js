import React from 'react';
import styled from 'styled-components';
import ProblemTabs from '../../../components/Problem/ProblemTabs';
import Header from '../../../components/Problem/Header';
import styles from './_layout.less';
import { Icon, Button } from 'antd';
import CodeEditor from '../../../components/CodeEditor';
const ProblemContainer = styled.section`
  background: transparent;
`;
const CodeContainer = styled.section``;
const Divider = styled.div`
  background: linear-gradient(180deg, #fafafa 10%, #fff 90%);
  color: #b0bec5;
  position: relative;
  flex: 0 0 10px;
  width: 10px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: col-resize;
    transition: all 0.4s;
    background: #f5f5f5;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
`;

export default class Layout extends React.Component {
  _codeRef = null;
  _problemRef = null;
  _tempEvent = null;

  componentDidMount() {}

  onMouseMoveHandler = bodyWidth => ({ clientX }) => {
    const percent = (clientX / bodyWidth) * 2;
    this._problemRef.style.flex = percent;
    this._codeRef.style.flex = 2 - percent;
  };

  resizeHandlerMouseDown = () => {
    const bodyWidth = document.body.scrollWidth;
    this._tempEvent = this._tempEvent || this.onMouseMoveHandler(bodyWidth);
    document.addEventListener('mousemove', this._tempEvent);
  };

  clearMoveHandler = () => {
    document.removeEventListener('mousemove', this._tempEvent);
  };

  render() {
    const { props } = this;
    const { id } = props.match.params;
    return (
      <section className={styles.mainContainer}>
        <Header />
        <section className={styles.contentContainer}>
          <ProblemContainer
            ref={_r => {
              this._problemRef = _r;
            }}
            className={styles.problemContainer}
          >
            <ProblemTabs id={id} />
            {props.children}
          </ProblemContainer>
          <Divider onMouseDown={this.resizeHandlerMouseDown} onMouseUp={this.clearMoveHandler}>
            <Icon type="more" />
          </Divider>
          <CodeContainer
            ref={_r => {
              this._codeRef = _r;
            }}
            className={styles.codeContainer}
          >
            <CodeEditor
              height="500px"
              extra={
                <span>
                  <Button type="link" icon="info" />
                </span>
              }
            />
          </CodeContainer>
        </section>
      </section>
    );
  }
}
