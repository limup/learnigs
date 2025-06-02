export function buildRouteSubPath(path) {
    const routeParametersRegex = /\/[a-zA-Z]+/g
    
    const pathWithSubs = path.replace(
        routeParametersRegex, "\\$&$");
    
    const pathRegex = new RegExp(`${pathWithSubs}`)


    return pathRegex;
}