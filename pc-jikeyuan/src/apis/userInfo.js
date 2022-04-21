import request from "../utils/https";

/** 用户登录接口
 * 
 * @param {Object} userInfo 
 * @returns 
 */
export function login(userInfo) {
  return request(
    "/authorizations",
    "post",
    userInfo
  );
}

/** 获取用户信息
 *
 * @returns 返回对象数据
 */
export function getUserInfo() {

  return request("/user/profile", "get")
}