import javascript from '../../../src/js/parser/javascript/grammer.js';
import _ from 'lodash';

describe('parser/javascript/anchor.js', function() {

  _.forIn({
    '^': {
      label: 'Start of line',
    },
    '$': {
      label: 'End of line',
    },
  }, (content, str) => {
    it(`parses "${str}" as an Anchor`, function() {
      const parser = new javascript.Parser(str);
      expect(parser.__consume__anchor()).toEqual(jasmine.objectContaining(content));
    });
  });

});
