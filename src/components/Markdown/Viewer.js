import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import styles from './markdown.css';

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
});
export default class MarkdownViewer extends Component {
  render() {
    return (
      <div
        className={styles['markdown-section']}
        dangerouslySetInnerHTML={{ __html: marked(this.props.content) }}
      />
    );
  }
}
