// Escape nodes are used for escape sequences. It is rendered as a label with
// the description of the escape and the numeric code it matches when
// appropriate.

import Escape from '../escape.js';

export default {
  ...Escape,
  v: ['vertical whitespace', -1, false],
  V: ['not vertical whitespace', -1, false],
};
