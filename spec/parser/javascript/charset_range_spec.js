import javascript from '../../../src/js/parser/javascript/grammar.js';
import util from '../../../src/js/util.js';
import { testEach } from '../../helpers.js';

describe('parser/javascript/charset_range.js', function() {

  testEach(
    'CharsetRange',
    {
      'a-z': {
        first: jasmine.objectContaining({ textValue: 'a' }),
        last: jasmine.objectContaining({ textValue: 'z' }),
      },
      '\\b-z': {
        first: jasmine.objectContaining({ textValue: '\\b' }),
        last: jasmine.objectContaining({ textValue: 'z' }),
      },
      '\\f-z': {
        first: jasmine.objectContaining({ textValue: '\\f' }),
        last: jasmine.objectContaining({ textValue: 'z' }),
      },
      '\\n-z': {
        first: jasmine.objectContaining({ textValue: '\\n' }),
        last: jasmine.objectContaining({ textValue: 'z' }),
      },
      '\\r-z': {
        first: jasmine.objectContaining({ textValue: '\\r' }),
        last: jasmine.objectContaining({ textValue: 'z' }),
      },
      '\\t-z': {
        first: jasmine.objectContaining({ textValue: '\\t' }),
        last: jasmine.objectContaining({ textValue: 'z' }),
      },
      '\\v-z': {
        first: jasmine.objectContaining({ textValue: '\\v' }),
        last: jasmine.objectContaining({ textValue: 'z' }),
      },
      '\\d-a': null,
      '\\D-a': null,
      '\\s-a': null,
      '\\S-a': null,
      '\\w-a': null,
      '\\W-a': null,
    },
    str => {
      const parser = new javascript.Parser(str);
      return parser.__consume__charset_range();
    },
  );

  it('throws an exception when the range is out of order', function() {
    const parser = new javascript.Parser('z-a');
    expect(() => {
      parser.__consume__charset_range();
    }).toThrow('Range out of order in character class: z-a');
  });

  describe('#_render', function() {

    beforeEach(function() {
      const parser = new javascript.Parser('a-z');
      this.node = parser.__consume__charset_range();

      this.node.container = jasmine.createSpyObj('cotnainer', ['addClass', 'text', 'group']);
      this.node.container.text.and.returnValue('hyphen');

      this.firstDeferred = this.testablePromise();
      this.lastDeferred = this.testablePromise();

      spyOn(this.node.first, 'render').and.returnValue(this.firstDeferred.promise);
      spyOn(this.node.last, 'render').and.returnValue(this.lastDeferred.promise);

      this.firstDeferred.resolve();
      this.lastDeferred.resolve();
      spyOn(util, 'spaceHorizontally');
    });

    it('renders a hyphen', async function() {
      await this.node._render();
      expect(this.node.container.text).toHaveBeenCalledWith(0, 0, '-');
    });

    it('spaces the items horizontally', async function() {
      await this.node._render();

      expect(util.spaceHorizontally).toHaveBeenCalledWith([
        this.node.first,
        'hyphen',
        this.node.last,
      ], { padding: 5 });
    });

  });

});
