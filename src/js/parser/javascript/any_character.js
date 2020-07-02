// AnyCharacter nodes are for `*` regular expression syntax. They are rendered
// as just an "any character" label.

export default {
  type: 'any-character',

  _render() {
    return this.renderLabel('any character');
  }
};
