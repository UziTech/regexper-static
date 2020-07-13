import javascript from '../../../src/js/parser/javascript/grammar.js';
import { testEach } from '../../helpers.js';

describe('parser/javascript/repeat_spec.js', function() {

  testEach(
    'RepeatSpec',
    {
      '{24,42}': {
        minimum: 24,
        maximum: 42,
      },
      '{24,}': {
        minimum: 24,
        maximum: -1,
      },
      '{24}': {
        minimum: 24,
        maximum: 24,
      },
      '{,42}': null,
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__repeat_spec();
    },
  );

  it('throws an exception when the numbers are out of order', function() {
    const parser = new javascript.Parser('{42,24}');
    expect(() => {
      parser.__consume__repeat_spec();
    }).toThrow('Numbers out of order: {42,24}');
  });

});
