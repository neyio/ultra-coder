/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
export default () => {
  importScripts('marked.min.js');
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code) {
      return require('highlight.js').highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });

  onmessage = e => {
    const markdownString = e.data;
    postMessage(marked(markdownString));
    self.close();
  };
};
