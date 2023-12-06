import fs from "node:fs/promises";

const databasePath = new URL("db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    let data = this.#database[table] ?? [];

    return data;
  }

  selectById(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id == id);

    return rowIndex;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id == id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id == id);
    const json = this.#database[table][rowIndex];

    if (!data.title) data.title = json.title;

    if (!data.description) data.description = json.description;

    if (!String(data.completed_at)) data.completed_at = json.completed_at;

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        id,
        ...data,
        created_at: json.created_at,
        updated_at: new Date(),
      };

      this.#persist();
    }
  }
}