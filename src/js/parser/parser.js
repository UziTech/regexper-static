// This function is used in each grammer.js file to add the Default Nodes.
// Each grammer can overwrite whichever Nodes they want by passing the nodes object.

import Node from './node.js';
import Root from './root.js';
import Regexp from './regexp.js';
import Match from './match.js';
import MatchFragment from './match_fragment.js';
import Anchor from './anchor.js';
import Subexp from './subexp.js';
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

export default function parser(grammer, nodes = {}) {

  // Canopy creates an instance of SyntaxNode for each element in the tree, then
  // adds any necessary fields to that instance. In this case, we're replacing
  // the default class with the Node class.
  grammer.Parser.SyntaxNode = nodes.Node || Node;

  // Once the SyntaxNode instance is created, the specific node type object is
  // overlayed onto it. This causes the module attribute on the Node to be set,
  // which updates the Node instance into the more specific "subclass" that is
  // used for rendering.
  grammer.Parser.Root = { module: nodes.Root || Root };
  grammer.Parser.Regexp = { module: nodes.Regexp || Regexp };
  grammer.Parser.Match = { module: nodes.Match || Match };
  grammer.Parser.MatchFragment = { module: nodes.MatchFragment || MatchFragment };
  grammer.Parser.Anchor = { module: nodes.Anchor || Anchor };
  grammer.Parser.Subexp = { module: nodes.Subexp || Subexp };
  grammer.Parser.Charset = { module: nodes.Charset || Charset };
  grammer.Parser.CharsetEscape = { module: nodes.CharsetEscape || CharsetEscape };
  grammer.Parser.CharsetRange = { module: nodes.CharsetRange || CharsetRange };
  grammer.Parser.Literal = { module: nodes.Literal || Literal };
  grammer.Parser.Escape = { module: nodes.Escape || Escape };
  grammer.Parser.AnyCharacter = { module: nodes.AnyCharacter || AnyCharacter };
  grammer.Parser.Repeat = { module: nodes.Repeat || Repeat };
  grammer.Parser.RepeatAny = { module: nodes.RepeatAny || RepeatAny };
  grammer.Parser.RepeatOptional = { module: nodes.RepeatOptional || RepeatOptional };
  grammer.Parser.RepeatRequired = { module: nodes.RepeatRequired || RepeatRequired };
  grammer.Parser.RepeatSpec = { module: nodes.RepeatSpec || RepeatSpec };
  grammer.Parser.Comment = { module: nodes.Comment || Comment };
  grammer.Parser.Posix = { module: nodes.Posix || Posix };
  grammer.Parser.InlineFlag = { module: nodes.InlineFlag || InlineFlag };

  return grammer;
}
