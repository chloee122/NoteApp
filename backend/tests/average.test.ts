import { test, describe } from "node:test";
import assert from "node:assert";
import { average } from "../utils/test_util";

describe("average", async () => {
  await test("of one value is the value itself", () => {
    assert.strictEqual(average([1]), 1);
  });

  await test("of many values is calculated right", () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5);
  });

  await test("of empty array is zero", () => {
    assert.strictEqual(average([]), 0);
  });
});
