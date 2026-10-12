export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export class HashTable<T> {
  private buckets: {
    key: string;
    value: T;
  }[][];

  constructor(size: number = 31) {
    this.buckets = [];

    for (let i = 0; i < size; i++) {
      this.buckets.push([]);
    }
  }

  private hash(key: string): number {
    let total = 0;

    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }

    return total % this.buckets.length;
  }

  set(key: string, value: T): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }

    bucket.push({
      key: key,
      value: value,
    });
  }

  get(key: string): T | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].value;
      }
    }

    return undefined;
  }
}

export class HashSet {
  private items: {
    [key: string]: boolean;
  } = {};

  add(value: string): void {
    this.items[value] = true;
  }

  remove(value: string): void {
    delete this.items[value];
  }

  has(value: string): boolean {
    return this.items[value] === true;
  }
}

export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}