import php from '../../../src/js/parser/php/grammar.js';
import Snap from 'snapsvg-cjs';
import { testEach } from '../../helpers.js';

describe('parser/php/posix.js', function() {

  testEach(
    'Posix',
    {
      '[:<:]': {
        label: 'start of word',
      },
      '[:^<:]': {
        label: 'not start of word',
      },
      '[:>:]': {
        label: 'end of word',
      },
      '[:^>:]': {
        label: 'not end of word',
      },
      '[:alnum:]': {
        label: 'alphanumeric character',
      },
      '[:^alnum:]': {
        label: 'not alphanumeric character',
      },
      '[:alpha:]': {
        label: 'alphabetic character',
      },
      '[:^alpha:]': {
        label: 'not alphabetic character',
      },
      '[:ascii:]': {
        label: 'ascii character',
      },
      '[:^ascii:]': {
        label: 'not ascii character',
      },
      '[:blank:]': {
        label: 'space or tab character',
      },
      '[:^blank:]': {
        label: 'not space or tab character',
      },
      '[:cntrl:]': {
        label: 'control character',
      },
      '[:^cntrl:]': {
        label: 'not control character',
      },
      '[:digit:]': {
        label: 'digit',
      },
      '[:^digit:]': {
        label: 'not digit',
      },
      '[:graph:]': {
        label: 'visible character',
      },
      '[:^graph:]': {
        label: 'not visible character',
      },
      '[:lower:]': {
        label: 'lowercase character',
      },
      '[:^lower:]': {
        label: 'not lowercase character',
      },
      '[:print:]': {
        label: 'visible character or spaces',
      },
      '[:^print:]': {
        label: 'not visible character or spaces',
      },
      '[:punct:]': {
        label: 'punctuation character',
      },
      '[:^punct:]': {
        label: 'not punctuation character',
      },
      '[:space:]': {
        label: 'whitespace character',
      },
      '[:^space:]': {
        label: 'not whitespace character',
      },
      '[:upper:]': {
        label: 'uppercase character',
      },
      '[:^upper:]': {
        label: 'not uppercase character',
      },
      '[:word:]': {
        label: 'word character',
      },
      '[:^word:]': {
        label: 'not word character',
      },
      '[:xdigit:]': {
        label: 'hexadecimal digit',
      },
      '[:^xdigit:]': {
        label: 'not hexadecimal digit',
      },
    },
    str => {
      const parser = new php.Parser(str);
      return parser.__consume__posix();
    },
  );

  describe('#_render', function() {

    beforeEach(function() {
      const parser = new php.Parser('[:alpha:]');
      this.node = parser.__consume__posix();
      this.node.state = {};

      this.svg = Snap(document.createElement('svg'));
      this.node.container = this.svg.group();
      spyOn(this.node, 'renderLabel').and.callThrough();
    });

    it('renders a label', async function() {
      await this.node._render();
      expect(this.node.renderLabel).toHaveBeenCalledWith('alphabetic character');
    });

    it('sets the edge radius of the rect', async function() {
      const label = await this.node._render();

      expect(label.select('rect').attr()).toEqual(jasmine.objectContaining({
        rx: '3',
        ry: '3',
      }));
    });

  });

});
