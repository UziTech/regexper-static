import javascript from '../../../src/js/parser/javascript/grammer.js';
import { testEach } from '../../helpers.js';

describe('parser/javascript/anchor.js', function() {

  testEach(
    'Anchor',
    {
      '^': {
        label: 'Start of line',
      },
      '$': {
        label: 'End of line',
      },
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__anchor();
    },
  );

});
