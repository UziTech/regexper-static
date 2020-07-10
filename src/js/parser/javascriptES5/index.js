// Entry point for the JavaScriptES5-flavor regular expression parsing and
// rendering. Actual parsing code is in
// [parser.js](./javascript/parser.html) and the grammar file. Rendering code
// is contained in the various subclasses of
// [Node](./javascript/node.html)

import parser from './parser.js';
import JavascriptParser from '../javascript/index.js';

export default class Parser extends JavascriptParser {
  // - __container__ - DOM node that will contain the rendered expression
  // - __options.keepContent__ - Boolean indicating if content of the container
  //    should be preserved after rendering. Defaults to false (don't keep
  //    contents)
  constructor(container, options) {
    super(container, options);

    this.parser = parser;
  }
}
