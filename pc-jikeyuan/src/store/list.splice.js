import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListData } from "../apis/list";

// 初始化状态
const initialState = {
  loading: false,
  list: {},
  error: null
}

// 异步请求数据
export const loadList = createAsyncThunk("list/loadList", async (payload) => {
  try {
    const { data } = await getListData(payload);
    // console.log(data);
    localStorage.setItem("list", data)
    return data
  } catch (error) {
    throw new Error("获取内容列表失败")
  }
})

const { actions, reducer: listReudcer } = createSlice({
  name: "list",
  // 初始化数据
  initialState: initialState,
  // 同步方法用于对数据的增删改查
  reducers: {

  },
  // 发起请求获取数据
  extraReducers: {
    [loadList.pending](state) {
      state.loading = true;
      state.list = [];
      state.error = null;
    },
    [loadList.fulfilled](state, action) {
      state.loading = false;
      state.list = action.payload
      state.error = null;
    },
    [loadList.rejected](state, action) {
      state.loading = false;
      state.list = [];
      state.error = action.error;
    }
  }
})

// 导出方法
export const { getAllList } = actions

export default listReudcer;