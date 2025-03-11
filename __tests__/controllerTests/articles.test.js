const request = require("supertest");
const app = require("../../app");

const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
const data = require("../../db/data/test-data/index");
require("jest-sorted");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("/api/articles Tests", () => {
  describe("GET Tests", () => {
    test("200: Responds with a specific object when given the article id.", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toMatchObject({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("200: Responds with all of the articles.", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach((article) => {
            expect(typeof article.title).toBe("string");
            expect(typeof article.author).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
            expect(typeof article.comment_count).toBe("string");
          });
        });
    });

    test("200: Responds with the correct ordered articles.", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toBeSortedBy("created_at");
        });
    });
    test("200: Responds with the comments of a specific article.", () => {
      return request(app)
        .get("/api/articles/6/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toMatchObject({
            article_id: 6,
            body: "This is a bad article name",
            votes: 1,
            author: "butter_bridge",
            created_at: "2020-10-11T15:23:00.000Z",
            comment_id: 16,
          });
        });
    });
  });
});
