// Recursion nodes are used for recursive sequences. It is rendered as a label with
// the description of the escape and the numeric code it matches when
// appropriate.

export default {
  type: 'subroutine',

  // Renders the escape into the currently set container.
  async _render() {
    const label = await this.renderLabel(this.label);

    label.select('rect').attr({
      rx: 3,
      ry: 3,
    });
    return label;
  },

  setup() {
    // The group to recurse.
    this.group = this.properties.group.textValue;

    if (this.group === "R" || this.group === "0") {
      this.label = "Subroutine (entire expression)";
    } else if (this.group.match(/^-?\d+$/)) {
      this.label = "Subroutine (group = " + this.group + ")";
    } else {
      const name = this.group.replace(/^(?:&|P>)/, "");
      this.label = "Subroutine (group = '" + name + "')";
    }
  },
};
