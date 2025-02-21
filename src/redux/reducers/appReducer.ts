import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefObject, createRef } from "react";

// interface State {
//   refObject: RefObject<HTMLDivElement | null>;
// }

// const initialState: State = {
//   refObject: null,
// };

// const appReducer = createSlice({
//   name: "app",
//   initialState,
//   reducers: {
//     registerRefObject: (
//       state,
//       action: PayloadAction<RefObject<HTMLDivElement | null>>
//     ) => {
//       state.refObject =  action.payload;
//     },
//   },
// });

// export const { registerRefObject } = appReducer.actions;
// export default appReducer.reducer;
