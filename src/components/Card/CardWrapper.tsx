import { PropsWithChildren } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '@styles/theme'
import { useSelector } from 'react-redux'
import { RootState } from '@store/root'
import { useDispatch } from 'react-redux'
import { cardActions } from '@store/slice/cardSlice'

interface Props {
  id: string
  isTitleCard?: boolean
}

export default function CardWrapper({ children, id, isTitleCard }: PropsWithChildren<Props>) {
  const activeCard = useSelector<RootState, string>((state) => state.cards.activeCard)
  const dispatch = useDispatch()

  const handlePress = () => {
    dispatch(cardActions.updateActiveCard({ id }))
  }

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePress}>
      {isTitleCard && <View style={styles.topHighlighting} />}
      {id === activeCard && <View style={styles.leftHighlighting} />}
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '95%',
    marginBottom: 10,
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  text: {
    color: colors.black,
    height: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  topHighlighting: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 10,
    backgroundColor: colors.purpleDark,
    zIndex: 1,
  },
  leftHighlighting: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 6,
    height: '100%',
    backgroundColor: colors.blue,
  },
})
