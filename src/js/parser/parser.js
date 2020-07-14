// This function is used in each grammar.js file to add the Default Nodes.
// Each grammar can overwrite whichever Nodes they want by passing the nodes object.

import Node from './node.js';
import Root from './root.js';
import Regexp from './regexp.js';
import Match from './match.js';
import MatchFragment from './match_fragment.js';
import Anchor from './anchor.js';
import Subexp from './subexp.js';
import Subroutine from './subroutine.js';
import Charset from './charset.js';
import CharsetEscape from './charset_escape.js';
import CharsetRange from './charset_range.js';
import Literal from './literal.js';
import Escape from './escape.js';
import AnyCharacter from './any_character.js';
import Repeat from './repeat.js';
import RepeatAny from './repeat_any.js';
import RepeatOptional from './repeat_optional.js';
import RepeatRequired from './repeat_required.js';
import RepeatSpec from './repeat_spec.js';
import Comment from './comment.js';
import Posix from './posix.js';
import InlineFlag from './inline_flag.js';

export default function parser(grammar, nodes = {}) {

  // Canopy creates an instance of SyntaxNode for each element in the tree, then
  // adds any necessary fields to that instance. In this case, we're replacing
  // the default class with the Node class.
  grammar.Parser.SyntaxNode = nodes.Node || Node;

  // Once the SyntaxNode instance is created, the specific node type object is
  // overlayed onto it. This causes the module attribute on the Node to be set,
  // which updates the Node instance into the more specific "subclass" that is
  // used for rendering.
  grammar.Parser.Root = { module: nodes.Root || Root };
  grammar.Parser.Regexp = { module: nodes.Regexp || Regexp };
  grammar.Parser.Match = { module: nodes.Match || Match };
  grammar.Parser.MatchFragment = { module: nodes.MatchFragment || MatchFragment };
  grammar.Parser.Anchor = { module: nodes.Anchor || Anchor };
  grammar.Parser.Subexp = { module: nodes.Subexp || Subexp };
  grammar.Parser.Subroutine = { module: nodes.Subroutine || Subroutine };
  grammar.Parser.Charset = { module: nodes.Charset || Charset };
  grammar.Parser.CharsetEscape = { module: nodes.CharsetEscape || CharsetEscape };
  grammar.Parser.CharsetRange = { module: nodes.CharsetRange || CharsetRange };
  grammar.Parser.Literal = { module: nodes.Literal || Literal };
  grammar.Parser.Escape = { module: nodes.Escape || Escape };
  grammar.Parser.AnyCharacter = { module: nodes.AnyCharacter || AnyCharacter };
  grammar.Parser.Repeat = { module: nodes.Repeat || Repeat };
  grammar.Parser.RepeatAny = { module: nodes.RepeatAny || RepeatAny };
  grammar.Parser.RepeatOptional = { module: nodes.RepeatOptional || RepeatOptional };
  grammar.Parser.RepeatRequired = { module: nodes.RepeatRequired || RepeatRequired };
  grammar.Parser.RepeatSpec = { module: nodes.RepeatSpec || RepeatSpec };
  grammar.Parser.Comment = { module: nodes.Comment || Comment };
  grammar.Parser.Posix = { module: nodes.Posix || Posix };
  grammar.Parser.InlineFlag = { module: nodes.InlineFlag || InlineFlag };

  return grammar;
}
