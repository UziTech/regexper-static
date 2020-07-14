// Sets up the parser generated by canopy to use the
// [Node](../node.html) subclasses in the generated tree. This is all
// a bit of a hack that is dependent on how canopy creates nodes in its parse
// tree.
import grammer from './grammar.peg';
import parser from '../parser.js';
import Root from './root.js';
import InlineFlag from './inline_flag.js';
import Escape from './escape.js';
import CharsetEscape from './charset_escape.js';

export default parser(grammer, {
  Root,
  InlineFlag,
  Escape,
  CharsetEscape,
});