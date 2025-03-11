const request = require("supertest");
const app = require("../../app");

const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
const data = require("../../db/data/test-data/index");
require("jest-sorted");

beforeAll(() => seed(data));
afterAll(() => db.end());

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
});
