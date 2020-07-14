import Parser from '../../../src/js/parser/index.js';
import regexpParser from '../../../src/js/parser/javascriptES5/grammar.peg';

describe('parser/javascriptES5/index.js', function() {

  beforeEach(function() {
    this.container = document.createElement('div');
    this.parser = new Parser(this.container, { grammar: "javascriptes5" });
  });

  describe('#parse', function() {

    beforeEach(function() {
      spyOn(regexpParser, 'parse');
    });

    it('parses the expression', function(done) {
      this.parser.parse('example expression')
        .then(() => {
          expect(regexpParser.parse).toHaveBeenCalledWith('example expression');
          done();
        });
    });

  });

});
