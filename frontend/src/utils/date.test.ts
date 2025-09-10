import { expect, test } from "vitest";
import { getDateStr } from "./date";

test("Get date formatted in Japanese style", () => {
	expect(getDateStr(new Date("2023-01-02T03:04:05"))).toBe("2023/1/2 3:04:05");
});
