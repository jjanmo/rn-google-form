import { useEffect, useState } from 'react'
import { TextInput, Text } from '@react-native-material/core'
import { StyleSheet, View } from 'react-native'
import CardWrapper from './CardWrapper'
import { TitleCardType } from '@store/slice/cardSlice'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '@store/root'

export default function TitleCard(props: TitleCardType) {
  const activeCard = useSelector<RootState, string>((state) => state.cards.activeCard, shallowEqual)

  const [title, setTitle] = useState(props.title)
  const [description, setDescription] = useState(props.description)

  useEffect(() => {
    let id: NodeJS.Timeout
    if (!title) {
      id = setTimeout(() => {
        setTitle('제목 없는 설문지')
      }, 500)
    }
    return () => {
      clearTimeout(id)
    }
  }, [title])

  return (
    <CardWrapper>
      {activeCard === props.id && (
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="설문지 제목"
            variant="standard"
            inputStyle={styles.titleInput}
            selectionColor="grey"
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="설문지 설명"
            variant="standard"
            inputStyle={styles.descriptionInput}
            selectionColor="grey"
          />
        </View>
      )}
      {activeCard !== props.id && (
        <View>
          <View>
            <Text>{title}</Text>
          </View>
          <View>
            <Text>{description || '설문지 설명'}</Text>
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
})
