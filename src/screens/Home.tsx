import { ScrollView, StyleSheet } from 'react-native'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { MaterialIcons } from '@expo/vector-icons'
import { RootState } from '@store/root'
import { CardType } from '@store/slice/cardSlice.type'
import { cardActions } from '@store/slice/cardSlice'
import { SelectCard, TextCard, TitleCard } from '@components/Card'
import Layout from '@components/Layout'
import Button, { ButtonCustomStyles } from '@components/Button'
import { colors } from '@styles/theme'

export default function Home() {
  const cards = useSelector<RootState, CardType[]>((state) => state.cards.data, shallowEqual)

  // TODO: 삭제!!
  const activeCard = useSelector<RootState, any>((state) => state.cards.activeCard, shallowEqual)
  console.log(cards, cards.length, activeCard)

  const dispatch = useDispatch()

  const handlePressAdd = () => {
    dispatch(cardActions.addCard())
  }

  return (
    <ActionSheetProvider>
      <Layout>
        <Button
          buttonText="항목 추가"
          onPress={handlePressAdd}
          renderIcon={() => (
            <MaterialIcons name="add-circle-outline" size={20} color={colors.greyDark} />
          )}
          styles={buttonCustomStyles}
        />
        <ScrollView contentContainerStyle={styles.scrollview}>
          {cards.map((card) => {
            if (card.type === 'title') return <TitleCard key={card.id} {...card} />

            const CardComponent = cardComponentMap[card.type]
            return <CardComponent key={card.id} {...card} />
          })}
        </ScrollView>
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

const styles = StyleSheet.create({
  scrollview: {
    paddingBottom: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
})
const buttonCustomStyles: ButtonCustomStyles = {
  button: {
    paddingVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: colors.purple,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: colors.greyDark,
  },
}
