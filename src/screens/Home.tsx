import { shallowEqual, useSelector } from 'react-redux'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { RootState } from '@store/root'
import { CardType } from '@store/slice/cardSlice.type'
import { SelectCard, TextCard, TitleCard } from '@components/Card'
import Layout from '@components/Layout'

export default function Home() {
  const cards = useSelector<RootState, CardType[]>((state) => state.cards.data, shallowEqual)

  // TODO: 삭제!!
  const activeCard = useSelector<RootState, any>((state) => state.cards.activeCard, shallowEqual)
  console.log(cards, cards.length, activeCard)

  return (
    <ActionSheetProvider>
      <Layout>
        {cards.map((card) => {
          if (card.type === 'title') return <TitleCard key={card.id} {...card} />

          const CardComponent = cardComponentMap[card.type]
          return <CardComponent key={card.id} {...card} />
        })}
      </Layout>
    </ActionSheetProvider>
  )
}

const cardComponentMap = {
  short: TextCard,
  long: TextCard,
  radio: SelectCard,
  checkbox: SelectCard,
}
