import javascript from '../../../src/js/parser/javascript/grammar.js';
import { testEach } from '../../helpers.js';

describe('parser/javascript/repeat_optional.js', function() {

  testEach(
    'RepeatOptional',
    {
      '?': {
        minimum: 0,
        maximum: 1,
      },
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__repeat_optional();
    },
  );

});
