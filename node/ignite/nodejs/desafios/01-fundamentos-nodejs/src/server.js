import http from "node:http";
import { json } from "./middlewares/json.js";
import { findRoutePath } from "./utils/find-route-sub-path.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  let route = findRoutePath(method, url)
  console.log('route')
  console.log(route)

  if (route) {
    const routeParams = url.match(route.path)
    const routeUpload = url.match(route.subpath)

    req.upload = routeUpload ?? null
    req.params = { ...routeParams.groups }

    if (route.path) return await route.handler(req, res)
  }

  return res.writeHead(404).end();
});

server.listen(3333);