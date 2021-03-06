import javascript from '../../../src/js/parser/javascript/grammar.js';
import Snap from 'snapsvg-cjs';
import { testEach } from '../../helpers.js';

describe('parser/javascript/literal.js', function() {

  testEach(
    'Literal',
    {
      'x': {
        type: 'literal',
        literal: 'x',
        ordinal: 120,
      },
      '\\x': {
        type: 'literal',
        literal: 'x',
        ordinal: 120,
      },
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__terminal();
    },
  );

  describe('#_render', function() {

    beforeEach(function() {
      const parser = new javascript.Parser('a');
      this.node = parser.__consume__terminal();
      this.node.state = {};

      this.svg = Snap(document.createElement('svg'));
      this.node.container = this.svg.group();
      spyOn(this.node, 'renderLabel').and.callThrough();
    });

    it('renders a label', async function() {
      await this.node._render();
      expect(this.node.renderLabel).toHaveBeenCalledWith(['\u201c', 'a', '\u201d']);
    });

    it('sets the class of the first and third tspan to "quote"', async function() {
      const label = await this.node._render();

      expect(label.selectAll('tspan')[0].hasClass('quote')).toBeTruthy();
      expect(label.selectAll('tspan')[2].hasClass('quote')).toBeTruthy();
    });

    it('sets the edge radius of the rect', async function() {
      const label = await this.node._render();

      expect(label.select('rect').attr()).toEqual(jasmine.objectContaining({
        rx: '3',
        ry: '3',
      }));
    });

  });

  describe('#merge', function() {

    beforeEach(function() {
      const parser = new javascript.Parser('a');
      this.node = parser.__consume__terminal();
    });

    it('appends to the literal value', function() {
      this.node.merge({ literal: 'b' });
      expect(this.node.literal).toEqual('ab');
    });

  });

});
