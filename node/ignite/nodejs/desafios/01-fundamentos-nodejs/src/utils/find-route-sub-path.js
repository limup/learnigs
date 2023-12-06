import { routes } from "../routes/route.js";

export function findRoutePath(method, url) {
  let route = routes.find((route) => {
    return (
      route.method == method &&
      route.path.test(url) &&
      route.subpath &&
      route.subpath.test(url)
    );
  });

  route =
    route ??
    routes.find((route) => {
      return route.method == method && route.path.test(url);
    });
  return route;
}
