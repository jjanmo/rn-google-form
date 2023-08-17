import { useEffect, useRef } from 'react'
import { FlatList, ListRenderItem, StyleSheet } from 'react-native'
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
  const activeCard = useSelector<RootState, any>((state) => state.cards.activeCard, shallowEqual)

  // TODO : 제출시 LOG 삭제!
  console.log(cards, cards.length, activeCard)

  const dispatch = useDispatch()
  const handlePressAdd = () => {
    dispatch(cardActions.addCard())
  }

  const flatListRef = useRef<FlatList>(null)
  const scrollToItem = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, viewPosition: 0.5, animated: true })
    }
  }
  /**
   * @description 리스트의 마지막에 추가하는 경우, UI 랜더링과 인덱스를 찾는 과정에서의 차이로 인해 오류 발생, 이를 해결하기 위한 함수
   */
  const handleScrollToIndexFailed = () => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500))
    wait.then(() => {
      const activeIndex = cards.findIndex((card) => card.id === activeCard)
      scrollToItem(activeIndex)
    })
  }
  useEffect(() => {
    const activeIndex = cards.findIndex((card) => card.id === activeCard)
    scrollToItem(activeIndex)
  }, [activeCard])

  const renderItem: ListRenderItem<CardType> = ({ item }) => {
    if (item.type === 'title') return <TitleCard key={item.id} {...item} />

    const CardComponent = cardComponentMap[item.type]
    return <CardComponent key={item.id} {...item} />
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
        <FlatList
          ref={flatListRef}
          data={cards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatlist}
          initialScrollIndex={0}
          onScrollToIndexFailed={handleScrollToIndexFailed}
        />
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
  flatlist: {
    paddingBottom: 30,
    marginTop: 20,
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
