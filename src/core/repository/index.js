export class Repository {
  #storage

  constructor(storage) {
    this.#storage = storage;
  }

  getStorage() {
    return this.#storage;
  }
}