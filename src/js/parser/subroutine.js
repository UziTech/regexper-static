// Recursion nodes are used for recursive sequences. It is rendered as a label with
// the description of the escape and the numeric code it matches when
// appropriate.

export default {
  type: 'subroutine',

  // Renders the escape into the currently set container.
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
    // The group to recurse.
    this.group = this.properties.group.textValue;

    if (this.group === "R") {
      this.label = "Recursive Expression";
    } else if (this.group.charAt(0) === "&") {
      this.label = "Subroutine (group = '" + this.group.substring(1) + "')";
    } else {
      this.label = "Subroutine (group = " + this.group + ")";
    }
  },
};
