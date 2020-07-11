// CharsetEscape nodes are for escape sequences inside of character sets. They
// differ from other [Escape](./escape.html) nodes in that `\b` matches a
// backspace character instead of a word boundary.

import CharsetEscape from '../charset_escape.js';

export default {
  ...CharsetEscape,
  v: ['vertical whitespace', -1, false],
  V: ['not vertical whitespace', -1, false],
};
