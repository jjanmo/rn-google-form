import Layout from '@components/Layout'
import { CheckboxCard, LongCard, RadioCard, ShortCard, TitleCard } from '@components/Card'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '@store/root'
import { CardType } from '@store/slice/cardSlice.type'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

export default function Home() {
  const cards = useSelector<RootState, Record<string, CardType>>(
    (state) => state.cards.data,
    shallowEqual
  )
  // const all = useSelector<RootState,any>((state) => state.cards, shallowEqual)
  console.log(cards, cards.length)
  return (
    <ActionSheetProvider>
      <Layout>
        {Object.keys(cards).map((key) => {
          const card = cards[key]
          if (card.type === 'title') return <TitleCard key={key} {...card} />

          const CardComponent = cardComponentMap[card.type]
          return <CardComponent key={key} {...card} />
        })}
      </Layout>
    </ActionSheetProvider>
  )
}

const cardComponentMap = {
  short: ShortCard,
  long: LongCard,
  radio: RadioCard,
  checkbox: CheckboxCard,
}
