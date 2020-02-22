import React, { useContext } from 'react';
import CardWrapper from './CardWrapper';
import Context from './Context';
import update from 'immutability-helper';
const move = cards => (dragIndex, hoverIndex) => {
  const dragCard = cards[dragIndex];
  const nextCards = update(cards, {
    $splice: [
      [dragIndex, 1],
      [hoverIndex, 0, dragCard],
    ],
  });

  return nextCards;
};

const Container = props => {
  const { state, dispatch, rowKey = 'id' } = useContext(Context);
  const { renderItem, style = {}, className = '' } = props;
  const moveCard = (dragIndex, hoverIndex) => {
    dispatch({ type: 'moveCard', payload: move(state)(dragIndex, hoverIndex) });
  };

  return state.map((card, i) => (
    <CardWrapper
      style={style}
      className={className}
      key={card[rowKey]}
      rowKey={rowKey}
      index={i}
      id={card[rowKey]}
      moveCard={moveCard}
    >
      {renderItem(card)}
    </CardWrapper>
  ));
};
export default Container;
