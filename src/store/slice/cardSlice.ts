import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import * as Crypto from 'expo-crypto'

const initialId = Crypto.randomUUID()

export interface BaseCard {
  id: string
}
export interface TitleCardType extends BaseCard {
  type: 'title'
  title: string
  description?: string
}
export interface SurveyCardType extends BaseCard {
  type: 'short' | 'long' | 'radio' | 'checkbox'
  question: string
  options?: string[]
}
export type CardType = TitleCardType | SurveyCardType
export interface CardsState {
  activeCard: string
  data: CardType[]
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
export interface PayloadWithTitleCard extends BasePayload {
  title: string
  description?: string
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
  },
})

export const cardActions = slice.actions
export default slice.reducer
