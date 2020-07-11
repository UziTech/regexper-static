// InlineFlag nodes are for inline flags.

import Root from './root.js';
import util from '../util.js';

export default {
  type: 'inline_flag',

  definedProperties: {
    // Default anchor is overridden to move it down so that it connects at the
    // middle of the box that wraps all of the charset parts, instead of the
    // middle of the container, which would take the label into account.
    _anchor: {
      get: function() {
        const matrix = this.transform().localMatrix;

        return {
          ay: matrix.y(0, this.labelContainer.getBBox().cy),
        };
      },
    },
  },

  flagLabels: Root.flagLabels,

  // Renders the charset into the currently set container.
  _render() {

    this.labelContainer = this.container.group();

    return Promise.all(this.flags.map(flag => {
      return this.labelContainer.text(0, 5, flag);
    }))
      .then(labels => {

        util.spaceVertically(labels, {
          padding: 5,
          offset: 5,
        });

        return this.renderLabeledBox("Flags:", this.labelContainer, {padding: 5});
      });
  },

  setup() {
    // Get a list of unique flags
    const flags = [...new Set([...this.properties.flags.textValue])];

    this.flags = flags.map(f => this.flagLabels[f]);
  },
};
