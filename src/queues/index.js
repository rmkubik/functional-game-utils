/**
 * @module Queue
 */

class Queue {
  constructor(items = []) {
    // spread items to create a new array if it is iterable
    this.items = items[Symbol.iterator] ? [...items] : [items];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }
}

export { Queue };
