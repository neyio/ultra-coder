import htmlTags from 'html-tags';
import voidHtmlTags from 'html-tags/void';
export const MUYA_DEFAULT_OPTION = {
  focusMode: false,
  markdown: '',
  trimUnnecessaryCodeBlockEmptyLines: false, // 是否去除空行
  preferLooseListItem: true,
  autoPairBracket: true, // 自动修复符号对
  autoPairMarkdownSyntax: true, // 自动修复markdown语法
  autoPairQuote: true,
  bulletListMarker: '-',
  orderListDelimiter: '.',
  tabSize: 4,
  // bullet/list marker width + listIndentation, tab or Daring Fireball Markdown (4 spaces) --> list indentation
  listIndentation: 1,
  frontmatterType: '-',
  sequenceTheme: 'hand', // hand or simple
  mermaidTheme: 'default', // dark / forest / default
  vegaTheme: 'latimes', // excel / ggplot2 / quartz / vox / fivethirtyeight / dark / latimes
  hideQuickInsertHint: false,
  // Whether we should set spellcheck attribute on our container to highlight misspelled words.
  // NOTE: The browser is not able to correct misspelled words words without a custom
  // implementation like in Mark Text.
  spellcheckEnabled: false,
  // transform the image to local folder, cloud or just return the local path
  imageAction: null,
  // Call Electron open dialog or input element type is file.
  imagePathPicker: null,
  clipboardFilePath: () => {},
  // image path auto completed when you input in image selector.
  imagePathAutoComplete: () => [],
};

// TYPE1 ~ TYPE7 according to https://github.github.com/gfm/#html-blocks
export const BLOCK_TYPE1 = ['script', 'pre', 'style'];

export const BLOCK_TYPE2_REG = /^<!--(?=\s).*\s+-->$/;

export const BLOCK_TYPE7 = htmlTags.filter(tag => {
  return !BLOCK_TYPE1.find(t => t === tag) && !BLOCK_TYPE6.find(t => t === tag);
});

export const BLOCK_TYPE6 = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'meta',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul',
];

export const VOID_HTML_TAGS = voidHtmlTags;
export const HTML_TAGS = htmlTags;
