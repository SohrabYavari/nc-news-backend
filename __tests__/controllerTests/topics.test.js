const request = require("supertest");
const app = require("../../app");

const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
const data = require("../../db/data/test-data/index");


beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("/api/topics Tests", () => {
  describe("GET REQUESTS", () => {
    test("200: Responds with an array of the topics objects.", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
          });
        });
    });
  });

  describe("ERROR TESTS", () => {
    test("404: Responds with an err msg when given wrong url", () => {
      return request(app)
        .get("/api/topicssss")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Route not found')
        });
    });
  });
});

