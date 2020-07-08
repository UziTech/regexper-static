module.exports.register = function(handlebars) {
  handlebars.registerHelper('icon', function(selector) {
    return new handlebars.SafeString(`<svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" viewBox="0 0 8 8"><use xlink:href="${selector}" /></svg>`);
  });
};
