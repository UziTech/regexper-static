/*global describe, it*/
"use strict";

var fs = require("fs"),
  path = require("path"),
  es = require("event-stream");

var gutil = require("gulp-util"),
  docco = require("../");

describe("gulp-docco", function () {
  it("should produce expected file via buffer", function (done) {

    var srcFile = new gutil.File({
      path: "test/fixtures/docco.litcoffee",
      cwd: "test/",
      base: "test/fixtures",
      contents: fs.readFileSync("test/fixtures/docco.litcoffee")
    });

    var stream = docco();

    stream.on("error", function(err) {
      expect(err).toBeDefined();
      done(err);
    });
    var data = {};
    stream.on("data", function (newFile) {
      expect(newFile).toBeDefined();
      expect(newFile.path).toBeDefined();

      if (newFile.contents) {
        data[path.relative(__dirname, newFile.path)] = newFile.contents.toString()
      }
    });
    stream.on("end", function () {
      expect(data).toMatchSnapshot();
      done();
    });

    stream.write(srcFile);
    stream.end();
  });

  it("should error on stream", function (done) {

    var srcFile = new gutil.File({
      path: "test/fixtures/docco.litcoffee",
      cwd: "test/",
      base: "test/fixtures",
      contents: fs.createReadStream("test/fixtures/docco.litcoffee")
    });

    var stream = docco();

    stream.on("error", function(err) {
      expect(err).toBeDefined();
      done();
    });

    stream.on("data", function (newFile) {
      newFile.contents.pipe(es.wait(function(err, data) {
        expect(err).toBeDefined();
        done(err);
      }));
    });

    stream.write(srcFile);
    stream.end();
  });
});
