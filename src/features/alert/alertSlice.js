import { createSlice } from "@reduxjs/toolkit/";

const initialState = {
  visible: false,
  text: '',
  type: '',
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    show: (state, action) => {
      state.text = action.payload.text
      state.type = action.payload.type
      state.visible = true
    },
    hide: (state) => {
      state.visible = false
    }
  }
})

export const { show, hide } = alertSlice.actions;
export default alertSlice.reducer