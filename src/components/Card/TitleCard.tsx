import { useEffect, useState } from 'react'
import { TextInput, Text } from '@react-native-material/core'
import { StyleSheet, View } from 'react-native'
import CardWrapper from './CardWrapper'
import { TitleCardType, cardActions } from '@store/slice/cardSlice'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '@store/root'
import { useDispatch } from 'react-redux'

export default function TitleCard(props: TitleCardType) {
  const { id, title, description, type } = props
  const activeCard = useSelector<RootState, string>((state) => state.cards.activeCard, shallowEqual)

  const [titleText, setTitleText] = useState(title)
  const [descriptionText, setDescriptionText] = useState(description || '')

  // 주요기능은 아니기때문에 우선 주석처리!
  // useEffect(() => {
  //   let id: NodeJS.Timeout
  //   if (!titleText) {
  //     id = setTimeout(() => {
  //       setTitleText('제목 없는 설문지')
  //     }, 500)
  //   }
  //   return () => {
  //     clearTimeout(id)
  //   }
  // }, [titleText])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(cardActions.editTitleCard({ title: titleText, description: descriptionText, id }))
  }, [titleText, descriptionText])

  return (
    <CardWrapper id={id} type={type}>
      {activeCard === id && (
        <View style={styles.container}>
          <TextInput
            value={titleText}
            onChangeText={setTitleText}
            placeholder="설문지 제목"
            variant="standard"
            inputStyle={styles.titleInput}
            selectionColor="grey"
          />
          <TextInput
            value={descriptionText}
            onChangeText={setDescriptionText}
            placeholder="설문지 설명"
            variant="standard"
            inputStyle={styles.descriptionInput}
            selectionColor="grey"
          />
        </View>
      )}
      {activeCard !== id && (
        <View style={styles.readonlyContainer}>
          <View style={styles.readOnlyTitle}>
            <Text style={styles.titleInput}>{title}</Text>
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
