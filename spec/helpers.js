export function testEach(title, obj, func, only) {
  for (const str in obj) {
    const content = obj[str];
    // eslint-disable-next-line no-restricted-globals
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
  }
}
