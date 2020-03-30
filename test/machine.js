var app = require("../index.js"),
  chai = require("chai"),
  should = require("should"),
  request = require("supertest"),
  db = require("../src/db");

describe("GET /machines/:machine-id/prices", function() {
  it("responds with price model", function(done) {
    request(app)
      .get("/machines/4/prices")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it("responds with default price model", function(done) {
    request(app)
      .get("/machines/2/prices")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        res.text.should.equal(
          '{"default_pricing":[{"price":3,"value":10},{"price":5,"value":20},{"price":15,"value":60}]}'
        );
        done();
      });
  });

  it("responds with not found (machine-id)", function(done) {
    request(app)
      .get("/machines/9999/prices")
      .set("Accept", "application/json")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});

describe("DELETE /machines/:machine-id/prices/:pm-id", function() {
  it("responds with 200", function(done) {
    request(app)
      .delete("/machines/4/prices/2")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it("machine-id not found", function(done) {
    request(app)
      .delete("/machines/9999/prices/2")
      .set("Accept", "application/json")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it("pm-id not found", function(done) {
    request(app)
      .delete("/machines/4/prices/9999")
      .set("Accept", "application/json")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});

describe("PUT /machines/:machine-id/prices/:pm-id", function() {
  it("responds with 200", function(done) {
    request(app)
      .put("/machines/4/prices/2")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it("machine-id not found", function(done) {
    request(app)
      .put("/machines/9999/prices/2")
      .set("Accept", "application/json")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it("pm-id not found", function(done) {
    request(app)
      .put("/machines/4/prices/9999")
      .set("Accept", "application/json")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});
