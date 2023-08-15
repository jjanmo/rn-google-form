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
        required: false,
        question: '질문',
        options: [
          {
            id: Crypto.randomUUID(),
            text: '옵션 1',
          },
        ],
      }
      state.activeCard = id
    },
    updateCardType: (state, action: PayloadAction<PayloadWithTypeKey>) => {
      const { id, type } = action.payload
      const surveyCard = state.data[id] as SurveyCardType
      surveyCard.type = type
    },
    editTitleCardText: (state, action: PayloadAction<PayloadWithTitleCard>) => {
      const { id, title, description } = action.payload
      const titleCard = state.data[id] as TitleCardType
      titleCard.title = title
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
      surveyCard.options[index].text = option
    },
    addOption: (state, action: PayloadAction<BasePayload>) => {
      const { id } = action.payload
      const options = (state.data[id] as SurveyCardType).options
      options.push({
        id: Crypto.randomUUID(),
        text: `옵션 ${options.length + 1}`,
      })
    },
    deleteOption: (state, action: PayloadAction<PayloadWithOption>) => {
      const { id, index } = action.payload
      const options = (state.data[id] as SurveyCardType).options
      options.splice(index, 1)
    },
  },
})

export const cardActions = slice.actions
export default slice.reducer
