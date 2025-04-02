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


describe("GET REQUESTS", () => {
  test("200: /api/articles -=> Responds with all of the articles.", () => {
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

  test("200: /api/articles/:articleId -=> Responds with a specific object when given the article id.", () => {
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
          comment_count: "11",
        });
      });
  });

  test("200: /api/articles?sort_by=[]&order=[] -=> Responds with the correct ordered articles.", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at&order=DESC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("200: /api/articles/:articleId/comments -=> Responds with the comments of a specific article.", () => {
    return request(app)
      .get("/api/articles/6/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toMatchObject([{
          article_id: 6,
          body: "This is a bad article name",
          votes: 1,
          author: "butter_bridge",
          created_at: "2020-10-11T15:23:00.000Z",
          comment_id: 16,
        }]);
      });
  });

  // GET QUERIES TESTS:
  test("200: /api/articles?sort_by=votes&order=DESC -=> Responds the articles array sorted by the votes descending.", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=DESC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("votes", { descending: true });
      });
  });

  test("200: /api/articles?sort_by=votes&order=DESC -=> Responds the articles array sorted by the votes ascending.", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=ASC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("votes", { descending: false });
      });
  });

  test("200: /api/articles?sort_by=author&order=DESC -=> Responds the articles array sorted by the author.", () => {
    return request(app)
      .get("/api/articles?sort_by=author&order=DESC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("author", { descending: true });
      });
  });

  test("200: /api/articles?sort_by=topic&order=DESC -=> Responds the articles array sorted by the topic.", () => {
    return request(app)
      .get("/api/articles?sort_by=topic&order=DESC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("topic", { descending: true });
      });
  });

  test("200: /api/articles?author -=> Responds the articles array filtered by the author.", () => {
    return request(app)
      .get("/api/articles?author=butter_bridge")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("author");
      });
  });

  test("200: /api/articles?topic -=> Responds the articles array filtered by the topic.", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("topic");
      });
  });
});

describe("PATCH REQUESTS", () => {
  test("200: /api/articles/:articleId -=> changes the article votes based on the number passed through", () => {
    const voteUpdate = { articleVotes: -50 };

    return request(app)
      .patch("/api/articles/1")
      .send(voteUpdate)
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.votes).toBe(50);
      });
  });
});

describe("ERROR TESTS", () => {
  test("404: Responds with an err msg when given wrong url", () => {
    return request(app)
      .get("/api/not-articles")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not found");
      });
  });

  test("400: Responds with an err msg when given wrong input for sort_by query", () => {
    return request(app)
      .get("/api/articles?sort_by=notValid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid query input");
      });
  });

  test("400: Responds with an err msg when given wrong input for topic query", () => {
    return request(app)
      .get("/api/articles?topic=notValid")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Resource not found");
      });
  });
});
