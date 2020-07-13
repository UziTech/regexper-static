import javascriptES5 from '../../../src/js/parser/javascriptES5/grammar.js';
import { testEach } from '../../helpers.js';

describe('parser/javascriptES5/subexp.js', function() {

  testEach(
    'Subexp',
    {
      '(?<name>test)': null,
      '(?<=test)': null,
      '(?<!test)': null,
    },
    str => {
      const parser = new javascriptES5.Parser(str);
      return parser.__consume__subexp();
    },
  );

});
