import php from '../../../src/js/parser/php/grammer.js';
import { testEach } from '../../helpers.js';

describe('parser/php/escape.js', function() {

  testEach(
    'Escape',
    {
      '\\a': { label: 'bell (0x07)', ordinal: 0x07 },
      '\\e': { label: 'escape (0x1B)', ordinal: 0x1b },
      '\\h': { label: 'horizontal whitespace', ordinal: -1 },
      '\\H': { label: 'not horizontal whitespace', ordinal: -1 },
      '\\N': { label: 'not line break', ordinal: -1 },
      '\\R': { label: 'any line break', ordinal: -1 },
      '\\v': { label: 'vertical whitespace', ordinal: -1 },
      '\\V': { label: 'not vertical whitespace', ordinal: -1 },
    },
    str => {
      const parser = new php.Parser(str);
      return parser.__consume__terminal();
    },
  );

});
