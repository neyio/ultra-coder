import React, { useState } from 'react';
import DragContainer from '@/components/DragContainer';
import Demo from '@/components/DragContainer/Demo';
export default function DragPanelDemo() {
  // const [state, setState] = useState();
  return (
    <div>
      <DragContainer
        // data={state}
        // onChange={state => setState(state)}
        // renderItem={() => {
        //   return <div>renderItem</div>;
        // }}
        showTreeList
      >
        <Demo />
      </DragContainer>
    </div>
  );
}
