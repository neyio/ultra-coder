import { createUseDebounce } from './useDebounce';

const defaultOption = {
  leading: true,
  trailing: false,
};
export function createUseThrottle(options) {
  return createUseDebounce(Object.assign({}, defaultOption, options, { maxing: true }));
}

export default createUseThrottle();
