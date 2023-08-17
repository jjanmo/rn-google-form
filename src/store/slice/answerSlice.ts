import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AnswerState {
  data: {
    [key: string]: string | boolean[]
  }
}

const initialState: AnswerState = {
  data: {},
}

const slice = createSlice({
  name: '@answer',
  initialState,
  reducers: {
    updateAnswers: (state, action: PayloadAction<AnswerState>) => {
      const { data } = action.payload
      state.data = data
    },
  },
})

export const answerActions = slice.actions
export default slice.reducer
