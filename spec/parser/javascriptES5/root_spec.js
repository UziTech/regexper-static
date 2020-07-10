import javascript from '../../../src/js/parser/javascriptES5/parser.js';

describe('parser/javascriptES5/root.js', function() {

  it(`fails parsing "s" flag`, function() {
    let error;
    try {
      javascript.parse('/test/s');
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(jasmine.stringMatching(/expected \[yigmu\]/));
  });

});
