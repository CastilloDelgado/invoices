/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-restricted-globals
// const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "";
// export const uriDevelop = isLocalhost ? "http://localhost/kronoconta/api/v1" : `http://${location.hostname}/api/v1`;
const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "";
export const uriDevelop = isLocalhost ? "http://localhost/kronoconta/api/v1" : `http://${location.hostname}/api/v1`;
export const loginUri = "/user/login";
export const registerUri = "/proveedor/registrar";
export const bearer = 'd4a63582d5f3fe458a37fe248c809ffe-us17';
export const headers = { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${bearer}` };
