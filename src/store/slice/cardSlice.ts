import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import * as Crypto from 'expo-crypto'

const initialId = Crypto.randomUUID()

export type CardType = 'title' | 'short' | 'long' | 'checkbox' | 'radio'
export interface BaseCard {
  id: string
  type: CardType
}
export interface TitleCard extends BaseCard {
  title: string
  description?: string
}
export interface SurveyCard extends BaseCard {
  question: string
  options?: string[]
}
export type EnhancedCard = TitleCard | SurveyCard
export interface CardsState {
  activeCard: string
  data: EnhancedCard[]
}

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

export interface BasePayload {
  id: string
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
    editCard: (state, action) => {},
  },
})

export const cardActions = slice.actions
export default slice.reducer
