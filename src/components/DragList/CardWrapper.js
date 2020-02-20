import React, { useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { css } from 'emotion';
import ItemTypes from './ItemTypes';
import dragHandlerSvg from './draghandler.svg';

const presetStyle = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
};

const Card = React.forwardRef(
  (
    {
      children,
      isDragging,
      style,
      className,
      connectDragSource,
      connectDragPreview,
      connectDropTarget,
    },
    ref,
  ) => {
    const elementRef = useRef(null);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));
    return connectDragPreview(
      <div ref={elementRef} style={{ ...presetStyle, ...style, opacity }} className={className}>
        {connectDragSource(
          <img
            className={css`
              font-size: 14px;
              width: 14px;
              position: abosulte;
              top: 0;
              left: 0;
              transform: rotate(-90deg);
              margin-right: 14px;
              &:hover {
                cursor: move;
              }
            `}
            src={dragHandlerSvg}
            alt="dragHandlerSvg"
          />,
        )}
        {children}
      </div>,
    );
  },
);

export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
      connectDragPreview: connect.dragPreview(),
    }),
  )(Card),
);
