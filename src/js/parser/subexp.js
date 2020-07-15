// Subexp nodes are for expressions inside of parenthesis. It is rendered as a
// labeled box around the contained expression if a label is required.

export default {
  type: 'subexp',

  definedProperties: {
    // Default anchor is overridden to move it down to account for the group
    // label and outline box.
    _anchor: {
      get: function() {
        const anchor = this.regexp.getBBox();
        const matrix = this.transform().localMatrix;

        return {
          ax: matrix.x(anchor.ax, anchor.ay),
          ax2: matrix.x(anchor.ax2, anchor.ay),
          ay: matrix.y(anchor.ax, anchor.ay),
        };
      },
    },
  },

  labelMap: {
    '?:': '',
    '?=': 'positive lookahead',
    '?!': 'negative lookahead',
    '?<=': 'positive lookbehind',
    '?<!': 'negative lookbehind',
    '?>': 'atomic group',
  },

  // Renders the subexp into the currently set container.
  _render() {
    // **NOTE:** `this.label()` **MUST** be called here, in _render, and before
    // any child nodes are rendered. This is to keep the group numbers in the
    // correct order.
    const label = this.label();

    // Render the contained regexp.
    return this.regexp.render(this.container.group())
      // Create the labeled box around the regexp.
      .then(() => this.renderLabeledBox(label, this.regexp, {
        padding: 10,
      }));
  },

  // Returns the label for the subexpression.
  label() {
    if (this.properties.capture.textValue in this.labelMap) {
      return this.labelMap[this.properties.capture.textValue];
    } else if (this.properties.capture !== undefined
      && this.properties.capture.properties !== undefined
      && this.properties.capture.properties.groupname) {
      return `group '${this.properties.capture.properties.groupname.textValue}'`;
    } else {
      return `group #${this.state.groupCounter++}`;
    }
  },

  setup() {
    // **NOTE:** **DO NOT** call `this.label()` in setup. It will lead to
    // groups being numbered in reverse order.
    this.regexp = this.properties.regexp;

    // If there is no need for a label, then proxy to the nested regexp.
    if (this.properties.capture.textValue === '?:') {
      this.proxy = this.regexp;
    }
  },
};
