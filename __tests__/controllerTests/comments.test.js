// testing requirements
const request = require("supertest");
const app = require("../../app");

// db connection and data
const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
const data = require("../../db/data/test-data/index");

// ensuring data is not persistant
beforeEach(() => seed(data));
afterAll(() => db.end());

describe("POST REQUESTS", () => {
  describe("POST: /ap/articles/:articleId/comments", () => {
    test("201: creates a new comment under an article", () => {
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
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: deletes the given comment by comment_id and returns no content", () => {
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
