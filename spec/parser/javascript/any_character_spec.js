import javascript from '../../../src/js/parser/javascript/grammar.js';
import { testEach } from '../../helpers.js';

describe('parser/javascript/any_character.js', function() {

  testEach(
    'AnyCharacter',
    {
      '.': { type: 'any-character' },
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__terminal();
    },
  );

  describe('#_render', function() {

    beforeEach(function() {
      const parser = new javascript.Parser('.');
      this.node = parser.__consume__terminal();
    });

    it('renders a label', function() {
      spyOn(this.node, 'renderLabel').and.returnValue('rendered label');
      expect(this.node._render()).toEqual('rendered label');
      expect(this.node.renderLabel).toHaveBeenCalledWith('any character');
    });

  });

});
