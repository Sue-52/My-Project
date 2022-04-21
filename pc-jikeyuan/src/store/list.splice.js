import { createSlice } from "@reduxjs/toolkit";

// 初始化状态
const initialState = {
  list: []
}

const { actions, reducer: listReudcer } = createSlice({
  name: "list",
  // 初始化数据
  initialState: initialState,
  // 同步方法用于对数据的增删改查
  reducers: {},
  // 发起请求获取数据
  extraReducers: {}
})

// 导出方法
export const { } = actions

export default listReudcer;