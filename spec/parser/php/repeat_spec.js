import php from '../../../src/js/parser/php/grammer.js';
import { testEach } from '../../helpers.js';

describe('parser/php/repeat.js', function() {

  testEach(
    'Repeat',
    {
      '*+': {
        minimum: 0,
        maximum: -1,
        greedy: true,
        possessive: true,
        hasSkip: true,
        hasLoop: true,
      },
      '++': {
        minimum: 1,
        maximum: -1,
        greedy: true,
        possessive: true,
        hasSkip: false,
        hasLoop: true,
      },
      '?+': {
        minimum: 0,
        maximum: 1,
        greedy: true,
        possessive: true,
        hasSkip: true,
        hasLoop: false,
      },
      '{1}+': {
        minimum: 1,
        maximum: 1,
        greedy: true,
        possessive: true,
        hasSkip: false,
        hasLoop: false,
      },
      '{0,}+': {
        minimum: 0,
        maximum: -1,
        greedy: true,
        possessive: true,
        hasSkip: true,
        hasLoop: true,
      },
      '{0,1}+': {
        minimum: 0,
        maximum: 1,
        greedy: true,
        possessive: true,
        hasSkip: true,
        hasLoop: false,
      },
    },
    str => {
      const parser = new php.Parser(str);
      return parser.__consume__repeat();
    },
  );

});
