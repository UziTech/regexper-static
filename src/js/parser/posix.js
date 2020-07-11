// Posix nodes are used for posix character sets.

export default {
  type: 'posix',

  // Renders the posix into the currently set container.
  _render() {
    return this.renderLabel(this.label)
      .then(label => {
        label.select('rect').attr({
          rx: 3,
          ry: 3,
        });
        return label;
      });
  },

  setup() {
    this.label = (this.properties.invert.textValue === '^') ? 'not ' : '';

    this.label += this.names[this.properties.name.textValue];
  },

  names: {
    '<': "start of word",
    '>': "end of word",
    alnum: "alphanumeric character",
    alpha: "alphabetic character",
    ascii: "ascii character",
    blank: "space or tab character",
    cntrl: "control character",
    digit: "digit",
    graph: "visible character",
    lower: "lowercase character",
    print: "visible character or spaces",
    punct: "punctuation character",
    space: "whitespace character",
    upper: "uppercase character",
    word: "word character",
    xdigit: "hexadecimal digit",
  },
};
