import { randomUUID } from "node:crypto";
import { Database } from "../../database/database.js";
import { buildRoutePath } from "../utils/build-route-path.js";
import { buildRouteSubPath } from "../utils/build-route-sub-path.js";
import { run } from "../stream/parse-csv.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title)
        return res.writeHead(400).end(
          JSON.stringify({
            message: "Propriedade title vazio/inexistente.",
          })
        );

      if (!description)
        return res
          .writeHead(400)
          .end(
            JSON.stringify({
              message: 'Propriedade description vazio/inexistente.',
            })
          )

      const tasks = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("tasks", tasks);

      return res.writeHead(201).end();
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    subpath: buildRouteSubPath("/uploads"),
    handler: async (req, res) => {
      await run(req);
      return res.writeHead(200).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      console.log(req.params);

      const { id } = req.params;
      const { title, description, completed_at } = req.body;
      const validId = database.selectById("tasks", id);

      if (validId == -1)
        return res.writeHead("400").end("Id não válido ou inexistente.");

      database.update("tasks", id, {
        title,
        description,
        completed_at,
      });

      return res.writeHead(200).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const validId = database.selectById("tasks", id);

      if (validId == -1)
        return res.writeHead("400").end("Id não válido ou inexistente.");
      database.delete("tasks", id);
      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description, completed_at } = req.body;
      const validId = database.selectById("tasks", id);

      if (validId == -1)
        return res.writeHead("400").end("Id não válido ou inexistente.");

      database.update("tasks", id, {
        title,
        description,
        completed_at,
      });

      return res.writeHead(200).end();
    },
  },
];
