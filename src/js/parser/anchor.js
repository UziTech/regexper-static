export default {
  type: 'anchor',

  _render() {
    return this.renderLabel(this.label);
  },

  setup() {
    if (this.textValue === '^') {
      this.label = 'Start of line';
    } else {
      this.label = 'End of line';
    }
  },
};
