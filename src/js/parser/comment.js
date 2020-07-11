// Comment nodes are used for comments.

export default {
  type: 'comment',

  _render() {
    return this.renderLabel(`Comment: ${this.comment}`);
  },

  setup() {
    this.comment = this.properties.comment.textValue;
  },
};
