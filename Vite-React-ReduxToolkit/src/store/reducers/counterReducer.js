import { createReducer } from "@reduxjs/toolkit";
import { increment, decrement, incrementByAmount } from "../action-creators/counterCreator";

// 方法一
const initialState = { count: 0 }
const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, state => ({ count: state.count + 1 }))
    .addCase(decrement, state => ({ count: state.count - 1 }))
    .addMatcher(
      (action) => action.type === "counter/incrementByAmount",
      (state, action) => ({ count: state.count + action.payload })
    )
    .addDefaultCase(state => state)
})

export default counterReducer;