import javascript from '../../../src/js/parser/javascript/grammar.js';
import { testEach } from '../../helpers.js';

describe('parser/javascript/repeat_required.js', function() {

  testEach(
    'RepeatRequired',
    {
      '+': {
        minimum: 1,
        maximum: -1,
      },
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__repeat_required();
    },
  );

});
