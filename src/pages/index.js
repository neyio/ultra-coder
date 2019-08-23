import React from 'react';

import styles from './index.css';
import MarkdownEditor from '../components/Markdown/Editor/index.js';

export default function Index(props) {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <div style={{ width: '660px', padding: '3rem', height: '440px' }}>
        <MarkdownEditor />
      </div>
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">Getting Started</a>
        </li>
      </ul>
    </div>
  );
}
