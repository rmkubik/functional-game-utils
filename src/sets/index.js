/**
 * @module Set
 */

/**
 *
 */
class ComparableSet {
  constructor(comparator = (a, b) => a === b) {
    this.items = [];
    this.comparator = comparator;
  }

  get size() {
    return this.items.length;
  }

  add(item) {
    if (this.contains(item)) {
      return;
    }

    this.items.push(item);
  }

  contains(item) {
    return this.items.some((exisiting) => this.comparator(item, exisiting));
  }

  remove(item) {
    const targetIndex = this.items.findIndex((exisiting) =>
      this.comparator(item, exisiting)
    );

    if (targetIndex === -1) {
      return undefined;
    }

    const [target] = this.items.splice(targetIndex, 1);

    return target;
  }
}

export { ComparableSet };
