import { StyleSheet, View } from 'react-native'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { TextInput, Text } from '@react-native-material/core'
import { RootState } from '@store/root'
import { TitleCardType } from '@store/slice/cardSlice.type'
import { cardActions } from '@store/slice/cardSlice'
import CardWrapper from './CardWrapper'
import { colors } from '@styles/theme'

export default function TitleCard({ id, title, description, type }: TitleCardType) {
  const activeCard = useSelector<RootState, string>((state) => state.cards.activeCard, shallowEqual)
  const dispatch = useDispatch()

  const handleChangeTitle = (text: string) => {
    dispatch(cardActions.editTitleCardText({ title: text, description, id }))
  }
  const handleChangeDescription = (text: string) => {
    dispatch(cardActions.editTitleCardText({ title, description: text, id }))
  }

  return (
    <CardWrapper id={id} isTitleCard>
      {activeCard === id && (
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={handleChangeTitle}
            placeholder="설문지 제목"
            variant="standard"
            inputStyle={styles.titleInput}
            selectionColor="grey"
            color={colors.purpleDark}
          />
          <TextInput
            value={description}
            onChangeText={handleChangeDescription}
            placeholder="설문지 설명"
            variant="standard"
            inputStyle={styles.descriptionInput}
            selectionColor="grey"
            color={colors.purpleDark}
          />
        </View>
      )}
      {activeCard !== id && (
        <View style={styles.readonlyContainer}>
          <View style={styles.readOnlyTitle}>
            <Text style={styles.titleInput}>{title || '제목 없는 설문지'}</Text>
          </View>
          <View>
            <Text style={styles.descriptionInput}>{description || '설문지 설명'}</Text>
          </View>
        </View>
      )}
    </CardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
  },
  descriptionInput: {
    fontSize: 14,
    fontWeight: '600',
  },
  readonlyContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  readOnlyTitle: {
    marginBottom: 20,
  },
})
