import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import Button, { ButtonCustomStyles } from './Button'
import { colors } from '@styles/theme'

interface Props {
  message: string
  actionText: string
  action: () => void
}

export default function ActionNotice({ message, actionText, action }: Props) {
  return (
    <View style={styles.noticeContainer}>
      <Text style={styles.notice}>{message}</Text>
      <Button buttonText={actionText} onPress={action} styles={buttonCustomStyles} />
    </View>
  )
}

const styles = StyleSheet.create({
  noticeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notice: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
})

const buttonCustomStyles: ButtonCustomStyles = {
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 100,
    backgroundColor: colors.purpleDark,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
}
