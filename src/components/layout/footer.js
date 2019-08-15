import React, { useState } from 'react';
export default function Footer() {
  const [count, setCount] = useState(0);
  return (
    <footer>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </footer>
  );
}
