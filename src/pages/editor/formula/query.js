import { Element } from 'slate';
// import Formula from './index';
import { ELEMENT_NAME } from './config';

export default {
  isFormula(element) {
    return Element.isElement(element) && element.type === ELEMENT_NAME;
  },
};
