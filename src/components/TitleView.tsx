import { StyleSheet, Text, View } from 'react-native'
import { TitleCardType } from '@store/slice/cardSlice.type'
import { colors } from '@styles/theme'

export default function TitleView({ title, description }: TitleCardType) {
  return (
    <View style={styles.container}>
      <View style={styles.topHighlighting} />
      <View style={styles.content}>
        <Text style={styles.titleText}>{title || '제목 없는 설문지'}</Text>
        <Text style={styles.descriptionText}>{description || '설문지 설명'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '95%',
    marginBottom: 5,
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  topHighlighting: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 10,
    backgroundColor: colors.purpleDark,
  },
  content: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  titleText: {
    marginBottom: 20,
    fontSize: 30,
  },
  descriptionText: {
    fontSize: 16,
  },
})
