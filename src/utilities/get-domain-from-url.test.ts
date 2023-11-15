import { describe, expect, test } from "vitest";
import { getDomainFromUrl } from "./get-domain-from-url";

describe("getDomainFromUrl", () => {
  test("https://www.google.com", () => {
    expect(getDomainFromUrl("https://www.google.com")).toBe("google.com");
  });

  test("http://www.google.com", () => {
    expect(getDomainFromUrl("http://www.google.com")).toBe("google.com");
  });

  test("www.google.com", () => {
    expect(getDomainFromUrl("www.google.com")).toBe("google.com");
  });

  test("google.com", () => {
    expect(getDomainFromUrl("google.com")).toBe("google.com");
  });

  test("https://www.google.com/path", () => {
    expect(getDomainFromUrl("https://www.google.com/path")).toBe("google.com");
  });

  test("http://www.google.com/path", () => {
    expect(getDomainFromUrl("http://www.google.com/path")).toBe("google.com");
  });

  test("www.google.com/path", () => {
    expect(getDomainFromUrl("www.google.com/path")).toBe("google.com/path");
  });

  test("google.com/path", () => {
    expect(getDomainFromUrl("google.com/path")).toBe("google.com/path");
  });
});
