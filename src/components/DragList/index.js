import React, { useEffect, useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Context from './Context';
const MOVE_CARD = 'moveCard';
const RESET_CARD = 'moveCard';
const reducer = (state, action) => {
  switch (action.type) {
    case MOVE_CARD:
      console.log('moveCard ,next state', action.payload);
      return [...action.payload];
    case RESET_CARD:
      return [...action.payload];
    default:
      return [...state];
  }
};

const Container = props => {
  const {
    dataSource = [],
    onChange = state => {
      console.log('onChange', state);
    },
    resetDataSource = () => {
      console.log('props.resetDataSource is empty');
    },
  } = props;
  const [state, dispatch] = useReducer(reducer, dataSource);
  useEffect(() => {
    console.log('init container');
    resetDataSource(data => dispatch({ type: RESET_CARD, payload: data }));
    return () => {
      console.log('clean container');
    };
  }, [resetDataSource]);
  const dispatchHook = ({ type, payload, ...rest }) => {
    dispatch({ type, payload, ...rest });
    if (type === MOVE_CARD) {
      onChange(payload);
    }
  };
  return (
    <div className="container">
      <Context.Provider value={{ state, dispatch: dispatchHook }}>
        <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
      </Context.Provider>
    </div>
  );
};

export default Container;
