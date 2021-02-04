import javascript from '../../../src/js/parser/javascript/grammar.js';
import Snap from 'snapsvg-cjs';
import { testEach } from '../../helpers.js';

describe('parser/javascript/root.js', function() {

  testEach(
    'Root',
    {
      'test': {
        flags: [],
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '/test/': {
        flags: [],
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '/test/i': {
        flags: ['Ignore Case'],
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '/test/g': {
        flags: ['Global'],
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '/test/m': {
        flags: ['Multiline'],
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '/test/y': {
        flags: ['Sticky'],
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '/test/u': {
        flags: ['Unicode'],
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '/test/s': {
        flags: ['Dot All'],
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '/test/mgi': {
        flags: ['Global', 'Ignore Case', 'Multiline'],
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__root();
    },
  );

  describe('#_render', function() {

    beforeEach(function() {
      this.textElement = jasmine.createSpyObj('text', ['getBBox']);
      this.textElement.getBBox.and.returnValue({
        height: 20,
      });

      this.node = new javascript.Parser('test').__consume__root();
      this.node.container = jasmine.createSpyObj('container', [
        'addClass',
        'text',
        'group',
        'path',
        'circle',
      ]);
      this.node.container.text.and.returnValue(this.textElement);
      this.node.container.group.and.returnValue('group element');

      this.node.regexp = jasmine.createSpyObj('regexp', [
        'render',
        'transform',
        'getBBox',
      ]);

      this.renderDeferred = this.testablePromise();
      this.renderDeferred.resolve();
      this.node.regexp.render.and.returnValue(this.renderDeferred.promise);

      this.node.regexp.getBBox.and.returnValue({
        ax: 1,
        ay: 2,
        ax2: 3,
        x2: 4,
      });
    });

    it('renders the regexp', async function() {
      await this.node._render();
      expect(this.node.regexp.render).toHaveBeenCalledWith('group element');
    });

    describe('when there are flags', function() {

      beforeEach(function() {
        this.node.flags = ['example', 'flags'];
      });

      it('renders a text element', async function() {
        await this.node._render();
        expect(this.node.container.text).toHaveBeenCalledWith(0, 0, 'Flags: example, flags');
      });

    });

    describe('when there are no flags', function() {

      beforeEach(function() {
        this.node.flags = [];
      });

      it('does not render a text element', async function() {
        await this.node._render();
        expect(this.node.container.text).not.toHaveBeenCalled();
      });

    });

    describe('positioning of elements', function() {

      it('renders a path element to lead in and out of the regexp', async function() {
        await this.node._render();

        expect(this.node.container.path).toHaveBeenCalledWith('M1,2H0M3,2H14');
      });

      it('renders circle elements before and after the regexp', async function() {
        await this.node._render();

        expect(this.node.container.circle).toHaveBeenCalledWith(0, 2, 5);
        expect(this.node.container.circle).toHaveBeenCalledWith(14, 2, 5);
      });

      describe('when there are flags', function() {

        beforeEach(function() {
          this.node.flags = ['example'];
        });

        it('moves the regexp below the flag text', async function() {
          await this.node._render();

          expect(this.node.regexp.transform).toHaveBeenCalledWith(Snap.matrix()
            .translate(10, 20));
        });

      });

      describe('when there are no flags', function() {

        beforeEach(function() {
          this.node.flags = [];
        });

        it('positions the regexp', async function() {
          await this.node._render();

          expect(this.node.regexp.transform).toHaveBeenCalledWith(Snap.matrix()
            .translate(10, 0));
        });

      });

    });

  });

});
