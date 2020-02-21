import React, { useEffect, useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Context from './Context';
import TreeViewer from './TreeViewer';
export const MOVE_CARD = 'moveCard';
export const RESET_CARD = 'resetCard';
const reducer = (state, action) => {
  switch (action.type) {
    case MOVE_CARD:
      console.log('moveCard ,next state', action.payload);
      return [...action.payload];
    case RESET_CARD:
      console.log('RESET_CARD ,next state', action.payload);
      return [...action.payload];
    default:
      return [...state];
  }
};

const Container = props => {
  const {
    initialDataSource = [],
    showTreeView = false,
    rowKey = 'id',
    titleIndex = 'title',
    treeViewClassName = '',
    bodyClassName = '',
    bodyStyle = {},
    treeViewStyle = {},
    onChange = state => {
      console.log('onChange', state);
    },
    resetDataSource = () => {
      console.log('props.resetDataSource is empty');
    },
  } = props;
  const [state, dispatch] = useReducer(reducer, initialDataSource);
  useEffect(() => {
    console.log('init container');
    resetDataSource(data => dispatch({ type: RESET_CARD, payload: data }));
    return () => {
      console.log('clean container');
    };
  }, [resetDataSource]);
  const dispatchHook = ({ type, payload }) => {
    dispatch({ type, payload });
    if (type === MOVE_CARD) {
      onChange(payload);
    }
  };
  return (
    <div className="container">
      <Context.Provider value={{ state, dispatch: dispatchHook, rowKey, titleIndex }}>
        <DndProvider backend={HTML5Backend}>
          <div
            className={bodyClassName}
            style={{ display: 'flex', flexDirection: 'row', flex: 1, ...bodyStyle }}
          >
            <div style={{ flex: 1, marginRight: showTreeView ? '150px' : '10px' }}>
              {props.children}
            </div>
            {showTreeView ? (
              <div
                className={treeViewClassName}
                style={{ ...treeViewStyle, position: 'fixed', right: '20px' }}
              >
                <h4
                  style={{ textAlign: 'center', display: state && state.length ? 'block' : 'none' }}
                >
                  拖动图标以排序
                </h4>
                <TreeViewer rowKey={rowKey} title={titleIndex} />
              </div>
            ) : null}
          </div>
        </DndProvider>
      </Context.Provider>
    </div>
  );
};

export default Container;
