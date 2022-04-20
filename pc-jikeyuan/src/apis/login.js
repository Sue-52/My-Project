import request from "../utils/https";

export function login(userInfo) {
  return request(
    "/authorizations",
    "post",
    userInfo
  );
}