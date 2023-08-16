import { ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@store/root'
import { CardType } from '@store/slice/cardSlice.type'
import { InputCheckbox, InputRadio, InputTextField } from '@components/Form'
import Layout from '@components/Layout'
import TitleView from '@components/TitleView'

export default function Preview() {
  const cards = useSelector<RootState, CardType[]>((state) => state.cards.data)

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollview}>
        {cards.map((card) => {
          if (card.type === 'title') return <TitleView key={card.id} {...card} />
          if (card.type === 'checkbox') return <InputCheckbox key={card.id} {...card} />
          if (card.type === 'radio') return <InputRadio key={card.id} {...card} />
          if (card.type === 'long' || card.type === 'short')
            return <InputTextField key={card.id} {...card} />
        })}
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  scrollview: {
    alignItems: 'center',
  },
})
