import php from '../../../src/js/parser/php/grammar.js';
import { testEach } from '../../helpers.js';

describe('parser/php/anchor.js', function() {

  testEach(
    'Anchor',
    {
      '\\A': {
        label: 'Start of line',
      },
      '\\G': {
        label: 'Start of match',
      },
      '\\z': {
        label: 'End of line',
      },
      '\\Z': {
        label: 'End of line',
      },
    },
    str => {
      const parser = new php.Parser(str);
      return parser.__consume__anchor();
    },
  );

});
