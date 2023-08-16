import { CardType, SurveyCardType, TitleCardType } from './slice/cardSlice.type'

/**
 *
 * @param cards 전체 카드 리스트
 * @param id 찾을 타겟 카드 아이디
 * @returns 찾은 타겟 카드(card), 찾은 카드의 인덱스(index)
 */
export const findCardData = (cards: CardType[], id: string) => {
  const card = cards.find((card) => card.id === id)
  const index = cards.findIndex((card) => card.id === id)

  return {
    card: card!,
    index: index === -1 ? 0 : index,
  }
}

/**
 * @description type predicates for type narrowing
 */
export const isSurveyCard = (card: TitleCardType | SurveyCardType): card is SurveyCardType => {
  return (card as SurveyCardType).question !== undefined
}

/**
 *
 * @param cards 전체 카드 리스트
 * @param deletedIdx 지울 카드의 인덱스
 * @returns  카드를 지운 이후, active card id
 */

export const getNextActiveCardId = (cards: CardType[], deletedIdx: number) => {
  const prevCard = cards[deletedIdx - 1]
  const nextCard = cards[deletedIdx + 1]

  if (prevCard.type !== 'title') return prevCard.id
  else return nextCard?.id || prevCard.id
}
