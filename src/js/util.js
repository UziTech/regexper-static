// Utility functions used elsewhere in the codebase. Most JavaScript files on
// the site use some functions defined in this file.

import Snap from 'snapsvg-cjs';

// Generate an `Event` object for triggering a custom event.
//
// - __name__ - Name of the custom event. This should be a String.
// - __detail__ - Event details. The event details are provided to the event
//    handler.
function customEvent(name, detail) {
  const evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  evt.detail = detail;
  return evt;
}

// Add extra fields to a bounding box returned by `getBBox`. Specifically adds
// details about the box's axis points (used when positioning elements for
// display).
//
// - __box__ - Bounding box object to update. Attributes `ax`, `ax2`, and `ay`
//    will be added if they are not already defined.
function normalizeBBox(box) {
  return {
    ax: box.x,
    ax2: box.x2,
    ay: box.cy,
    ...box,
  };
}

// Positions a collection of items with their axis points aligned along a
// horizontal line. This leads to the items being spaced horizontally and
// effectively centered vertically.
//
// - __items__ - Array of items to be positioned
// - __options.padding__ - Number of pixels to leave between items
function spaceHorizontally(items, options = {}) {
  options = {
    padding: 0,
    ...options,
  };

  const values = items.map(item => ({
    box: normalizeBBox(item.getBBox()),
    item,
  }));

  // Calculate where the axis points should be positioned vertically.
  const verticalCenter = values.reduce(
    (center, { box }) => Math.max(center, box.ay),
    0);

  // Position items with padding between them and aligned their axis points.
  values.reduce((offset, { item, box }) => {
    item.transform(Snap.matrix()
      .translate(offset, verticalCenter - box.ay));

    return offset + options.padding + box.width;
  }, 0);
}

// Positions a collection of items centered horizontally in a vertical stack.
//
// - __items__ - Array of items to be positioned
// - __options.padding__ - Number of pixels to leave between items
function spaceVertically(items, options = {}) {
  options = {
    padding: 0,
    offset: 0,
    ...options,
  };

  const values = items.map(item => ({
    box: item.getBBox(),
    item,
  }));

  // Calculate where the center of each item should be positioned horizontally.
  const horizontalCenter = values.reduce(
    (center, { box }) =>  Math.max(center, box.cx),
    0);

  // Position items with padding between them and align their centers.
  values.reduce((offset, { item, box }) => {
    item.transform(Snap.matrix()
      .translate(horizontalCenter - box.cx + options.offset, offset + options.offset));

    return offset + options.padding + box.height;
  }, 0);
}

// Creates a Promise that will be resolved after a specified delay.
//
// - __delay__ - Time in milliseconds to wait before resolving promise.
function wait(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// Creates a Promise that will be resolved after 0 milliseconds. This is used
// to create a short delay that allows the browser to address any pending tasks
// while the JavaScript VM is not active.
function tick() {
  return wait(0);
}

// Re-throws an exception asynchronously. This is used to expose an exception
// that was created during a Promise operation to be handled by global error
// handlers (and to be displayed in the browser's debug console).
//
// - __error__ - Error/exception object to be re-thrown to the browser.
function exposeError(error) {
  setTimeout(() => {
    throw error;
  }, 0);
}

// Renders an SVG icon.
//
// - __selector__ - Selector to the SVG icon to render.
function icon(selector) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 8 8"><use xlink:href="${selector}" /></svg>`;
}

// Send tracking data.
function track() {
  if (window.ga) {
    window.ga.apply(window.ga, arguments);
  } else {
    // eslint-disable-next-line no-console
    console.debug.apply(console, arguments);
  }
}

// if the resolved property is a function it's invoked with the this binding of its parent object and its result is returned.
function getResult(obj, prop) {
  if (!(prop in obj)) {
    return undefined;
  }

  if (typeof obj[prop] === "function") {
    return obj[prop]();
  }

  return obj[prop];
}

export default {
  customEvent,
  normalizeBBox,
  spaceHorizontally,
  spaceVertically,
  wait,
  tick,
  exposeError,
  icon,
  track,
  getResult,
};
