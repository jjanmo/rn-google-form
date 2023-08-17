import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SurveyCardType } from './cardSlice.type'

export interface PayloadWithSurveyCards {
  cards: SurveyCardType[]
}

export interface FormData {
  [key: string]: string | boolean[]
}

export interface AnswerState {
  data: FormData
  prevCards: SurveyCardType[]
}

const initialState: AnswerState = {
  data: {},
  prevCards: [],
}

const slice = createSlice({
  name: '@answer',
  initialState,
  reducers: {
    updateAnswers: (state, action: PayloadAction<{ data: FormData }>) => {
      const { data } = action.payload
      state.data = data
    },
    resetAnswers: (state) => {
      state.data = {}
    },
    copyPrevCards: (state, action: PayloadAction<PayloadWithSurveyCards>) => {
      state.prevCards = action.payload.cards
    },
  },
})

export const answerActions = slice.actions
export default slice.reducer
