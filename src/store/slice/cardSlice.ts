import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import * as Crypto from 'expo-crypto'
import {
  BasePayload,
  CardsState,
  PayloadWithOption,
  PayloadWithSurveyCard,
  PayloadWithTitleCard,
  PayloadWithTypeKey,
  SurveyCardType,
  TitleCardType,
} from './cardSlice.type'

const initialId = Crypto.randomUUID()
const initialState: CardsState = {
  activeCard: initialId,
  data: {
    [initialId]: {
      id: initialId,
      type: 'title',
      title: '제목 없는 설문지',
    },
  },
}

const slice = createSlice({
  name: '@card',
  initialState,
  reducers: {
    updateActiveCard: (state, action: PayloadAction<BasePayload>) => {
      state.activeCard = action.payload.id
    },
    addCard: (state) => {
      const id = Crypto.randomUUID()
      state.data[id] = {
        id,
        type: 'radio',
        question: '',
        options: ['옵션1'],
      }
    },
    editTitleCardText: (state, action: PayloadAction<PayloadWithTitleCard>) => {
      const { id, title, description } = action.payload
      const titleCard = state.data[id] as TitleCardType
      titleCard.title = title || '제목 없는 설문지'
      titleCard.description = description
    },
    editSurveyCardText: (state, action: PayloadAction<PayloadWithSurveyCard>) => {
      const { id, question } = action.payload
      const surveyCard = state.data[id] as SurveyCardType
      surveyCard.question = question
    },
    editSurveyCardOption: (state, action: PayloadAction<PayloadWithOption>) => {
      const { id, option, index } = action.payload
      const surveyCard = state.data[id] as SurveyCardType
      surveyCard.options[index] = option
    },
    updateCardType: (state, action: PayloadAction<PayloadWithTypeKey>) => {
      const { id, type } = action.payload
      const surveyCard = state.data[id] as SurveyCardType
      surveyCard.type = type
    },
  },
})

export const cardActions = slice.actions
export default slice.reducer
