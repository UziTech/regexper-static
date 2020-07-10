import javascript from '../../../src/js/parser/javascriptES5/parser.js';
import _ from 'lodash';

describe('parser/javascriptES5/subexp.js', function() {

  _.forIn({
    '(?<name>test)': 'expected',
    '(?<=test)': 'expected',
    '(?<!test)': 'expected',
  }, (err, str) => {
    it(`fails parsing "${str}"`, function() {
      let error;
      try {
        javascript.parse('/test/s');
      } catch (e) {
        error = e;
      }
      expect(error).toEqual(jasmine.stringMatching(err));
    });
  });

});
