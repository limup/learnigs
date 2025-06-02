import { randomUUID } from "node:crypto";
import { Database } from "../src/database/database.js";
import { buildRoutPath } from "../src/utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutPath("/users"),
    handler: (req, res) => {

      console.log(req.query)
      const { search } = req.query

      const users = database.select("users", search ? {
        name: search,
        email: search
      } : null);
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutPath("/users"),
    handler: (req, res) => {
      //desestruturação
      const { name, email } = req.body;

      const users = {
        id: randomUUID(),
        name: name,
        email: email,
      };

      database.insert("users", users);

      // Early return
      // return res.end('Criação de usuários')

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutPath("/users/:id"),
    handler: (req, res) => {
      console.log(req.params);

      const { id } = req.params;

      database.delete("users", id);
      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutPath("/users/:id"),
    handler: (req, res) => {
      console.log(req.params);

      const { id } = req.params;
      const { name, email } = req.body;

      database.update("users", id, {
        name,
        email
      })

      return res.writeHead(204).end();
    },
  },
];
