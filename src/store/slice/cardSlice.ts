import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import * as Crypto from 'expo-crypto'
import {
  BasePayload,
  CardsState,
  PayloadWithTitleCard,
  PayloadWithTypeKey,
  SurveyCardType,
  TitleCardType,
} from './cardSlice.type'

const initialId = Crypto.randomUUID()

const initialState: CardsState = {
  activeCard: initialId,
  data: [
    {
      id: initialId,
      type: 'title',
      title: '제목 없는 설문지',
    },
  ],
}

const slice = createSlice({
  name: '@card',
  initialState,
  reducers: {
    updateActiveCard: (state, action: PayloadAction<BasePayload>) => {
      state.activeCard = action.payload.id
    },
    addCard: (state) => {
      state.data.push({
        id: Crypto.randomUUID(),
        type: 'radio',
        question: '',
        options: ['옵션1'],
      })
    },
    editTitleCard: (state, action: PayloadAction<PayloadWithTitleCard>) => {
      const { id, title, description } = action.payload
      const card = state.data.find((card) => card.id === id) as TitleCardType
      card.title = title
      card.description = description
    },
    changeCardType: (state, action: PayloadAction<PayloadWithTypeKey>) => {
      const { id, type } = action.payload
      const card = state.data.find((card) => card.id === id) as SurveyCardType
      card.type = type
    },
  },
})

export const cardActions = slice.actions
export default slice.reducer
