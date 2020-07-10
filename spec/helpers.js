import _ from 'lodash';

export function testEach(title, obj, func, only) {
  _.forIn(obj, (content, str) => {
    (only ? fit : it)(`${content ? 'parses' : 'does not parse'} "${str}" as a ${title}`, function() {
      expect(typeof content).toBe("object");
      const actual = func(str);
      if (content === null) {
        expect(actual).toBe(null);
      } else {
        for (const prop in content) {
          if (typeof actual[prop] === "function") {
            expect(actual[prop]()).toEqual(content[prop]);
          } else {
            expect(actual[prop]).toEqual(content[prop]);
          }
        }
      }
    });
  });
}
