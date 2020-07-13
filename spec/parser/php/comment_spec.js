import php from '../../../src/js/parser/php/grammar.js';
import { testEach } from '../../helpers.js';

describe('parser/php/comment.js', function() {

  testEach(
    'Comment',
    {
      '(?#comment)': {
        comment: 'comment',
      },
    },
    str => {
      const parser = new php.Parser(str);
      return parser.__consume__comment();
    },
  );

  describe('#_render', function() {

    beforeEach(function() {
      const parser = new php.Parser('(?#comment)');
      this.node = parser.__consume__comment();

      spyOn(this.node, "renderLabel");
    });

    it('renders Comment: comment', function() {
      this.node._render();
      expect(this.node.renderLabel).toHaveBeenCalledWith("Comment: comment");
    });

  });

});
