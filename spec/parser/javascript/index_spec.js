import Parser from '../../../src/js/parser/index.js';
import regexpParser from '../../../src/js/parser/javascript/grammar.peg';
import Snap from 'snapsvg-cjs';

describe('parser/javascript/index.js', function() {

  beforeEach(function() {
    this.container = document.createElement('div');
    this.parser = new Parser(this.container);
  });

  describe('container property', function() {

    it('sets the content of the element', function() {
      const element = document.createElement('div');
      this.parser.container = element;

      expect(element.innerHTML).not.toEqual('');
    });

    it('keeps the original content if the keepContent option is set', function() {
      const element = document.createElement('div');
      element.innerHTML = 'example content';

      this.parser.options.keepContent = true;
      this.parser.container = element;

      expect(element.innerHTML).toContain('example content');
      expect(element.innerHTML).not.toEqual('example content');
    });

    it('adds the "svg-container" class', function() {
      spyOn(this.parser, '_addClass');
      this.parser.container = document.createElement('div');
      expect(this.parser._addClass).toHaveBeenCalledWith('svg-container');
    });

  });

  describe('#parse', function() {

    beforeEach(function() {
      spyOn(regexpParser, 'parse');
    });

    it('adds the "loading" class', async function() {
      spyOn(this.parser, '_addClass');
      await this.parser.parse('example expression');
      expect(this.parser._addClass).toHaveBeenCalledWith('loading');
    });

    it('parses the expression', async function() {
      await this.parser.parse('example expression');

      expect(regexpParser.parse).toHaveBeenCalledWith('example expression');
    });

    it('replaces newlines with "\\n"', async function() {
      await this.parser.parse('multiline\nexpression');

      expect(regexpParser.parse).toHaveBeenCalledWith('multiline\\nexpression');
    });

    it('resolves the returned promise with the parser instance', async function() {
      const result = await this.parser.parse('example expression');

      expect(result).toEqual(this.parser);
    });

    it('rejects the returned promise with the exception thrown', async function() {
      regexpParser.parse.and.throwError('fail');
      try {
        await this.parser.parse('(example');
        fail("Should throw error");
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

  });

  describe('#render', function() {

    beforeEach(function() {
      this.renderPromise = this.testablePromise();
      this.parser.parsed = jasmine.createSpyObj('parsed', ['render']);
      this.parser.parsed.render.and.returnValue(this.renderPromise.promise);

      this.result = jasmine.createSpyObj('result', ['getBBox', 'transform']);
      this.result.getBBox.and.returnValue({
        x: 4,
        y: 2,
        width: 42,
        height: 24,
      });
    });

    it('render the parsed expression', async function() {
      const promise = this.parser.render();
      expect(this.parser.parsed.render).toHaveBeenCalled();
      this.renderPromise.resolve(this.result);
      await promise;
    });

    describe('when rendering is complete', function() {

      beforeEach(function() {
        this.renderPromise.resolve(this.result);
      });

      it('positions the renderd expression', async function() {
        await this.parser.render();

        expect(this.result.transform).toHaveBeenCalledWith(Snap.matrix()
          .translate(6, 8));
      });

      it('sets the dimensions of the image', async function() {
        await this.parser.render();

        const svg = this.container.querySelector('svg');

        expect(svg.getAttribute('width')).toEqual('62');
        expect(svg.getAttribute('height')).toEqual('44');
      });

      it('removes the "loading" class', async function() {
        spyOn(this.parser, '_removeClass');
        await this.parser.render();

        expect(this.parser._removeClass).toHaveBeenCalledWith('loading');
      });

      it('removes the progress element', async function() {
        await this.parser.render();

        expect(this.container.querySelector('.loading')).toBeNull();
      });

    });

  });

  describe('#cancel', function() {

    it('sets the cancelRender state to true', function() {
      this.parser.cancel();
      expect(this.parser.state.cancelRender).toEqual(true);
    });

  });

  describe('warnings property', function() {

    it('returns the content of the warnings state variable', function() {
      this.parser.state.warnings.push('example');
      expect(this.parser.warnings).toEqual(['example']);
    });

  });

});
