export default {
  type: 'anchor',

  _render() {
    return this.renderLabel(this.label);
  },

  setup() {
    this.label = this.labels[this.textValue];
  },

  labels: {
    '^': 'Start of line',
    '$': 'End of line',
    '\\A': 'Start of line',
    '\\G': 'Start of match',
    '\\z': 'End of line',
    '\\Z': 'End of line',
  },
};
