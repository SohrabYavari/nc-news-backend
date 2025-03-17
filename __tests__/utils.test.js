const {
  convertTimestampToDate,
  createRefObject,
  checkExists,
} = require("../utils/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("checkExists", () => {
  test("Responds with true when the table, column, and value exist", () => {
    return checkExists("users", "username", "butter_bridge").then((res) => {
      expect(res).toBe(true);
    });
  });

  test("Rejects with an error when the resource does not exist", () => {
    return checkExists("users", "username", "butter_bridge_2")
      .then(() => {
        throw new Error("Test should have failed but didn't");
      })
      .catch((err) => {
        expect(err.status).toBe(404);
        expect(err.msg).toBe("Resource not found");
      });
  });
});

describe("createRefObject", () => {
  test("Returns an empty object when given an empty array", () => {
    expect(createRefObject([], "title", "article_id")).toEqual({});
  });

  test("Creates a reference object from a single-item array", () => {
    const input = [{ title: "First Article", article_id: 1 }];
    const expectedOutput = { "First Article": 1 };

    expect(createRefObject(input, "title", "article_id")).toEqual(
      expectedOutput
    );
  });

  test("Creates a reference object from multiple items", () => {
    const input = [
      { title: "First Article", article_id: 1 },
      { title: "Second Article", article_id: 2 },
      { title: "Third Article", article_id: 3 },
    ];
    const expectedOutput = {
      "First Article": 1,
      "Second Article": 2,
      "Third Article": 3,
    };

    expect(createRefObject(input, "title", "article_id")).toEqual(
      expectedOutput
    );
  });

  test("Works with different key names", () => {
    const input = [
      { name: "Alice", id: 101 },
      { name: "Bob", id: 102 },
    ];
    const expectedOutput = { Alice: 101, Bob: 102 };

    expect(createRefObject(input, "name", "id")).toEqual(expectedOutput);
  });

  test("Ignores extra properties in objects", () => {
    const input = [
      { title: "First Article", article_id: 1, author: "Sam" },
      { title: "Second Article", article_id: 2, author: "Alex" },
    ];
    const expectedOutput = { "First Article": 1, "Second Article": 2 };

    expect(createRefObject(input, "title", "article_id")).toEqual(
      expectedOutput
    );
  });

  test("Handles string and number keys correctly", () => {
    const input = [
      { title: "100", article_id: 200 },
      { title: "300", article_id: 400 },
    ];
    const expectedOutput = { 100: 200, 300: 400 };

    expect(createRefObject(input, "title", "article_id")).toEqual(
      expectedOutput
    );
  });

  test("Returns an empty object if key1 does not exist in objects", () => {
    const input = [{ id: 1, name: "Alice" }];
    expect(createRefObject(input, "nonExistentKey", "id")).toEqual({});
  });

  test("Returns object with undefined values if key2 does not exist", () => {
    const input = [{ id: 1, name: "Alice" }];
    expect(createRefObject(input, "name", "nonExistentKey")).toEqual({
      Alice: undefined,
    });
  });
});
