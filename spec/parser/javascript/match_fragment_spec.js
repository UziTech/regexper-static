import javascript from '../../../src/js/parser/javascript/grammar.js';
import Snap from 'snapsvg-cjs';
import { testEach } from '../../helpers.js';

describe('parser/javascript/match_fragment.js', function() {

  testEach(
    'MatchFragment',
    {
      'a': {
        proxy: jasmine.objectContaining({ textValue: 'a' }),
        canMerge: true,
      },
      '\\b': {
        proxy: jasmine.objectContaining({ textValue: '\\b' }),
        canMerge: false,
      },
      'a*': {
        content: jasmine.objectContaining({ textValue: 'a' }),
        repeat: jasmine.objectContaining({ textValue: '*' }),
        canMerge: false,
      },
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__match_fragment();
    },
  );

  describe('_anchor property', function() {

    beforeEach(function() {
      this.node = new javascript.Parser('a').__consume__match_fragment();

      this.node.content = {
        getBBox() {
          return {
            ax: 1,
            ax2: 2,
            ay: 3,
          };
        },
      };
      spyOn(this.node, 'transform').and.returnValue({
        localMatrix: Snap.matrix().translate(10, 20),
      });
    });

    it('applies the local transform to the content anchor', function() {
      expect(this.node._anchor).toEqual({
        ax: 11,
        ax2: 12,
        ay: 23,
      });
    });

  });

  describe('#_render', function() {

    beforeEach(function() {
      this.node = new javascript.Parser('a').__consume__match_fragment();

      this.node.container = jasmine.createSpyObj('container', [
        'addClass',
        'group',
        'prepend',
        'path',
      ]);
      this.node.container.group.and.returnValue('example group');

      this.renderDeferred = this.testablePromise();
      this.node.content = jasmine.createSpyObj('content', [
        'render',
        'transform',
        'getBBox',
      ]);
      this.node.content.getBBox.and.returnValue('content bbox');
      this.node.content.render.and.returnValue(this.renderDeferred.promise);

      this.renderDeferred.resolve();

      this.node.repeat = {
        contentPosition: 'example position',
        skipPath: jasmine.createSpy('skipPath').and.returnValue('skip path'),
        loopPath: jasmine.createSpy('loopPath').and.returnValue('loop path'),
      };

      spyOn(this.node, 'loopLabel');
    });

    it('renders the content', async function() {
      await this.node._render();
      expect(this.node.content.render).toHaveBeenCalledWith('example group');
    });

    describe('positioning of content', function() {

      it('moves the content to the correct position', async function() {
        await this.node._render();

        expect(this.node.content.transform).toHaveBeenCalledWith('example position');
      });

      it('renders a skip path and loop path', async function() {
        await this.node._render();

        expect(this.node.repeat.skipPath).toHaveBeenCalledWith('content bbox');
        expect(this.node.repeat.loopPath).toHaveBeenCalledWith('content bbox');
        expect(this.node.container.path).toHaveBeenCalledWith('skip pathloop path');
      });

      it('renders a loop label', async function() {
        await this.node._render();

        expect(this.node.loopLabel).toHaveBeenCalled();
      });

    });

  });

  describe('#loopLabel', function() {

    beforeEach(function() {
      this.node = new javascript.Parser('a').__consume__match_fragment();

      this.node.repeat = {};

      this.node.container = jasmine.createSpyObj('container', [
        'addClass',
        'text',
      ]);

      this.text = jasmine.createSpyObj('text', [
        'addClass',
        'getBBox',
        'transform',
      ]);
      this.node.container.text.and.returnValue(this.text);
      this.text.addClass.and.returnValue(this.text);
      this.text.getBBox.and.returnValue({
        width: 11,
        height: 22,
      });
      spyOn(this.node, 'getBBox').and.returnValue({
        x2: 33,
        y2: 44,
      });
    });

    describe('when a label is defined', function() {

      beforeEach(function() {
        this.node.repeat.label = 'example label';
      });

      it('renders a text element', function() {
        this.node.loopLabel();
        expect(this.node.container.text).toHaveBeenCalledWith(0, 0, ['example label']);
      });

      describe('when there is a skip loop', function() {

        beforeEach(function() {
          this.node.repeat.hasSkip = true;
        });

        it('positions the text element', function() {
          this.node.loopLabel();
          expect(this.text.transform).toHaveBeenCalledWith(Snap.matrix()
            .translate(17, 66));
        });

      });

      describe('when there is no skip loop', function() {

        beforeEach(function() {
          this.node.repeat.hasSkip = false;
        });

        it('positions the text element', function() {
          this.node.loopLabel();
          expect(this.text.transform).toHaveBeenCalledWith(Snap.matrix()
            .translate(22, 66));
        });

      });

    });

    describe('when a label is not defined', function() {

      it('does not render a text element', function() {
        this.node.loopLabel();
        expect(this.node.container.text).not.toHaveBeenCalled();
      });

    });

  });

});
