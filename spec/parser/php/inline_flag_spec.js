import php from '../../../src/js/parser/php/grammar.js';
import Snap from 'snapsvg-cjs';
import { testEach } from '../../helpers.js';

describe('parser/php/inline_flag.js', function() {

  testEach(
    'InlineFlag',
    {
      '(?i)': {
        flags: ['Ignore Case'],
      },
      '(?m)': {
        flags: ['Multiline'],
      },
      '(?s)': {
        flags: ['Dot All'],
      },
      '(?x)': {
        flags: ['Ignore Whitespace'],
      },
      '(?U)': {
        flags: ['Invert Greedy'],
      },
      '(?X)': {
        flags: ['Extra Functionality'],
      },
      '(?J)': {
        flags: ['Duplicate Group Names'],
      },
      '(?imsxUXJ)': {
        flags: [
          'Ignore Case',
          'Multiline',
          'Dot All',
          'Ignore Whitespace',
          'Invert Greedy',
          'Extra Functionality',
          'Duplicate Group Names',
        ],
      },
      '(?imismis)': {
        flags: [
          'Ignore Case',
          'Multiline',
          'Dot All',
        ],
      },
    },
    str => {
      const parser = new php.Parser(str);
      return parser.__consume__inline_flag();
    },
  );

  describe('#_render', function() {

    beforeEach(function() {
      const parser = new php.Parser('(?i)');
      this.node = parser.__consume__inline_flag();
      this.node.state = {};

      this.svg = Snap(document.createElement('svg'));
      this.node.container = this.svg.group();
      spyOn(this.node, 'renderLabeledBox').and.callThrough();
    });

    it('renders a labeled box', function(done) {
      this.node._render()
        .then(() => {
          expect(this.node.renderLabeledBox).toHaveBeenCalledWith('Flags:', jasmine.any(Object), {padding: 5});
          done();
        });
    });

  });

});
