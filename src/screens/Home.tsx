import Layout from '@components/Layout'
import { CheckboxCard, LongCard, RadioCard, ShortCard, TitleCard } from '@components/Card'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '@store/root'
import { CardType } from '@store/slice/cardSlice'

const cardComponentMap = {
  short: ShortCard,
  long: LongCard,
  radio: RadioCard,
  checkbox: CheckboxCard,
}

export default function Home() {
  const cards = useSelector<RootState, CardType[]>((state) => state.cards.data, shallowEqual)
  console.log(cards, cards.length)
  return (
    <Layout>
      {cards.map((card) => {
        const { id, type } = card
        if (type === 'title') return <TitleCard key={id} {...card} />

        const CardComponent = cardComponentMap[type]
        return <CardComponent key={id} {...card} />
      })}
    </Layout>
  )
}
