import { colors } from '@styles/theme'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  question: string
  required: boolean
}

export default function InputQuestion({ question, required }: Props) {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      {required && <Text style={styles.required}>*</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
  },
  required: {
    fontSize: 20,
    color: colors.red,
  },
})
