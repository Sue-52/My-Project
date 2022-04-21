import request from "../utils/https";

/** 获取用户信息
 *
 * @returns 返回对象数据
 */
export function getListData(data) {
  return request("/mp/articles", "get", data)
}