import React, { useEffect, useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Context from './Context';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setHover':
      console.log('setHoverKey', action.payload);
      return { ...state, hoverKey: action.payload };
    case 'setDragKey':
      console.log('setDragKey', action.payload);
      return { ...state, dragKey: action.payload };
    case 'clean':
      return { hoverKey: null, dragKey: null };
    default:
      console.warn('NONE REDUCER ACTION HITTED!');
      return { ...state };
  }
};

const Container = props => {
  const [state, dispatch] = useReducer(reducer, { hoverKey: null, dragKey: null });
  useEffect(() => {
    console.log('init container');
    return () => {
      console.log('clean container');
    };
  }, []);
  return (
    <div className="container">
      <Context.Provider value={{ state, dispatch }}>
        <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
      </Context.Provider>
    </div>
  );
};

export default Container;
