export function buildRoutPath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    
    // const match = Array.from(path.matchAll(routeParametersRegex));
    // console.log(match)
    console.log(pathWithParams) 

    return pathRegex
}