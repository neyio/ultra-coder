import { CONTAINER, FOOTER, PARTS } from '../constants/layout';

export const CONSTANTS = {
  CONTAINER,
  FOOTER,
  PARTS,
};
export const NAMESPACE = 'layout';
export const ACTIONS = {
  UPDATE_BREADCRUMB: 'updateBreadcrumb',
};

const TEMPLATE = {
  ALL_SHOWN: {
    ...PARTS.reduce((acc, i) => {
      return { ...acc, [i]: true };
    }, {}),
  },
  ONLY_CONTAINER: {
    ...PARTS.reduce((acc, i) => {
      return { ...acc, [i]: i === CONTAINER };
    }, {}),
  },
  NO_FOOTER: {
    ...PARTS.reduce((acc, i) => {
      return { ...acc, [i]: i !== FOOTER };
    }, {}),
  },
};

/**
 * breadcrumb demo
 * [
 *  {
 *   path: 'index',
 *   breadcrumbName: 'home'
 *  },
 *  {
 *   path: 'first',
 *   breadcrumbName: 'first',
 *   children: [
 *    {
 *     path: '/general',
 *     breadcrumbName: 'General'
 *    },
 *    {
 *     path: '/layout',
 *     breadcrumbName: 'Layout'
 *    }
 *   ]
 *  },
 *  {
 *   path: 'second',
 *   breadcrumbName: 'second'
 *  }
 * ]
 *
 */

export default () => ({
  namespace: NAMESPACE,
  state: {
    shownParts: TEMPLATE.ALL_SHOWN,
    breadcrumb: [],
    modules: [],
    theme: 'base',
  },
  effects: {},
  reducers: {
    [ACTIONS.UPDATE_BREADCRUMB](state, { payload }) {
      state.breadcrumb = payload;
    },
  },
  subscriptions: {},
});
