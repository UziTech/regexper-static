
import _ from 'lodash';

const testsContext = require.context(".", true, /_spec$/);
jasmine.each = (title, obj, func, only) => {
  _.forIn(obj, (content, str) => {
    (only ? fit : it)(`${content ? 'parses' : 'does not parse'} "${str}" as a ${title}`, function() {
      expect(typeof content).toBe("object");
      const actual = func(str);
      if (content === null) {
        expect(actual).toBe(null);
      } else {
        for (const prop in content) {
          expect(actual[prop]).toEqual(content[prop]);
        }
      }
    });
  });
};
testsContext.keys().forEach(testsContext);
