import React, { useState } from 'react';
const Wrapper = WrappedComponent => {
  return React.forwardRef((props, ref) => {
    const { initToggle = true, onChange = () => {} } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [toggle, setToggle] = useState(initToggle);
    if (toggle) {
      return <React.Fragment> {props.children(setToggle)}</React.Fragment>;
    } else {
      return (
        <WrappedComponent
          {...props}
          ref={ref}
          onChange={e => {
            onChange(e);
            setToggle(true);
          }}
        />
      );
    }
  });
};

export default Wrapper;
