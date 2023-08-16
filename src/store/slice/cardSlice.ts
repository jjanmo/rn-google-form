import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import * as Crypto from 'expo-crypto'
import cloneDeep from 'lodash/cloneDeep'
import { findCardData, getNextActiveCardId, isSurveyCard } from '@store/helper'
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
      const { index: activeIndex } = findCardData(state.data, state.activeCard)
      const newId = Crypto.randomUUID()
      const newCard = {
        id: newId,
        type: 'radio',
        required: false,
        question: '질문',
        options: [
          {
            id: Crypto.randomUUID(),
            text: '옵션 1',
          },
        ],
      } as SurveyCardType
      state.data.splice(activeIndex + 1, 0, newCard)
      state.activeCard = newId
    },
    updateCardType: (state, action: PayloadAction<PayloadWithTypeKey>) => {
      const { id, type } = action.payload
      const { card: targetCard } = findCardData(state.data, id)
      const prevType = targetCard.type
      const isChangingSelectTypeToTextType =
        (prevType === 'checkbox' || prevType === 'radio') && (type === 'short' || type === 'long')
      if (isChangingSelectTypeToTextType) {
        targetCard.options = [
          {
            id: Crypto.randomUUID(),
            text: '옵션 1',
          },
        ]
      }

      targetCard.type = type
    },
    editTitleCardText: (state, action: PayloadAction<PayloadWithTitleCard>) => {
      const { title, description } = action.payload
      const targetCard = state.data[0] as TitleCardType // 항상 0번(시작)이 TitleCard!, 0번에서 바뀌지않음
      targetCard.title = title
      targetCard.description = description
    },
    editSurveyCardQuestion: (state, action: PayloadAction<PayloadWithSurveyCard>) => {
      const { id, question } = action.payload
      const { card: targetCard } = findCardData(state.data, id)
      if (isSurveyCard(targetCard)) targetCard.question = question
    },
    editSurveyCardOption: (state, action: PayloadAction<PayloadWithOption>) => {
      const { id, option, index } = action.payload
      const { card: targetCard } = findCardData(state.data, id)
      if (isSurveyCard(targetCard)) targetCard.options[index].text = option
    },
    addOption: (state, action: PayloadAction<BasePayload>) => {
      const { id } = action.payload
      const { card: targetCard } = findCardData(state.data, id)
      if (isSurveyCard(targetCard)) {
        targetCard.options.push({
          id: Crypto.randomUUID(),
          text: `옵션 ${targetCard.options.length + 1}`,
        })
      }
    },
    deleteOption: (state, action: PayloadAction<PayloadWithOption>) => {
      const { id, index } = action.payload
      const { card: targetCard } = findCardData(state.data, id)
      if (isSurveyCard(targetCard)) targetCard.options.splice(index, 1)
    },
    updateRequired: (state, action: PayloadAction<BasePayload>) => {
      const { id } = action.payload
      const { card: targetCard } = findCardData(state.data, id)
      if (isSurveyCard(targetCard)) targetCard.required = !targetCard.required
    },
    copyCard: (state, action: PayloadAction<BasePayload>) => {
      const { id } = action.payload
      const { index, card } = findCardData(state.data, id)
      const copiedCard = cloneDeep(card)
      const newId = Crypto.randomUUID()
      copiedCard.id = newId
      state.data.splice(index + 1, 0, copiedCard)
      state.activeCard = newId
    },
    deleteCard: (state, action: PayloadAction<BasePayload>) => {
      const { id } = action.payload
      const { index: deletedIdx } = findCardData(state.data, id)
      const nextActiveCardId = getNextActiveCardId(state.data, deletedIdx)
      state.data.splice(deletedIdx, 1)
      state.activeCard = nextActiveCardId
    },
  },
})

export const cardActions = slice.actions
export default slice.reducer
