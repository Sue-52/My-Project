import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { login } from "../apis/userInfo"

const initialState = {
  token: localStorage.getItem("@#@Token") || "",
  loading: false,
  error: null
}

export const loadUser = createAsyncThunk("user/loading", async (payload) => {
  try {
    let { data } = await login(payload);
    localStorage.setItem("@#@Token", data.token)
    return data.token
  } catch (error) {
    throw new Error(error.message)
  }
})

const { actions, reducer: userReducer } = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    removeToken(state) {
      state.token = ""
      localStorage.removeItem("@#@Token");
    }
  },
  extraReducers: {
    [loadUser.pending](state) {
      state.loading = true;
      state.token = "";
      state.error = null
    },
    [loadUser.fulfilled](state, action) {
      state.loading = false;
      state.error = null;
      state.token = action.payload
    },
    [loadUser.rejected](state, action) {
      state.loading = false;
      state.token = "";
      state.error = action.error
    }
  }
})

export const { removeToken } = actions

export default userReducer;