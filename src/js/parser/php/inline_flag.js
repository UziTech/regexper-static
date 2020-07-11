// Root nodes contain the top-level [Regexp](./regexp.html) node. Any flags
// and a few decorative elements are rendered by the root node.

import InlineFlag from '../inline_flag.js';
import Root from './root.js';

export default {
  ...InlineFlag,
  flagLabels: Root.flagLabels,
};
