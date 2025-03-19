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

describe("/api/users Tests", () => {
  describe("GET Tests", () => {
    test("200: Responds with an object of all users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          users.forEach((user) => {
            expect(typeof user.username).toBe("string");
            expect(typeof user.name).toBe("string");
            expect(typeof user.avatar_url).toBe("string");
          });
        });
    });
  });
  describe("Err Tests", () => {
    test("404: Responds with an error message when the array is passed through with no objects inside.", () => {
      return request(app)
        .get("/api/usees")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Route not found");
        });
    });
  });
});
