import { ComparableSet } from "./index.js";

describe("ComparableSet", () => {
  it("should be empty when initialized", () => {
    const set = new ComparableSet();

    expect(set.size).toBe(0);
  });

  it("should increase in size and contain a new item when one is added", () => {
    const set = new ComparableSet();
    set.add("a");

    expect(set.size).toBe(1);
    expect(set.contains("a")).toBe(true);
  });

  it("should not contain unadded items", () => {
    const set = new ComparableSet();

    expect(set.contains("b")).toBe(false);
  });

  it("should not increase in size when attempting to add a duplicate item", () => {
    const set = new ComparableSet();
    set.add("a");
    set.add("a");

    expect(set.size).toBe(1);
    expect(set.contains("a")).toBe(true);
  });

  it("should be able to contain multiple items", () => {
    const set = new ComparableSet();
    set.add("a");
    set.add("b");
    set.add("c");

    expect(set.size).toBe(3);
    expect(set.contains("a")).toBe(true);
    expect(set.contains("b")).toBe(true);
    expect(set.contains("c")).toBe(true);
  });

  it("should default to strict equality comparator", () => {
    const set = new ComparableSet();
    const a = { key: "value" };
    const b = { key: "value" };
    set.add(a);
    set.add(b);

    expect(set.size).toBe(2);
    expect(set.contains(a)).toBe(true);
    expect(set.contains(b)).toBe(true);
  });

  it("should accept a different comparator", () => {
    const set = new ComparableSet((a, b) => a.key === b.key);
    const a = { key: "value" };
    const b = { key: "value" };
    set.add(a);
    set.add(b);

    expect(set.size).toBe(1);
    expect(set.contains(a)).toBe(true);
    expect(set.contains(b)).toBe(true);
  });

  it("should remove a matching item", () => {
    const set = new ComparableSet((a, b) => a.key === b.key);
    const a = { key: "value" };
    set.add(a);

    const removed = set.remove(a);

    expect(removed).toBe(a);
    expect(set.size).toBe(0);
    expect(set.contains(a)).toBe(false);
  });

  it("should remove nothing and return undefined if no match found", () => {
    const set = new ComparableSet();
    const a = { key: "value" };
    const b = { key: "other" };
    set.add(a);

    const removed = set.remove(b);

    expect(removed).toBe(undefined);
    expect(set.size).toBe(1);
    expect(set.contains(a)).toBe(true);
  });
});
