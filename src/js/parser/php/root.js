// Root nodes contain the top-level [Regexp](./regexp.html) node. Any flags
// and a few decorative elements are rendered by the root node.

import Root from '../root.js';

export default {
  ...Root,
  flagLabels: {
    g: 'Global',
    i: 'Ignore Case',
    m: 'Multiline',
    s: 'Dot All',
    x: 'Ignore Whitespace',
    A: 'Must Be Anchored',
    D: 'Dollar At End Only',
    S: 'Extra Analysis',
    U: 'Invert Greedy',
    X: 'Extra Functionality',
    J: 'Duplicate Group Names',
    u: 'UTF-8',
  },
};
