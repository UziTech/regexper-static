import javascript from '../../../src/js/parser/javascript/grammar.js';
import Node from '../../../src/js/parser/node.js';
import Snap from 'snapsvg-cjs';
import { testEach } from '../../helpers.js';

describe('parser/javascript/subexp.js', function() {

  beforeEach(function() {
    Node.state = { groupCounter: 1 };
  });

  testEach(
    'Subexp',
    {
      '(test)': {
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '(?<name>test)': {
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '(?=test)': {
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '(?!test)': {
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '(?<=test)': {
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '(?<!test)': {
        regexp: jasmine.objectContaining({ textValue: 'test' }),
      },
      '(?:test)': {
        regexp: jasmine.objectContaining({ textValue: 'test' }),
        proxy: jasmine.objectContaining({ textValue: 'test' }),
      },
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__subexp();
    },
  );

  describe('_anchor property', function() {

    it('applies the local transform matrix to the anchor from the regexp', function() {
      const node = new javascript.Parser('(test)').__consume__subexp();

      node.regexp = {
        getBBox() {
          return {
            ax: 10,
            ax2: 15,
            ay: 20,
          };
        },
      };

      spyOn(node, 'transform').and.returnValue({
        localMatrix: Snap.matrix().translate(3, 8),
      });

      expect(node._anchor).toEqual({
        ax: 13,
        ax2: 18,
        ay: 28,
      });
    });

  });

  describe('#_render', function() {

    beforeEach(function() {
      this.renderDeferred = this.testablePromise();

      this.node = new javascript.Parser('(test)').__consume__subexp();
      this.node.regexp = jasmine.createSpyObj('regexp', ['render']);
      this.node.container = jasmine.createSpyObj('container', ['addClass', 'group']);
      spyOn(this.node, 'label').and.returnValue('example label');
      spyOn(this.node, 'renderLabeledBox');

      this.node.regexp.render.and.returnValue(this.renderDeferred.promise);
    });

    it('renders the regexp', async function() {
      this.renderDeferred.resolve();
      await this.node._render();
      expect(this.node.regexp.render).toHaveBeenCalled();
    });

    it('renders a labeled box', async function() {
      this.renderDeferred.resolve();
      await this.node._render();

      expect(this.node.renderLabeledBox).toHaveBeenCalledWith('example label', this.node.regexp, { padding: 10 });
    });

  });

  describe('#label', function() {

    const tests = {
      '(test)': {
        label: 'group #1',
        groupCounter: 2,
      },
      '(?<name>test)': {
        label: 'group \'name\'',
        groupCounter: 1,
      },
      '(?=test)': {
        label: 'positive lookahead',
        groupCounter: 1,
      },
      '(?!test)': {
        label: 'negative lookahead',
        groupCounter: 1,
      },
      '(?<=test)': {
        label: 'positive lookbehind',
        groupCounter: 1,
      },
      '(?<!test)': {
        label: 'negative lookbehind',
        groupCounter: 1,
      },
      '(?:test)': {
        label: '',
        groupCounter: 1,
      },
    };
    for (const str in tests) {
      const data = tests[str];
      it(`generates the correct label for "${str}"`, function() {
        const node = new javascript.Parser(str).__consume__subexp();
        expect(node.label()).toEqual(data.label);
        expect(node.state.groupCounter).toEqual(data.groupCounter);
      });
    }

  });

});
