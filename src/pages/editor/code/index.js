// import { handleBEM } from '@/utils/handleBEM';

import transforms from './transform';
import queries from './query';
import { onKeyDown } from './handler';
import { decorate, renderLeaf, renderElement } from './render';
// import { DEFAULT_OPTION } from './config';

// may be a better name

export const CodeReact = {
  onKeyDown,
  decorate,
  renderLeaf,
  renderElement,
};

export const Code = {
  ...transforms,
  ...queries,
};

export const withCode = editor => editor;
