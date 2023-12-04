import { randomUUID } from "node:crypto";
import { Database } from "../database/database.js";
import { buildRoutePath } from "../utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
        const { title, description } = req.body;

        const tasks = {
          id: randomUUID(),
          title: title,
          description: description,
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        };

        database.insert('tasks', tasks);

        return res.writeHead(201).end();
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
        const tasks = database.select('tasks')

         return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
        console.log(req.params)

        const { id } = req.params;
        const { title, description, completed_at } = req.body;

        database.update("tasks", id, {
          title,
          description,
          completed_at,
        });

        return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      return res.end(req.method);
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      return res.end(req.method);
    },
  },
];