import javascript from '../../../src/js/parser/javascript/grammar.js';
import { testEach } from '../../helpers.js';

describe('parser/javascript/charset_escape.js', function() {

  testEach(
    'CharsetEscape',
    {
      '\\b': { label: 'backspace (0x08)', ordinal: 0x08 },
      '\\d': { label: 'digit', ordinal: -1 },
      '\\D': { label: 'non-digit', ordinal: -1 },
      '\\f': { label: 'form feed (0x0C)', ordinal: 0x0c },
      '\\n': { label: 'line feed (0x0A)', ordinal: 0x0a },
      '\\r': { label: 'carriage return (0x0D)', ordinal: 0x0d },
      '\\s': { label: 'white space', ordinal: -1 },
      '\\S': { label: 'non-white space', ordinal: -1 },
      '\\t': { label: 'tab (0x09)', ordinal: 0x09 },
      '\\v': { label: 'vertical tab (0x0B)', ordinal: 0x0b },
      '\\w': { label: 'word', ordinal: -1 },
      '\\W': { label: 'non-word', ordinal: -1 },
      '\\0': { label: 'null (0x00)', ordinal: 0 },
      '\\012': { label: 'octal: 12 (0x0A)', ordinal: 10 },
      '\\cx': { label: 'ctrl-X (0x18)', ordinal: 24 },
      '\\xab': { label: '0xAB', ordinal: 0xab },
      '\\uabcd': { label: 'U+ABCD', ordinal: 0xabcd },
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__charset_terminal();
    },
  );

});
