// testing requirements
const request = require("supertest");
const app = require("../../app");

// db connection and data
const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
const data = require("../../db/data/test-data/index");

// ensuring data is not persistant

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});


describe("POST REQUESTS", () => {
  test("201: /ap/articles/:articleId/comments -=> creates a new comment under an article", () => {
    const newComment = {
      username: "butter_bridge",
      body: "I like pandas...",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          body: "I like pandas...",
          article_id: 1,
          author: "butter_bridge",
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });
});

describe("DELETE REQUESTS", () => {
  test("204: /api/comments/:comment_id -=> deletes the given comment by comment_id and returns no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
        return db.query("SELECT * FROM comments WHERE comment_id = 1");
      })
      .then((result) => {
        expect(result.rows.length).toBe(0);
      });
  });
});

describe.skip("ERROR TESTS", () => {
  test("404: /api/comments/:commentId -=> Responds with err msg when comment is not found", () => {
    return request(app)
      .get("/api/comments/notAnumber")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment not found");
      });
  });
});
