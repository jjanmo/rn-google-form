// CardType
export interface BaseCard {
  id: string
}
export interface TitleCardType extends BaseCard {
  type: 'title'
  title: string
  description?: string
}
export type SurveyCardTypeKey = 'short' | 'long' | 'radio' | 'checkbox'
export interface SurveyCardType extends BaseCard {
  type: SurveyCardTypeKey
  question: string
  options: string[]
}
export type CardType = TitleCardType | SurveyCardType
export interface CardsState {
  activeCard: string
  data: {
    [key: string]: CardType
  }
}

// PayloadType
export interface BasePayload {
  id: string
}
export interface PayloadWithTitleCard extends BasePayload {
  title: string
  description?: string
}
export interface PayloadWithTypeKey extends BasePayload {
  type: SurveyCardTypeKey
}
export interface PayloadWithSurveyCard extends BasePayload {
  question: string
}
export interface PayloadWithOption extends BasePayload {
  option: string
  index: number
}
