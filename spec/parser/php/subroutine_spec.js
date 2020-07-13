import php from '../../../src/js/parser/php/grammar.js';
import { testEach } from '../../helpers.js';
import Snap from 'snapsvg-cjs';

describe('parser/php/subroutine.js', function() {
  testEach(
    'Subroutine',
    {
      '(?R)': { label: 'Recursive Expression' },
      '(?1)': { label: 'Subroutine (group = 1)' },
      '(?&foo)': { label: 'Subroutine (group = \'foo\')' },
    },
    str => {
      const parser = new php.Parser(str);
      return parser.__consume__subroutine();
    },
  );

  describe('#_render', function() {

    beforeEach(function() {
      const parser = new php.Parser('(?R)');
      this.node = parser.__consume__subroutine();
      this.node.state = {};

      this.svg = Snap(document.createElement('svg'));
      this.node.container = this.svg.group();
      spyOn(this.node, 'renderLabel').and.callThrough();
    });

    it('renders a label', function() {
      this.node._render();
      expect(this.node.renderLabel).toHaveBeenCalledWith('Recursive Expression');
    });

    it('sets the edge radius of the rect', function(done) {
      this.node._render()
        .then(label => {
          expect(label.select('rect').attr()).toEqual(jasmine.objectContaining({
            rx: '3',
            ry: '3',
          }));
          done();
        });
    });

  });

});
