import React from 'react';
import { cx, css } from 'emotion';
export default function EditorShower({ value }) {
  return (
    <div
      className={cx(
        'bf-container',
        css`
          height: 100%;
          max-height: 100%;
          background: #f8f8f8;
          border-radius: 10px;
        `,
      )}
    >
      <div className="public-DraftEditor-content">
        <div
          dangerouslySetInnerHTML={{
            __html: value || '<p>点击文本进行编辑。</p>',
          }}
        />
      </div>
    </div>
  );
}
