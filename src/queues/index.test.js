import { Queue } from "./index.js";

describe("Queue", () => {
  it("should be empty when initialized", () => {
    const queue = new Queue();

    expect(queue.isEmpty()).toBe(true);
  });

  it("should be instantiable with one item", () => {
    const queue = new Queue("a");

    expect(queue.isEmpty()).toBe(false);
    expect(queue.dequeue()).toBe("a");
  });

  it("should be instantiable with iterable items", () => {
    const queue = new Queue(["a", "b"]);

    expect(queue.dequeue()).toBe("a");
    expect(queue.isEmpty()).toBe(false);
    expect(queue.dequeue()).toBe("b");
    expect(queue.isEmpty()).toBe(true);
  });

  it("should dequeue strictly matching item and be empty", () => {
    const queue = new Queue();
    const item = { key: "a" };
    queue.enqueue(item);

    expect(queue.dequeue()).toBe(item);
    expect(queue.isEmpty()).toBe(true);
  });

  it("should still be able to enqueue after dequeueing", () => {
    const queue = new Queue();
    queue.enqueue("a");
    queue.enqueue("b");

    expect(queue.dequeue()).toBe("a");
    expect(queue.isEmpty()).toBe(false);

    queue.enqueue("c");

    expect(queue.dequeue()).toBe("b");
    expect(queue.isEmpty()).toBe(false);
    expect(queue.dequeue()).toBe("c");
    expect(queue.isEmpty()).toBe(true);
  });

  it("should still function after being emptied", () => {
    const queue = new Queue();
    queue.enqueue("a");

    expect(queue.dequeue()).toBe("a");
    expect(queue.isEmpty()).toBe(true);

    queue.enqueue("b");

    expect(queue.dequeue()).toBe("b");
    expect(queue.isEmpty()).toBe(true);
  });

  it("should enqueue undefined if no item provided", () => {
    const queue = new Queue();
    queue.enqueue();

    expect(queue.isEmpty()).toBe(false);
    expect(queue.dequeue()).toBe(undefined);
  });

  it("should dequeue undefined if no item is in queue", () => {
    const queue = new Queue();

    expect(queue.dequeue()).toBe(undefined);
  });
});
