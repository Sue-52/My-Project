import request from "../utils/https";

/** 获取用户信息
 *
 * @returns 返回对象数据
 */
export function getListData(data) {
  return request("/mp/articles", "get", data);
}

/** 通过ID删除文章
 * 
 * @param {Number} id 
 * @returns 
 */
export function deleteArticleById(id) {

  return request(`/mp/articles/${id}`, "delete")
}

/** 获取所有频道数据
 * 
 * @returns Object
 */
export function getAllChannels() {
  return request("/channels", "get")
}

/** 发布文章
 * 
 * @param {Object} data 
 * @returns 
 */
export function sendArticle(data, draft) {
  return request(`/mp/articles?draft=${draft}`, "post", data)
}

export function editArticle(target, draft, data) {
  return request(`/mp/articles/${target}?draft=${draft}`, "put", data)
}

export function getArticle(target) {
  return request(`mp/articles/${target}`, "get")
}